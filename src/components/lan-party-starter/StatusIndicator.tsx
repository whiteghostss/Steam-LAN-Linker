'use client';

import { cn } from '@/lib/utils';

type StatusIndicatorProps = {
  isReady: boolean;
};

export function StatusIndicator({ isReady }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn('h-3 w-3 rounded-full', isReady ? 'bg-green-500' : 'bg-red-500')}
        aria-hidden="true"
      />
      <span className="text-sm text-muted-foreground">
        {isReady ? 'LAN Mode Ready' : 'Steam Mode'}
      </span>
    </div>
  );
}
