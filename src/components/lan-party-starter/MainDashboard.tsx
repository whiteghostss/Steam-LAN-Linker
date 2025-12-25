'use client';

import { useState } from 'react';
import {
  Rocket,
  Wrench,
  RotateCcw,
  Info,
  CheckCircle,
  XCircle,
  Save,
  Copy,
} from 'lucide-react';
import type { Game, GameConfig, GameState } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { StatusIndicator } from './StatusIndicator';

type MainDashboardProps = {
  game: Game;
  gameState: GameState;
  gameConfig: GameConfig | null;
  onGameStateChange: (newState: Partial<GameState>) => void;
};

export function MainDashboard({
  game,
  gameState,
  gameConfig,
  onGameStateChange,
}: MainDashboardProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDeploy = () => {
    setIsProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          onGameStateChange({ isDeployed: true });
          toast({
            title: 'Deployment Successful',
            description: `${game.name} is now ready for LAN play.`,
            variant: 'default',
          });
          return 100;
        }
        return p + 20;
      });
    }, 300);
  };

  const handleRestore = () => {
    setIsProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          onGameStateChange({ isDeployed: false });
          toast({
            title: 'Restore Complete',
            description: `${game.name} has been restored to Steam mode.`,
            variant: 'default',
          });
          return 100;
        }
        return p + 15;
      });
    }, 200);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard',
      description: `${label} has been copied.`,
    });
  };
  
  const handleStartGame = () => {
    toast({
        title: 'Starting Game...',
        description: `Launching ${game.name}. Please ensure Steam is closed.`,
    });
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="font-headline text-3xl">{game.name}</CardTitle>
                <CardDescription>AppID: {game.appid}</CardDescription>
              </div>
              <StatusIndicator isReady={gameState.isDeployed} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {isProcessing && (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground text-center">
                  {gameState.isDeployed ? 'Restoring original files...' : 'Deploying Goldberg emulator...'}
                </p>
              </div>
            )}
            {!isProcessing && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={handleDeploy} disabled={gameState.isDeployed}>
                  <Wrench className="mr-2 h-4 w-4" /> Deploy LAN Mode
                </Button>
                <Button
                  onClick={handleRestore}
                  disabled={!gameState.isDeployed}
                  variant="outline"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> Restore to Steam
                </Button>
              </div>
            )}
            <div className="pt-4">
                <Button onClick={handleStartGame} disabled={!gameState.isDeployed} className="w-full" size="lg">
                    <Rocket className="mr-2 h-4 w-4" /> Start Game in LAN Mode
                </Button>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            <Info className="h-4 w-4 mr-2 shrink-0" />
            Deploying backs up original files and injects the LAN emulator. Restore reverts all changes.
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Identity & Network</CardTitle>
            <CardDescription>
              Set your unique identity for LAN sessions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nickname">In-Game Nickname</Label>
              <Input
                id="nickname"
                value={gameState.nickname}
                onChange={(e) => onGameStateChange({ nickname: e.target.value })}
                placeholder="Enter your desired name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="steamid">Generated SteamID</Label>
              <div className="flex items-center gap-2">
                <Input id="steamid" value={gameState.steamId} readOnly />
                <Button variant="ghost" size="icon" onClick={() => handleCopy(gameState.steamId, 'SteamID')}>
                    <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {gameConfig && (
        <Card>
            <CardHeader>
                <CardTitle>Compatibility Report</CardTitle>
                <CardDescription>
                Automated analysis for {game.name}.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">3rd Party DRM (e.g. Denuvo)</span>
                    <div className="flex items-center gap-2 font-medium">
                        {gameConfig.has_denuvo ? <XCircle className="h-5 w-5 text-red-500" /> : <CheckCircle className="h-5 w-5 text-green-500" />}
                        <span>{gameConfig.has_denuvo ? "Detected" : "Not Detected"}</span>
                    </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Seamless Co-op Mod</span>
                     <div className="flex items-center gap-2 font-medium">
                        {gameConfig.needs_seamless_mod ? <CheckCircle className="h-5 w-5 text-blue-500" /> : <XCircle className="h-5 w-5 text-muted-foreground" />}
                        <span>{gameConfig.needs_seamless_mod ? "Recommended" : "Not Required"}</span>
                    </div>
                </div>
                 <Separator />
                 <div className="flex flex-col space-y-2">
                    <span className="text-muted-foreground">Default Save Path</span>
                    <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted p-2 rounded-md font-mono w-full break-all">{gameConfig.save_path}</code>
                        <Button variant="ghost" size="icon" onClick={() => handleCopy(gameConfig.save_path, 'Save Path')}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
                <Info className="h-4 w-4 mr-2 shrink-0" />
                This data is from a cloud compatibility database.
            </CardFooter>
        </Card>
        )}
      </div>
    </TooltipProvider>
  );
}
