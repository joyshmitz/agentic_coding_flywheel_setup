import { NextResponse } from "next/server";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-3-haiku-20240307";

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

export async function POST(request: Request) {
  try {
    const { text, targetLocale } = await request.json();

    if (!text || !targetLocale) {
      return NextResponse.json(
        { error: "Missing text or targetLocale" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.warn("ANTHROPIC_API_KEY not set, returning original text");
      return NextResponse.json({ translated: text });
    }

    const targetLanguage = LOCALE_NAMES[targetLocale] || targetLocale;

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
            content: `Translate the following text to ${targetLanguage}:\n\n${text}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Anthropic API error:", error);
      return NextResponse.json({ translated: text });
    }

    const data = await response.json();
    const translated =
      data.content?.[0]?.type === "text" ? data.content[0].text : text;

    return NextResponse.json({ translated });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}
