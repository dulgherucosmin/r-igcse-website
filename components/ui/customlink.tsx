import { ReactNode } from "react";

function CustomLink ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-foreground underline decoration-primary decoration-1.5 underline-offset-4 hover:text-primary"
    >
      {children}
    </a>
  );
}

export { CustomLink }