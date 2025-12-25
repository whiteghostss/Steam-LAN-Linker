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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Path Copied',
      description: 'The directory path has been copied to your clipboard.',
    });
  };
  
  const handleImport = () => {
    toast({
        title: 'Importing Steam Save',
        description: `Simulating import of latest Steam save for ${game.name}.`,
    });
  };
  
  const handleBackup = () => {
    toast({
        title: 'Manual Backup Created',
        description: `A new save snapshot has been created.`,
    });
  };

  const handleRollback = (id: number) => {
     toast({
        title: 'Rollback Successful',
        description: `Save snapshot #${id} has been restored.`,
    });
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Save Game Sync</CardTitle>
          <CardDescription>
            Manage and transfer your save files between modes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Original Steam Save Path</Label>
            <div className="flex gap-2">
                <Input readOnly value="%APPDATA%/Roaming/EldenRing/..." />
                <Button variant="ghost" size="icon" onClick={() => handleCopy('%APPDATA%/Roaming/EldenRing/...')}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>LAN Mode (Goldberg) Save Path</Label>
             <div className="flex gap-2">
                <Input readOnly value="%APPDATA%/Roaming/Goldberg SteamEmu Saves/1245620/..." />
                 <Button variant="ghost" size="icon" onClick={() => handleCopy('%APPDATA%/Roaming/Goldberg SteamEmu Saves/1245620/...')}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
          </div>
          <Button className="w-full" variant="outline" onClick={handleImport}>
            <FolderSymlink className="mr-2 h-4 w-4" />
            Import Latest Steam Save to LAN Mode
          </Button>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
            This action copies and renames your Steam save for Goldberg compatibility.
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Save Snapshots & Backups</CardTitle>
          <CardDescription>
            Create and manage automatic save backups.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backup-path">Custom Backup Directory</Label>
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
            <Label>Auto-Backup Frequency: {gameState.backupFrequency} mins</Label>
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
              Create Manual Backup Now
            </Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
            <CardTitle>Backup History</CardTitle>
            <CardDescription>Restore your game to a previous state.</CardDescription>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-48">
                <ul className="space-y-2 pr-4">
                    {mockSnapshots.map(snapshot => (
                         <li key={snapshot.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                            <div className="flex items-center gap-3">
                                <History className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium text-sm">Snapshot #{snapshot.id}</p>
                                    <p className="text-xs text-muted-foreground">{snapshot.timestamp} ({snapshot.size})</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleRollback(snapshot.id)}>
                                    <UploadCloud className="h-4 w-4 mr-2"/>
                                    Restore
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
