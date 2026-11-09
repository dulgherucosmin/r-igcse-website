import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TextLink({ className, ...props }: ComponentProps<"a">) {
  const external = props.href?.startsWith("http");

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
    />
  );
}
