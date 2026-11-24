"use client";

import { ArrowsOutSimpleIcon } from "@phosphor-icons/react/ssr";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function SubjectDialog({ children }: { children: ReactNode }) {
  const router = useRouter();
  // While the modal is open the URL is already /resources/<subject>
  const pathname = usePathname();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DialogContent className="block h-[92svh] w-[min(96vw,1200px)] max-w-none overflow-y-auto p-6 sm:max-w-none md:p-10">
        {children}
        <a
          href={pathname}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "absolute top-2 right-11 text-muted-foreground",
          )}
        >
          <ArrowsOutSimpleIcon aria-hidden="true" />
          Open full page
        </a>
      </DialogContent>
    </Dialog>
  );
}