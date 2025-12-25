'use client';

import { useState } from 'react';
import {
  Activity,
  Check,
  ChevronRight,
  CircleDot,
  Network,
  ShieldCheck,
  ShieldOff,
  User,
  Wifi,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

type PingResult = {
  latency: number;
  packetLoss: number;
  jitter: number;
};

const mockPlayers = [
  { name: 'PlayerB', ip: '192.168.1.101', status: 'Online' },
  { name: 'HostMaster', ip: '192.168.1.105', status: 'Online' },
];

export function LanLobby() {
  const { toast } = useToast();
  const [ipAddress, setIpAddress] = useState('');
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<PingResult | null>(null);

  const handlePing = () => {
    if (!ipAddress) {
      toast({
        title: 'IP Address Required',
        description: 'Please enter an IP address to test.',
        variant: 'destructive',
      });
      return;
    }
    setIsPinging(true);
    setPingResult(null);
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      if (success) {
        setPingResult({
          latency: Math.floor(Math.random() * 50) + 5, // 5-55ms
          packetLoss: Math.random() > 0.9 ? Math.floor(Math.random() * 5) : 0, // 10% chance of packet loss
          jitter: Math.floor(Math.random() * 10) + 1, // 1-11ms
        });
      } else {
        toast({
          title: 'Connection Failed',
          description: `Could not reach ${ipAddress}. Check the IP and network connection.`,
          variant: 'destructive',
        });
      }
      setIsPinging(false);
    }, 1500);
  };
  
  const handleWhitelist = () => {
    toast({
        title: 'Firewall Rule Added',
        description: `This application has been whitelisted in Windows Firewall.`,
    })
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Connection Tester</CardTitle>
          <CardDescription>
            Manually test the connection to another player on your LAN.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ip-input">Player's LAN IP Address</Label>
            <div className="flex gap-2">
              <Input
                id="ip-input"
                placeholder="e.g., 192.168.1.101"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                disabled={isPinging}
              />
              <Button onClick={handlePing} disabled={isPinging}>
                <Wifi className="mr-2 h-4 w-4" />
                Ping
              </Button>
            </div>
          </div>
          {isPinging && (
            <div className="space-y-2 rounded-lg border p-4">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          )}
          {pingResult && (
            <div className="rounded-lg border p-4 space-y-2 animate-in fade-in-50">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><Activity className="h-4 w-4"/>Latency</span>
                    <span className="font-medium">{pingResult.latency} ms</span>
                </div>
                <Separator />
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><Network className="h-4 w-4"/>Packet Loss</span>
                    <span className="font-medium">{pingResult.packetLoss} %</span>
                </div>
                 <Separator />
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><Activity className="h-4 w-4"/>Jitter</span>
                    <span className="font-medium">{pingResult.jitter} ms</span>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>LAN Peers</CardTitle>
                <CardDescription>Players discovered on your network.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {mockPlayers.map(player => (
                        <li key={player.ip} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">{player.name}</p>
                                    <p className="text-xs text-muted-foreground">{player.ip}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-green-400">
                                <CircleDot className="h-4 w-4" />
                                <span>{player.status}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Firewall & Ports</CardTitle>
                <CardDescription>Check for common connection blockers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                    <p className="flex items-center gap-2 text-muted-foreground"><ShieldCheck className="h-4 w-4" />Goldberg Port (UDP)</p>
                    <span className="font-medium flex items-center gap-2 text-green-400"><Check className="h-4 w-4" />Open</span>
                </div>
                 <div className="flex items-center justify-between text-sm">
                    <p className="flex items-center gap-2 text-muted-foreground"><ShieldOff className="h-4 w-4" />Windows Firewall</p>
                    <span className="font-medium flex items-center gap-2 text-red-400"><Check className="h-4 w-4" />Blocking</span>
                </div>
                <Button variant="outline" className="w-full" onClick={handleWhitelist}>
                    Add Firewall Exception
                    <ChevronRight className="h-4 w-4 ml-2"/>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
