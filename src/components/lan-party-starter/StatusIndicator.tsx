'use client';

import { cn } from '@/lib/utils';
import { useI18n } from '@/hooks/useI18n';

type StatusIndicatorProps = {
  isReady: boolean;
};

export function StatusIndicator({ isReady }: StatusIndicatorProps) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn('h-3 w-3 rounded-full', isReady ? 'bg-green-500' : 'bg-red-500')}
        aria-hidden="true"
      />
      <span className="text-sm text-muted-foreground">
        {isReady ? t('status.lanMode') : t('status.steamMode')}
      </span>
    </div>
  );
}
