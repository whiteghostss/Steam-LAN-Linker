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

export function Disclaimer() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" size="sm" className="gap-2 text-muted-foreground">
          <TriangleAlert className="h-4 w-4" />
          Legal Disclaimer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Legal & Compliance Notice</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-4 mt-4 text-left">
              <p>
                This tool is intended solely for educational and research purposes within a private, household setting.
              </p>
              <p>
                It does not provide, facilitate the download of, or distribute any copyrighted game files. The purpose is to explore network programming and interoperability with the Steam API for legally owned games.
              </p>
              <p>
                This tool does not circumvent or crack any third-party Digital Rights Management (DRM) encryption.
              </p>
              <p>
                By using this tool, you acknowledge that you are using it with games you have legally purchased and are responsible for complying with all relevant EULAs and terms of service. The developers of this tool are not responsible for any misuse or any consequences thereof.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>I Understand</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
