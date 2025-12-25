'use client';

import { Gamepad2 } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center gap-3 border-b px-6 py-4">
      <Gamepad2 className="h-7 w-7 text-primary" />
      <h1 className="font-headline text-2xl font-bold tracking-tighter">
        LAN Party Starter
      </h1>
    </header>
  );
}
