'use client';

import { useEffect, useState } from 'react';
import { Gamepad2, Network, Save } from 'lucide-react';
import { getGameConfig } from '@/ai/flows/cloud-compatibility-db';
import type { Game, GameConfig, GameState } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/hooks/useI18n';
import { LanLobby } from './LanLobby';
import { MainDashboard } from './MainDashboard';
import { SaveManager } from './SaveManager';

type GameDetailsProps = {
  game: Game;
  gameState: GameState;
  onGameStateChange: (newState: Partial<GameState>) => void;
};

// Mock data to be used if the AI call fails
const mockGameConfigs: Record<string, GameConfig> = {
    "1245620": {
      "name": "Elden Ring",
      "has_denuvo": false,
      "save_path": "%APPDATA%/EldenRing/",
      "needs_seamless_mod": true,
      "config_template": "seamless_coop"
    },
    "default": {
      "name": "Unknown Game",
      "has_denuvo": false,
      "save_path": "N/A",
      "needs_seamless_mod": false,
    }
}


export function GameDetails({ game, gameState, onGameStateChange }: GameDetailsProps) {
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useI18n();

  useEffect(() => {
    async function fetchConfig() {
      if (!game) return;
      setIsLoading(true);
      setGameConfig(null);

      try {
        // This call is expected to fail as per the project description.
        // In a real scenario, it would contact a live API.
        const config = await getGameConfig({ appid: game.appid });
        setGameConfig(config);
      } catch (error) {
        console.warn('AI flow `getGameConfig` failed. Using fallback mock data.', error);
        toast({
          title: t('toasts.cloudDbUnreachable.title'),
          description: t('toasts.cloudDbUnreachable.description'),
          variant: 'default',
        });
        // Fallback to mock data
        const mockConfig = mockGameConfigs[game.appid] || mockGameConfigs.default;
        setGameConfig(mockConfig);
      } finally {
        setIsLoading(false);
      }
    }
    fetchConfig();
  }, [game, toast, t]);

  return (
    <main className="flex-1 p-6">
      <Tabs defaultValue="dashboard" className="h-full space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">
            <Gamepad2 className="mr-2 h-4 w-4" />
            {t('gameDetails.tabs.dashboard')}
          </TabsTrigger>
          <TabsTrigger value="lobby">
            <Network className="mr-2 h-4 w-4" />
            {t('gameDetails.tabs.lobby')}
          </TabsTrigger>
          <TabsTrigger value="saves">
            <Save className="mr-2 h-4 w-4" />
            {t('gameDetails.tabs.saves')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          {isLoading ? (
             <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-20 w-full" />
                </CardContent>
            </Card>
          ) : (
            <MainDashboard game={game} gameState={gameState} gameConfig={gameConfig} onGameStateChange={onGameStateChange} />
          )}
        </TabsContent>
        <TabsContent value="lobby">
          <LanLobby />
        </TabsContent>
        <TabsContent value="saves">
          <SaveManager game={game} gameState={gameState} onGameStateChange={onGameStateChange} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
