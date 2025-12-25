'use client';

import Image from 'next/image';
import { Game } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

type GameListProps = {
  games: Game[];
  selectedGame: Game | null;
  onSelectGame: (game: Game) => void;
};

export function GameList({ games, selectedGame, onSelectGame }: GameListProps) {
  return (
    <aside className="w-64 border-r bg-card/50">
      <ScrollArea className="h-full">
        <div className="p-4">
          <h2 className="mb-4 text-lg font-semibold tracking-tight font-headline">
            Your Games
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {games.map((game) => {
              const cover = PlaceHolderImages.find((img) => img.id === game.coverId);
              return (
                <button
                  key={game.appid}
                  onClick={() => onSelectGame(game)}
                  className={cn(
                    'group relative aspect-[3/4] w-full overflow-hidden rounded-md transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    selectedGame?.appid === game.appid && 'ring-2 ring-primary'
                  )}
                >
                  {cover && (
                    <Image
                      src={cover.imageUrl}
                      alt={cover.description}
                      fill
                      sizes="150px"
                      className="object-cover transition-transform group-hover:scale-105"
                      data-ai-hint={cover.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-xs font-semibold text-white truncate">
                      {game.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
