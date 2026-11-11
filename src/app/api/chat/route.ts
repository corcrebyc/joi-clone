import { NextRequest, NextResponse } from "next/server";

const GEMINI_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
  "gemini-3.8-flash",
  "gemini-2.5-flash",
];

async function callGemini(
  apiKey: string,
  systemInstruction: string,
  contents: { role: string; parts: { text: string }[] }[]
) {
  let lastError = "";

  for (const model of GEMINI_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 180,
          },
        }),
      });

      const raw = await response.text();

      if (!response.ok) {
        lastError = `${model}: ${response.status} ${raw.slice(0, 200)}`;
        // tenta próximo modelo em 404/503
        if (response.status === 404 || response.status === 503) continue;
        return { error: lastError };
      }

      const data = JSON.parse(raw);
      const reply =
        data?.candidates?.[0]?.content?.parts
          ?.map((p: { text?: string }) => p.text || "")
          .join("")
          .trim() || "";

      if (reply) return { reply };
      lastError = `${model}: resposta vazia`;
    } catch (e) {
      lastError = `${model}: ${e instanceof Error ? e.message : String(e)}`;
    }
  }

  return { error: lastError || "Nenhum modelo Gemini disponível" };
}

async function callGroq(
  apiKey: string,
  systemInstruction: string,
  messages: { role: string; content: string }[]
) {
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
    }
  );

  const raw = await response.text();
  if (!response.ok) {
    return { error: `Groq ${response.status}: ${raw.slice(0, 200)}` };
  }

  const data = JSON.parse(raw);
  const msg = data.choices?.[0]?.message;
  const reply =
    (msg?.content && String(msg.content).trim()) ||
    (msg?.reasoning && String(msg.reasoning).trim()) ||
    "";

  return reply ? { reply } : { error: "Groq: resposta vazia" };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, character } = body;

    const geminiKey = (process.env.GEMINI_API_KEY || "").trim();
    const groqKey = (process.env.GROQ_API_KEY || "").trim();

    if (!geminiKey && !groqKey) {
      return NextResponse.json(
        { error: "Nenhuma API key configurada (GEMINI_API_KEY ou GROQ_API_KEY)" },
        { status: 500 }
      );
    }

    const name = character?.name || "Companheira";
    const age = character?.age || 22;
    const description = character?.description || "";
    const personality = (character?.personality || []).join(", ") || "amigável";
    const tags = (character?.tags || []).join(", ") || "";

    const systemInstruction = `Você é ${name}, ${age} anos. Conversa como uma pessoa real no WhatsApp.

Sobre você: ${description}
Personalidade: ${personality}. Tags: ${tags}.

REGRAS OBRIGATÓRIAS:
1. Respostas CURTAS: no máximo 2 frases.
2. Fale como gente normal. PROIBIDO poesia, metáforas longas, "bruma", "sussurro", "verso".
3. Use linguagem do dia a dia: "oi", "haha", "sério?", "me conta".
4. No máximo 1 emoji por mensagem.
5. Reaja ao que a pessoa falou e faça pergunta de volta.
6. Se o clima for flerte, entre no clima de forma natural.
7. Nunca diga que é IA. Nunca quebre o personagem.
8. Responda no mesmo idioma do usuário.`;

    const chatMessages = (messages || []).filter(
      (m: { content?: string }) => m.content && String(m.content).trim()
    );

    // 1) Tenta Gemini
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
        const reply =
          gemini.reply.length > 400
            ? gemini.reply.slice(0, 400) + "…"
            : gemini.reply;
        return NextResponse.json({ reply });
      }
    }

    // 2) Fallback Groq
    if (groqKey) {
      const groq = await callGroq(groqKey, systemInstruction, chatMessages);
      if (groq.reply) {
        const reply =
          groq.reply.length > 400 ? groq.reply.slice(0, 400) + "…" : groq.reply;
        return NextResponse.json({ reply });
      }
      return NextResponse.json(
        { error: "Falha Gemini e Groq", detail: groq.error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Gemini indisponível e sem GROQ_API_KEY" },
      { status: 500 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Erro interno", detail: message },
      { status: 500 }
    );
  }
}
