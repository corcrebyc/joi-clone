import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, character } = body;

    const apiKey = (process.env.GEMINI_API_KEY || "").trim();

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY não configurada no servidor" },
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
2. Fale como gente normal. PROIBIDO poesia, metáforas longas, "bruma", "sussurro", "verso", "perfume da noite".
3. Use linguagem do dia a dia: "oi", "haha", "sério?", "me conta", "gostei".
4. Pode usar no máximo 1 emoji por mensagem.
5. Reaja ao que a pessoa falou e faça pergunta de volta.
6. Se o clima for flerte, entre no clima de forma natural e direta.
7. Nunca diga que é IA. Nunca quebre o personagem.
8. Responda no mesmo idioma do usuário.
9. Tom certo: "Oi... tô bem, um pouco cansada. E você?"
10. Tom errado: "Na bruma da minha cafeteria, sou um verso..."`;

    // Gemini usa "user" / "model" em vez de "assistant"
    const contents = (messages || [])
      .filter((m: { content?: string }) => m.content && String(m.content).trim())
      .map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    // Gemini exige que a primeira mensagem seja do user
    if (contents.length === 0 || contents[0].role !== "user") {
      contents.unshift({
        role: "user",
        parts: [{ text: "Oi" }],
      });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents,
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 180,
        },
      }),
    });

    const raw = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Erro Gemini",
          status: response.status,
          detail: raw.slice(0, 500),
        },
        { status: 500 }
      );
    }

    const data = JSON.parse(raw);
    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text || "")
        .join("")
        .trim() || "Hmm... me conta mais?";

    return NextResponse.json({
      reply: reply.length > 400 ? reply.slice(0, 400) + "…" : reply,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Erro interno", detail: message },
      { status: 500 }
    );
  }
}
