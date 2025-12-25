'use client';

import { TriangleAlert } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/hooks/useI18n';

export function Disclaimer() {
  const { t } = useI18n();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" size="sm" className="gap-2 text-muted-foreground">
          <TriangleAlert className="h-4 w-4" />
          {t('disclaimer.trigger')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('disclaimer.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-4 mt-4 text-left">
              <p>{t('disclaimer.p1')}</p>
              <p>{t('disclaimer.p2')}</p>
              <p>{t('disclaimer.p3')}</p>
              <p>{t('disclaimer.p4')}</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>{t('disclaimer.agree')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
