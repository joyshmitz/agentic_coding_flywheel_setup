"use client";

import { useLocale } from "@/lib/i18n/context";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n/config";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale, mounted } = useLocale();

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.1] hover:border-white/[0.15]">
      <Languages className="h-4 w-4 text-white/60" />
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        disabled={!mounted}
        className={`bg-transparent text-sm cursor-pointer border-none focus:ring-0 focus:outline-none font-medium ${
          mounted
            ? "text-white/80 hover:text-white"
            : "text-white/60"
        }`}
      >
        {LOCALES.map((loc) => (
          <option key={loc} value={loc} className="bg-gray-800 text-white">
            {LOCALE_NAMES[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
