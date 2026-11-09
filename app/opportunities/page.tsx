import { HandHeartIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/opportunities");

export default function Opportunities() {
  return (
    <main className="grid min-h-[calc(100svh-var(--site-header-height))] page-container place-items-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HandHeartIcon />
          </EmptyMedia>
          <EmptyTitle>Opportunities are coming soon</EmptyTitle>
          <EmptyDescription>
            Want to help out in the meantime? Reach out to the team on our
            Discord server.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <a
            href="https://discord.gg/igcse"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants()}
          >
            Join the Discord
          </a>
        </EmptyContent>
      </Empty>
    </main>
  );
}
