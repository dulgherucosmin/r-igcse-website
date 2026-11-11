"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function SubjectDialog({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DialogContent className="block h-[92svh] w-[min(96vw,1200px)] max-w-none overflow-y-auto p-6 sm:max-w-none md:p-10">
        {children}
      </DialogContent>
    </Dialog>
  );
}
