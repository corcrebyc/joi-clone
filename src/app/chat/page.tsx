"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getCharacterById } from "@/data/characters";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function ChatContent() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const characterId = searchParams.get("character") || "emma";
  const isCustom = searchParams.get("custom") === "1";
  const customName = searchParams.get("name") || "Companheira";

  const character = isCustom
    ? {
        id: "custom",
        name: customName,
        age: 22,
        tagline: "Custom",
        description: "Uma companheira criada especialmente por você.",
        personality: ["amigável", "carinhosa", "envolvente"],
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
        tags: ["Custom"],
        chats: "0",
        likes: "0",
      }
    : getCharacterById(characterId);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: character
        ? `Oi... eu sou a ${character.name}. ${
            character.description
              ? character.description.slice(0, 140) + "..."
              : ""
          } Me conta o que você está pensando?`
        : "Oi! Como posso te ajudar hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          character: character
            ? {
                name: character.name,
                age: character.age,
                description: character.description,
                personality: character.personality,
                tags: character.tags,
              }
            : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro na API");
      }

      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Desculpa, tive um probleminha agora... Tenta de novo em instantes? 💕",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  if (!character) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-muted">{t("notFound")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-3xl flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <img
          src={character.image}
          alt={character.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h2 className="font-semibold">{character.name}</h2>
          <p className="text-xs text-muted">{character.tagline}</p>
        </div>
        <Link
          href="/"
          className="rounded-full border border-border px-3 py-1.5 text-xs text-muted transition hover:text-foreground"
        >
          {t("leave")}
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex animate-fade-in ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "rounded-br-md bg-primary text-white"
                  : "rounded-bl-md border border-border bg-card text-foreground"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-muted" />
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-muted [animation-delay:0.2s]" />
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-muted [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="border-t border-border p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`${t("chatPlaceholder")} ${character.name}...`}
            disabled={isLoading}
            className="flex-1 rounded-full border border-border bg-card px-5 py-3 text-sm outline-none transition focus:border-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-40"
          >
            {t("send")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[70vh] items-center justify-center text-muted">
          Loading...
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
