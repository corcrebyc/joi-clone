"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  characterId: string;
};

export function CharacterActions({ characterId }: Props) {
  const { t } = useLanguage();

  return (
    <div className="mt-8 flex gap-3">
      <Link
        href={`/chat?character=${characterId}`}
        className="flex-1 rounded-full bg-primary py-3 text-center text-sm font-semibold text-white transition hover:bg-primary-hover"
      >
        {t("chatNow")}
      </Link>
      <Link
        href="/"
        className="rounded-full border border-border px-5 py-3 text-sm font-medium text-muted transition hover:border-primary/40 hover:text-foreground"
      >
        {t("back")}
      </Link>
    </div>
  );
}
