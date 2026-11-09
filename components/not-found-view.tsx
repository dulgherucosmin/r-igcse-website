import { ArrowLeftIcon, BooksIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

export default function NotFoundView({
  title,
  description,
  backHref = "/",
  backLabel = "Back to home",
}: {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <main className="page-container grid min-h-[calc(100svh-var(--site-header-height))] place-items-center py-16">
      <Empty className="max-w-xl gap-6">
        <EmptyHeader className="max-w-md gap-3">
          <EmptyMedia className="mb-2">
            <Image
              src="/logo.svg"
              alt=""
              width={187}
              height={197}
              className="h-20 w-auto -rotate-6"
            />
          </EmptyMedia>
          <p className="text-7xl font-black tracking-tight text-primary tabular-nums sm:text-8xl">
            404
          </p>
          <EmptyTitle className="text-2xl font-bold sm:text-3xl">
            {title}
          </EmptyTitle>
          <EmptyDescription className="text-base">
            {description}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row flex-wrap justify-center gap-3">
          <Link
            href={backHref}
            className={cn(buttonVariants({ size: "lg" }), "font-bold")}
          >
            <ArrowLeftIcon />
            {backLabel}
          </Link>
          {backHref !== "/resources" && (
            <Link
              href="/resources"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "font-bold",
              )}
            >
              <BooksIcon weight="fill" />
              Browse resources
            </Link>
          )}
        </EmptyContent>
      </Empty>
    </main>
  );
}
