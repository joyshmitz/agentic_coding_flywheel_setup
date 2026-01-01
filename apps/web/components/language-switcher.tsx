"use client";

import { useLocale } from "@/lib/i18n/context";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n/config";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale, mounted } = useLocale();

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Languages className="h-4 w-4 text-muted-foreground" />
        <select
          disabled
          className="bg-transparent text-sm text-muted-foreground cursor-pointer border-none focus:ring-0 focus:outline-none opacity-50"
        >
          <option>English</option>
        </select>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="bg-transparent text-sm text-muted-foreground hover:text-foreground cursor-pointer border-none focus:ring-0 focus:outline-none"
      >
        {LOCALES.map((loc) => (
          <option key={loc} value={loc}>
            {LOCALE_NAMES[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
