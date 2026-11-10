import Link from "next/link";
import type { Character } from "@/data/characters";

type Props = {
  character: Character;
};

export function CharacterCard({ character }: Props) {
  return (
    <Link
      href={`/character/${character.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_-10px_rgba(255,45,85,0.3)]"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Badge */}
        {character.isOriginal && (
          <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
            Original
          </span>
        )}

        {/* Stats overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-xs font-medium text-primary/90">{character.tagline}</p>
          <h3 className="mt-0.5 text-lg font-bold text-white">
            {character.name}, {character.age}
          </h3>
          <div className="mt-2 flex items-center gap-3 text-xs text-white/70">
            <span>{character.chats} chats</span>
            <span>·</span>
            <span>{character.likes} likes</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 p-3">
        {character.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
