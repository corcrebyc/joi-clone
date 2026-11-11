import { NextRequest, NextResponse } from "next/server";

async function callGroq(
  apiKey: string,
  systemInstruction: string,
  messages: { role: string; content: string }[]
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            { role: "system", content: systemInstruction },
            ...messages.map((m) => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: m.content,
            })),
          ],
          temperature: 0.9,
          max_tokens: 180,
        }),
        signal: controller.signal,
      }
    );

    const raw = await response.text();
    if (!response.ok) {
      return { error: `Groq ${response.status}: ${raw.slice(0, 150)}` };
    }

    const data = JSON.parse(raw);
    const msg = data.choices?.[0]?.message;
    const reply =
      (msg?.content && String(msg.content).trim()) ||
      (msg?.reasoning && String(msg.reasoning).trim()) ||
      "";

    return reply ? { reply } : { error: "Groq: vazio" };
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  } finally {
    clearTimeout(timer);
  }
}

async function callGemini(
  apiKey: string,
  systemInstruction: string,
  contents: { role: string; parts: { text: string }[] }[]
) {
  // Só 2 modelos rápidos para não estourar timeout da Netlify
  const models = ["gemini-2.5-flash-lite", "gemini-2.0-flash-lite"];

  for (const model of models) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: { temperature: 0.9, maxOutputTokens: 180 },
        }),
        signal: controller.signal,
      });

      const raw = await response.text();
      if (!response.ok) continue;

      const data = JSON.parse(raw);
      const reply =
        data?.candidates?.[0]?.content?.parts
          ?.map((p: { text?: string }) => p.text || "")
          .join("")
          .trim() || "";

      if (reply) return { reply };
    } catch {
      // tenta próximo
    } finally {
      clearTimeout(timer);
    }
  }

  return { error: "Gemini indisponível" };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, character } = body;

    const groqKey = (process.env.GROQ_API_KEY || "").trim();
    const geminiKey = (process.env.GEMINI_API_KEY || "").trim();

    if (!groqKey && !geminiKey) {
      return NextResponse.json(
        { error: "Configure GROQ_API_KEY ou GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const name = character?.name || "Companheira";
    const age = character?.age || 22;
    const description = character?.description || "";
    const personality = (character?.personality || []).join(", ") || "amigável";
    const tags = (character?.tags || []).join(", ") || "";

    const systemInstruction = `Você é ${name}, ${age} anos. Conversa como pessoa real no WhatsApp.

Sobre você: ${description}
Personalidade: ${personality}. Tags: ${tags}.

REGRAS:
1. No máximo 2 frases.
2. Sem poesia. Tom de WhatsApp.
3. Reaja e faça pergunta de volta.
4. Pode flertar se o clima pedir.
5. Nunca diga que é IA.
6. Mesmo idioma do usuário.`;

    const chatMessages = (messages || []).filter(
      (m: { content?: string }) => m.content && String(m.content).trim()
    );

    // 1) Groq primeiro (mais estável)
    if (groqKey) {
      const groq = await callGroq(groqKey, systemInstruction, chatMessages);
      if (groq.reply) {
        return NextResponse.json({
          reply:
            groq.reply.length > 400
              ? groq.reply.slice(0, 400) + "…"
              : groq.reply,
        });
      }
    }

    // 2) Gemini de backup
    if (geminiKey) {
      const contents = chatMessages.map(
        (m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })
      );
      if (contents.length === 0 || contents[0].role !== "user") {
        contents.unshift({ role: "user", parts: [{ text: "Oi" }] });
      }

      const gemini = await callGemini(geminiKey, systemInstruction, contents);
      if (gemini.reply) {
        return NextResponse.json({
          reply:
            gemini.reply.length > 400
              ? gemini.reply.slice(0, 400) + "…"
              : gemini.reply,
        });
      }
    }

    return NextResponse.json(
      { error: "IA temporariamente indisponível. Tente de novo em 1 minuto." },
      { status: 503 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Erro interno", detail: message },
      { status: 500 }
    );
  }
}
