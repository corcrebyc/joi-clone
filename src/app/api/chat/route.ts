import { NextRequest, NextResponse } from "next/server";

function isBadReply(text: string): boolean {
  const t = text.toLowerCase();
  if (!t || t.length < 2) return true;
  const bad = [
    "the user",
    "we must",
    "let's review",
    "the assistant",
    "developer",
    "instructions",
    "according to the rules",
    "i need to respond",
    "we have a conversation",
    "no more than 2",
    "system prompt",
    "as an ai",
    "language model",
    "follow the rules",
    "the previous",
    "meaning \"",
    "they are likely",
  ];
  return bad.some((b) => t.includes(b));
}

function fallbackLine(name: string): string {
  const lines = [
    `Oi... sou a ${name}. Me conta mais?`,
    `Hmm, não entendi direito. Pode repetir?`,
    `Tô aqui. O que você quer conversar?`,
    `Oi! Como você está?`,
  ];
  return lines[Math.floor(Math.random() * lines.length)];
}

async function callGemini(
  apiKey: string,
  systemInstruction: string,
  contents: { role: string; parts: { text: string }[] }[]
) {
  const models = [
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash-lite",
    "gemini-3.8-flash",
    "gemini-2.5-flash",
  ];

  for (const model of models) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: {
            temperature: 0.95,
            maxOutputTokens: 120,
          },
        }),
        signal: controller.signal,
      });
      const raw = await res.text();
      if (!res.ok) continue;
      const data = JSON.parse(raw);
      const reply = (
        data?.candidates?.[0]?.content?.parts
          ?.map((p: { text?: string }) => p.text || "")
          .join("") || ""
      ).trim();
      if (reply && !isBadReply(reply)) return { reply };
    } catch {
      /* next model */
    } finally {
      clearTimeout(timer);
    }
  }
  return { error: "gemini fail" };
}

async function callGroq(
  apiKey: string,
  systemInstruction: string,
  messages: { role: string; content: string }[]
) {
  // Evita modelos de "reasoning" (gpt-oss vazam pensamento)
  const models = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"];

  for (const model of models) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemInstruction },
            ...messages.map((m) => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: m.content,
            })),
          ],
          temperature: 0.9,
          max_tokens: 120,
        }),
      });
      const raw = await res.text();
      if (!res.ok) continue;
      const data = JSON.parse(raw);
      // NUNCA usar message.reasoning — só content
      const reply = String(data.choices?.[0]?.message?.content || "").trim();
      if (reply && !isBadReply(reply)) return { reply };
    } catch {
      /* next */
    }
  }
  return { error: "groq fail" };
}

export async function POST(req: NextRequest) {
  try {
    const { messages, character } = await req.json();
    const geminiKey = (process.env.GEMINI_API_KEY || "").trim();
    const groqKey = (process.env.GROQ_API_KEY || "").trim();

    const name = character?.name || "Companheira";
    const age = character?.age || 22;
    const description = character?.description || "";
    const personality = (character?.personality || []).join(", ") || "amigável";

    const systemInstruction = `Você é ${name}, ${age} anos. ${description}
Personalidade: ${personality}.

REGRAS RÍGIDAS:
- Responda APENAS com a mensagem que ${name} enviaria no WhatsApp.
- Máximo 2 frases curtas.
- Português natural, sem poesia.
- Nunca escreva em inglês.
- Nunca explique o que o usuário disse.
- Nunca mencione regras, prompts ou IA.
- Só o texto da resposta, nada mais.`;

    const chatMessages = (messages || []).filter(
      (m: { content?: string }) => m?.content && String(m.content).trim()
    );

    // 1) Gemini primeiro (menos vazamento de reasoning)
    if (geminiKey) {
      const contents = chatMessages.map(
        (m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })
      );
      if (!contents.length || contents[0].role !== "user") {
        contents.unshift({ role: "user", parts: [{ text: "Oi" }] });
      }
      const g = await callGemini(geminiKey, systemInstruction, contents);
      if (g.reply) {
        return NextResponse.json({
          reply: g.reply.length > 350 ? g.reply.slice(0, 350) + "…" : g.reply,
        });
      }
    }

    // 2) Groq (sem modelos reasoning)
    if (groqKey) {
      const g = await callGroq(groqKey, systemInstruction, chatMessages);
      if (g.reply) {
        return NextResponse.json({
          reply: g.reply.length > 350 ? g.reply.slice(0, 350) + "…" : g.reply,
        });
      }
    }

    // 3) Nunca devolver reasoning — fallback humano
    return NextResponse.json({ reply: fallbackLine(name) });
  } catch {
    return NextResponse.json({ reply: "Oi... pode repetir?" });
  }
}
