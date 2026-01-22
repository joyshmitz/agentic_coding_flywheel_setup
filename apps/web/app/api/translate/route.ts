import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-3-haiku-20240307";
const MAX_REQUEST_BODY_BYTES = 32_000;
const MAX_TEXT_CHARS = 8_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;
const TRANSLATE_TIMEOUT_MS = 5000;

const LOCALE_NAMES: Record<string, string> = {
  uk: "Ukrainian",
};

const SYSTEM_PROMPT = `You are a professional translator specializing in technical documentation for software developers.

Rules:
- Translate the text naturally and accurately
- Keep technical terms in English: VPS, SSH, CLI, API, Git, Ubuntu, bash, curl, npm, etc.
- Keep code snippets, commands, and file paths unchanged
- Keep markdown formatting intact
- Preserve any HTML tags or React component syntax
- Output ONLY the translated text, no explanations`;

class PayloadTooLargeError extends Error {
  override name = "PayloadTooLargeError";
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function normalizeIP(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "unknown";
  if (trimmed.length > 80) return "unknown";

  if (trimmed.startsWith("[")) {
    const endIdx = trimmed.indexOf("]");
    if (endIdx > 1) return normalizeIP(trimmed.slice(1, endIdx));
    return "unknown";
  }

  if (trimmed.includes(".") && trimmed.includes(":")) {
    const beforePort = trimmed.split(":")[0]?.trim();
    if (beforePort) return normalizeIP(beforePort);
  }

  if (trimmed.includes(".")) {
    const parts = trimmed.split(".");
    if (parts.length !== 4) return "unknown";
    for (const part of parts) {
      if (!/^\d{1,3}$/.test(part)) return "unknown";
      const n = Number(part);
      if (!Number.isInteger(n) || n < 0 || n > 255) return "unknown";
    }
    return trimmed;
  }

  if (trimmed.includes(":") && /^[0-9a-fA-F:]+$/.test(trimmed) && trimmed.length <= 45) {
    return trimmed.toLowerCase();
  }

  return "unknown";
}

function getClientIP(request: NextRequest): string {
  const requestIP = (request as unknown as { ip?: string }).ip;
  const forwardedFor =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for");

  return (
    normalizeIP(
      requestIP ||
        forwardedFor?.split(",")[0]?.trim() ||
        request.headers.get("cf-connecting-ip") ||
        request.headers.get("x-real-ip") ||
        ""
    ) || "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

async function readJsonBodyWithLimit(request: NextRequest): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) {
    return request.json();
  }

  const decoder = new TextDecoder();
  let bytesRead = 0;
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;

    bytesRead += value.byteLength;
    if (bytesRead > MAX_REQUEST_BODY_BYTES) {
      try {
        await reader.cancel();
      } catch {
        // ignore
      }
      throw new PayloadTooLargeError();
    }

    text += decoder.decode(value, { stream: true });
  }

  text += decoder.decode();
  return JSON.parse(text) as unknown;
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength) {
      const bytes = Number(contentLength);
      if (Number.isFinite(bytes) && bytes > MAX_REQUEST_BODY_BYTES) {
        return NextResponse.json({ error: "Payload too large" }, { status: 413 });
      }
    }

    const clientIP = getClientIP(request);
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        {
          status: 429,
          headers: { "Retry-After": Math.ceil(RATE_LIMIT_WINDOW_MS / 1000).toString() },
        }
      );
    }

    const body = await readJsonBodyWithLimit(request);
    const { text, targetLocale } =
      body && typeof body === "object" ? (body as { text?: unknown; targetLocale?: unknown }) : {};

    if (typeof text !== "string" || typeof targetLocale !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid text/targetLocale" },
        { status: 400 }
      );
    }

    const trimmedText = text.trim();
    if (!trimmedText || trimmedText.length > MAX_TEXT_CHARS) {
      return NextResponse.json(
        { error: "Text length out of bounds" },
        { status: trimmedText ? 413 : 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.warn("ANTHROPIC_API_KEY not set, returning original text");
      return NextResponse.json({ translated: trimmedText });
    }

    const targetLanguage = LOCALE_NAMES[targetLocale] || targetLocale;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TRANSLATE_TIMEOUT_MS);

    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Translate the following text to ${targetLanguage}:\n\n${trimmedText}`,
          },
        ],
      }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!response.ok) {
      const error = await response.text();
      console.error("Anthropic API error:", error);
      return NextResponse.json({ translated: trimmedText });
    }

    const data = await response.json();
    const translated =
      data.content?.[0]?.type === "text" ? data.content[0].text : trimmedText;

    return NextResponse.json({ translated });
  } catch (error) {
    console.error("Translation error:", error);
    if (error instanceof PayloadTooLargeError) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}
