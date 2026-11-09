import { WarningCircleIcon } from "@phosphor-icons/react/ssr";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export const pageClassName =
  "page-container relative isolate min-h-[calc(100svh-var(--site-header-height))] overflow-hidden py-8 sm:py-12 lg:py-16";

export function BackgroundArt() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-[min(75vh,760px)] bg-[url('/bg-vector.png')] bg-cover bg-bottom bg-no-repeat opacity-[0.12]"
    />
  );
}

export function StatusAlert({ children }: { children: string }) {
  return (
    <Alert variant="destructive">
      <WarningCircleIcon />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}

export function EmptyState({
  title,
  children,
}: {
  title: string;
  children?: string;
}) {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>
        {children && <EmptyDescription>{children}</EmptyDescription>}
      </EmptyHeader>
    </Empty>
  );
}
