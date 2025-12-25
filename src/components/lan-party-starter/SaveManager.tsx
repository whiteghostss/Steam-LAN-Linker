'use client';

import { useState } from 'react';
import {
  FolderUp,
  History,
  Save,
  Trash2,
  UploadCloud,
  Copy,
  FolderSymlink,
} from 'lucide-react';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import type { Game, GameState } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/hooks/useI18n';

type SaveManagerProps = {
  game: Game;
  gameState: GameState;
  onGameStateChange: (newState: Partial<GameState>) => void;
};

const mockSnapshots = [
  { id: 3, timestamp: '2023-10-27 10:30:00', size: '15.2 MB' },
  { id: 2, timestamp: '2023-10-27 10:00:00', size: '15.1 MB' },
  { id: 1, timestamp: '2023-10-27 09:30:00', size: '14.8 MB' },
];

export function SaveManager({ game, gameState, onGameStateChange }: SaveManagerProps) {
  const { toast } = useToast();
  const { t } = useI18n();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: t('toasts.pathCopied.title'),
      description: t('toasts.pathCopied.description'),
    });
  };
  
  const handleImport = () => {
    toast({
        title: t('toasts.importingSteamSave.title'),
        description: t('toasts.importingSteamSave.description', { gameName: game.name }),
    });
  };
  
  const handleBackup = () => {
    toast({
        title: t('toasts.manualBackupCreated.title'),
        description: t('toasts.manualBackupCreated.description'),
    });
  };

  const handleRollback = (id: number) => {
     toast({
        title: t('toasts.rollbackSuccessful.title'),
        description: t('toasts.rollbackSuccessful.description', { snapshotId: id }),
    });
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <Card>
        <CardHeader>
          <CardTitle>{t('saveManager.sync.title')}</CardTitle>
          <CardDescription>
            {t('saveManager.sync.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t('saveManager.sync.steamPathLabel')}</Label>
            <div className="flex gap-2">
                <Input readOnly value="%APPDATA%/Roaming/EldenRing/..." />
                <Button variant="ghost" size="icon" onClick={() => handleCopy('%APPDATA%/Roaming/EldenRing/...')}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t('saveManager.sync.lanPathLabel')}</Label>
             <div className="flex gap-2">
                <Input readOnly value="%APPDATA%/Roaming/Goldberg SteamEmu Saves/1245620/..." />
                 <Button variant="ghost" size="icon" onClick={() => handleCopy('%APPDATA%/Roaming/Goldberg SteamEmu Saves/1245620/...')}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
          </div>
          <Button className="w-full" variant="outline" onClick={handleImport}>
            <FolderSymlink className="mr-2 h-4 w-4" />
            {t('saveManager.sync.importButton')}
          </Button>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
            {t('saveManager.sync.footer')}
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('saveManager.backups.title')}</CardTitle>
          <CardDescription>
            {t('saveManager.backups.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backup-path">{t('saveManager.backups.customDirectoryLabel')}</Label>
            <div className="flex gap-2">
              <Input
                id="backup-path"
                value={gameState.backupPath}
                onChange={(e) => onGameStateChange({ backupPath: e.target.value })}
                placeholder="D:/GameSaves/LANPartyStarter"
              />
              <Button variant="ghost" size="icon">
                <FolderUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            <Label>{t('saveManager.backups.frequencyLabel', { minutes: gameState.backupFrequency })}</Label>
            <Slider
              value={[gameState.backupFrequency]}
              onValueChange={(value) => onGameStateChange({ backupFrequency: value[0] })}
              min={15}
              max={120}
              step={15}
            />
          </div>
           <Separator />
           <Button className="w-full" onClick={handleBackup}>
              <Save className="mr-2 h-4 w-4" />
              {t('saveManager.backups.backupButton')}
            </Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
            <CardTitle>{t('saveManager.history.title')}</CardTitle>
            <CardDescription>{t('saveManager.history.description')}</CardDescription>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-48">
                <ul className="space-y-2 pr-4">
                    {mockSnapshots.map(snapshot => (
                         <li key={snapshot.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                            <div className="flex items-center gap-3">
                                <History className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium text-sm">{t('saveManager.history.snapshotLabel', { id: snapshot.id })}</p>
                                    <p className="text-xs text-muted-foreground">{snapshot.timestamp} ({snapshot.size})</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleRollback(snapshot.id)}>
                                    <UploadCloud className="h-4 w-4 mr-2"/>
                                    {t('saveManager.history.restoreButton')}
                                </Button>
                                 <Button size="sm" variant="destructive-outline">
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
