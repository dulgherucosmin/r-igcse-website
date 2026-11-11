import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Discord } from "@/components/ui/svgs/discord";
import { Reddit } from "@/components/ui/svgs/reddit";
import { cn } from "@/lib/utils";

const BRAND_LOGOS = [
  { pattern: /(^|\.)(discord\.gg|discord\.com)$/, Logo: Discord },
  { pattern: /(^|\.)reddit\.com$/, Logo: Reddit },
];

function brandLogo(href?: string) {
  if (!href?.startsWith("http")) return null;
  const { hostname } = new URL(href);
  return BRAND_LOGOS.find(({ pattern }) => pattern.test(hostname))?.Logo;
}

export function TextLink({
  className,
  children,
  ...props
}: ComponentProps<"a">) {
  const external = props.href?.startsWith("http");
  const Logo = brandLogo(props.href);

  return (
    <a
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      {...props}
      className={cn(
        buttonVariants({ variant: "link" }),
        cn(
          "inline h-auto p-0 align-baseline text-[length:inherit] font-[inherit] whitespace-normal text-blue-300 underline underline-offset-4",
          className,
        ),
      )}
    >
      {Logo && (
        <Logo
          aria-hidden="true"
          className="mr-[0.3em] inline-block size-[1em] align-[-0.125em]"
        />
      )}
      {children}
    </a>
  );
}
