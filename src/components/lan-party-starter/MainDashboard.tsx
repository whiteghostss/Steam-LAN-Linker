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
import { useI18n } from '@/hooks/useI18n';
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
  const { t } = useI18n();
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
            title: t('toasts.deploymentSuccessful.title'),
            description: t('toasts.deploymentSuccessful.description', { gameName: game.name }),
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
            title: t('toasts.restoreComplete.title'),
            description: t('toasts.restoreComplete.description', { gameName: game.name }),
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
      title: t('toasts.copiedToClipboard.title'),
      description: t('toasts.copiedToClipboard.description', { label }),
    });
  };
  
  const handleStartGame = () => {
    toast({
        title: t('toasts.startingGame.title'),
        description: t('toasts.startingGame.description', { gameName: game.name }),
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
                  {gameState.isDeployed ? t('mainDashboard.status.restoring') : t('mainDashboard.status.deploying')}
                </p>
              </div>
            )}
            {!isProcessing && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={handleDeploy} disabled={gameState.isDeployed}>
                  <Wrench className="mr-2 h-4 w-4" /> {t('mainDashboard.buttons.deploy')}
                </Button>
                <Button
                  onClick={handleRestore}
                  disabled={!gameState.isDeployed}
                  variant="outline"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> {t('mainDashboard.buttons.restore')}
                </Button>
              </div>
            )}
            <div className="pt-4">
                <Button onClick={handleStartGame} disabled={!gameState.isDeployed} className="w-full" size="lg">
                    <Rocket className="mr-2 h-4 w-4" /> {t('mainDashboard.buttons.startGame')}
                </Button>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            <Info className="h-4 w-4 mr-2 shrink-0" />
            {t('mainDashboard.footer')}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('mainDashboard.identity.title')}</CardTitle>
            <CardDescription>
              {t('mainDashboard.identity.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nickname">{t('mainDashboard.identity.nicknameLabel')}</Label>
              <Input
                id="nickname"
                value={gameState.nickname}
                onChange={(e) => onGameStateChange({ nickname: e.target.value })}
                placeholder={t('mainDashboard.identity.nicknamePlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="steamid">{t('mainDashboard.identity.steamIdLabel')}</Label>
              <div className="flex items-center gap-2">
                <Input id="steamid" value={gameState.steamId} readOnly />
                <Button variant="ghost" size="icon" onClick={() => handleCopy(gameState.steamId, t('mainDashboard.identity.steamIdLabel'))}>
                    <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {gameConfig && (
        <Card>
            <CardHeader>
                <CardTitle>{t('mainDashboard.compatReport.title')}</CardTitle>
                <CardDescription>
                {t('mainDashboard.compatReport.description', { gameName: game.name })}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t('mainDashboard.compatReport.drm')}</span>
                    <div className="flex items-center gap-2 font-medium">
                        {gameConfig.has_denuvo ? <XCircle className="h-5 w-5 text-red-500" /> : <CheckCircle className="h-5 w-5 text-green-500" />}
                        <span>{gameConfig.has_denuvo ? t('mainDashboard.compatReport.detected') : t('mainDashboard.compatReport.notDetected')}</span>
                    </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t('mainDashboard.compatReport.seamlessCoop')}</span>
                     <div className="flex items-center gap-2 font-medium">
                        {gameConfig.needs_seamless_mod ? <CheckCircle className="h-5 w-5 text-blue-500" /> : <XCircle className="h-5 w-5 text-muted-foreground" />}
                        <span>{gameConfig.needs_seamless_mod ? t('mainDashboard.compatReport.recommended') : t('mainDashboard.compatReport.notRequired')}</span>
                    </div>
                </div>
                 <Separator />
                 <div className="flex flex-col space-y-2">
                    <span className="text-muted-foreground">{t('mainDashboard.compatReport.savePath')}</span>
                    <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted p-2 rounded-md font-mono w-full break-all">{gameConfig.save_path}</code>
                        <Button variant="ghost" size="icon" onClick={() => handleCopy(gameConfig.save_path, t('mainDashboard.compatReport.savePath'))}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
                <Info className="h-4 w-4 mr-2 shrink-0" />
                {t('mainDashboard.compatReport.footer')}
            </CardFooter>
        </Card>
        )}
      </div>
    </TooltipProvider>
  );
}
