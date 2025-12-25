'use client';

import { Gamepad2, Globe } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type HeaderProps = {
    onLanguageChange: (lang: 'en' | 'zh') => void;
}

export function Header({ onLanguageChange }: HeaderProps) {
  const { t } = useI18n();

  return (
    <header className="flex items-center gap-3 border-b px-6 py-4">
      <Gamepad2 className="h-7 w-7 text-primary" />
      <h1 className="font-headline text-2xl font-bold tracking-tighter">
        {t('header.title')}
      </h1>
      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">{t('header.toggleLanguage')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onLanguageChange('en')}>English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onLanguageChange('zh')}>简体中文</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
