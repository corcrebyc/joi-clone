"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/lib/translations";

export function Navbar() {
  const pathname = usePathname();
  const { t, locale, setLocale, locales } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { href: "/", label: t("navExplore") },
    { href: "/create", label: t("navCreate") },
    { href: "/chat", label: t("navChats") },
  ];

  const current = locales.find((l) => l.code === locale);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">JOI</span>
            <span className="text-foreground/70"> Clone</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-sm transition hover:border-primary/50 hover:bg-white/5"
              aria-label="Select language"
            >
              <span className="text-base leading-none">{current?.flag}</span>
              <span className="hidden text-xs font-medium text-muted sm:inline">
                {current?.code.toUpperCase()}
              </span>
              <svg
                className={`h-3.5 w-3.5 text-muted transition ${open ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-card shadow-xl animate-fade-in">
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLocale(l.code as Locale);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition hover:bg-white/5 ${
                      locale === l.code ? "bg-primary/10 text-primary" : "text-foreground"
                    }`}
                  >
                    <span className="text-base">{l.flag}</span>
                    <span className="font-medium">{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="hidden rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted transition hover:border-primary/50 hover:text-foreground sm:block">
            {t("navLogin")}
          </button>
          <button className="rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-primary-hover sm:px-4">
            {t("navSignup")}
          </button>
        </div>
      </div>
    </header>
  );
}
