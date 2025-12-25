'use client';

import { useState } from 'react';
import type { Game, GameState } from '@/types';
import { Disclaimer } from '@/components/lan-party-starter/Disclaimer';
import { GameDetails } from '@/components/lan-party-starter/GameDetails';
import { GameList } from '@/components/lan-party-starter/GameList';
import { Header } from '@/components/lan-party-starter/Header';
import { games as initialGames } from '@/lib/games';

// Function to generate a random 17-digit SteamID
const generateSteamId = () => {
  let id = '';
  for (let i = 0; i < 17; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
};

export default function Home() {
  const [games] = useState<Game[]>(initialGames);
  const [selectedGame, setSelectedGame] = useState<Game | null>(games[0] || null);
  
  const [gameStates, setGameStates] = useState<Record<string, GameState>>(() => {
      const initialStates: Record<string, GameState> = {};
      initialGames.forEach(game => {
          initialStates[game.appid] = {
              isDeployed: false,
              nickname: `Player${Math.floor(Math.random() * 1000)}`,
              steamId: generateSteamId(),
              backupPath: `D:/GameSaves/${game.name}`,
              backupFrequency: 30,
          };
      });
      return initialStates;
  });

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
  };
  
  const handleGameStateChange = (appid: string, newState: Partial<GameState>) => {
    setGameStates(prevStates => ({
        ...prevStates,
        [appid]: {
            ...prevStates[appid],
            ...newState,
        }
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <GameList
          games={games}
          selectedGame={selectedGame}
          onSelectGame={handleSelectGame}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            {selectedGame && gameStates[selectedGame.appid] ? (
              <GameDetails game={selectedGame} gameState={gameStates[selectedGame.appid]} onGameStateChange={(newState) => handleGameStateChange(selectedGame.appid, newState)} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-headline font-semibold">Welcome to LAN Party Starter</h2>
                  <p className="text-muted-foreground mt-2">
                    Select a game from the left to get started.
                  </p>
                </div>
              </div>
            )}
          </main>
          <footer className="border-t p-4 flex justify-center items-center">
            <Disclaimer />
          </footer>
        </div>
      </div>
    </div>
  );
}
