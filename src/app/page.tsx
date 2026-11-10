"use client";

import { characters } from "@/data/characters";
import { CharacterCard } from "@/components/CharacterCard";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {t("heroTitle1")}{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t("heroTitle2")}
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">{t("heroSubtitle")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/create"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            {t("heroCtaCreate")}
          </Link>
          <Link
            href="#gallery"
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted transition hover:border-primary/50 hover:text-foreground"
          >
            {t("heroCtaExplore")}
          </Link>
        </div>
      </section>

      {/* Age notice */}
      <div className="mb-8 rounded-xl border border-border bg-card/50 px-4 py-3 text-center text-sm text-muted">
        {t("ageNotice")}
      </div>

      {/* Gallery */}
      <section id="gallery">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{t("galleryTitle")}</h2>
          <span className="text-sm text-muted">
            {characters.length} {t("galleryCount")}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </section>

      {/* CTA bottom */}
      <section className="mt-16 rounded-2xl border border-border bg-gradient-to-br from-card to-background p-8 text-center">
        <h2 className="text-2xl font-bold">{t("ctaTitle")}</h2>
        <p className="mx-auto mt-2 max-w-md text-muted">{t("ctaSubtitle")}</p>
        <Link
          href="/create"
          className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          {t("ctaButton")}
        </Link>
      </section>
    </div>
  );
}
