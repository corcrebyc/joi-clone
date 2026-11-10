"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CreatePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [age, setAge] = useState(22);
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [personality, setPersonality] = useState("");
  const [tags, setTags] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = name.toLowerCase().replace(/\s+/g, "-") || "custom";
    router.push(
      `/chat?character=${id}&custom=1&name=${encodeURIComponent(name)}`
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">{t("createTitle")}</h1>
      <p className="mt-2 text-muted">{t("createSubtitle")}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            {t("labelName")}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("placeholderName")}
            required
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            {t("labelAge")}
          </label>
          <input
            type="number"
            min={18}
            max={60}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            {t("labelTagline")}
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder={t("placeholderTagline")}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            {t("labelDescription")}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder={t("placeholderDescription")}
            className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            {t("labelPersonality")}
          </label>
          <input
            type="text"
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            placeholder={t("placeholderPersonality")}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            {t("labelTags")}
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder={t("placeholderTags")}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div className="rounded-xl border border-dashed border-border bg-card/30 p-6 text-center">
          <p className="text-sm text-muted">{t("avatarPlaceholder")}</p>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          {t("createButton")}
        </button>
      </form>
    </div>
  );
}
