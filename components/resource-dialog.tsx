"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function ResourceDialogShell({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose?.();
      }}
    >
      <DialogContent className="flex h-[92svh] w-[min(96vw,1100px)] max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-none">
        {children}
      </DialogContent>
    </Dialog>
  );
}

export function ResourceDialog({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const open = pathname === href;

  return (
    <ResourceDialogShell
      open={open}
      onClose={() => {
        if (open) router.back();
      }}
    >
      {children}
    </ResourceDialogShell>
  );
}
