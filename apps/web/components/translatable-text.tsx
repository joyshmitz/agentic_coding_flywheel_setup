"use client";

import { type ReactNode, type ElementType } from "react";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface TProps {
  children: string;
  as?: ElementType;
  className?: string;
}

export function T({ children, as: Component, className }: TProps) {
  const { translated, isLoading } = useTranslation(children);

  if (Component) {
    return (
      <Component className={className} data-translating={isLoading || undefined}>
        {translated}
      </Component>
    );
  }

  return <>{translated}</>;
}

interface TranslatableProps {
  text: string;
  children: (translated: string, isLoading: boolean) => ReactNode;
}

export function Translatable({ text, children }: TranslatableProps) {
  const { translated, isLoading } = useTranslation(text);
  return <>{children(translated, isLoading)}</>;
}
