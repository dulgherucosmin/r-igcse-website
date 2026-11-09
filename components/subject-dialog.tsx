"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const contentClassName =
  "block h-[92svh] w-[min(96vw,1200px)] max-w-none overflow-y-auto p-6 sm:max-w-none md:p-10";

export function SubjectDialogShell({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <Dialog
      open
      onOpenChange={(next) => {
        if (!next) router.back();
      }}
    >
      <DialogContent className={contentClassName}>{children}</DialogContent>
    </Dialog>
  );
}

export function SubjectDialog({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const open = usePathname() === href;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && open) router.back();
      }}
    >
      <DialogContent className={contentClassName}>{children}</DialogContent>
    </Dialog>
  );
}
