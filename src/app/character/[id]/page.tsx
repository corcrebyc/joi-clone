import { getCharacterById, characters } from "@/data/characters";
import { notFound } from "next/navigation";
import { CharacterActions } from "@/components/CharacterActions";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return characters.map((c) => ({ id: c.id }));
}

export default async function CharacterPage({ params }: Props) {
  const { id } = await params;
  const character = getCharacterById(id);

  if (!character) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border">
          <img
            src={character.image}
            alt={character.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-primary">{character.tagline}</p>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
            {character.name}, {character.age}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            {character.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-6 leading-relaxed text-muted">{character.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {character.personality.map((p) => (
              <span
                key={p}
                className="rounded-full border border-border px-3 py-1 text-xs capitalize text-foreground/80"
              >
                {p}
              </span>
            ))}
          </div>

          <CharacterActions characterId={character.id} />

          <div className="mt-6 flex gap-6 text-sm text-muted">
            <span>
              {character.chats} chats
            </span>
            <span>
              {character.likes} likes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
