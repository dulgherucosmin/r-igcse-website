import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Discord } from "@/components/ui/svgs/discord";
import { Reddit } from "@/components/ui/svgs/reddit";
import { footerColumns, socials } from "@/data/footer";
import { cn } from "@/lib/utils";

const socialLinks = [
  { name: "Discord", href: socials.discord, Logo: Discord },
  { name: "Reddit", href: socials.reddit, Logo: Reddit },
];

const footerLinkClass = cn(
  buttonVariants({ variant: "link" }),
  "h-auto justify-start p-0 text-sm font-normal text-muted-foreground hover:text-foreground",
);

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default function Footer() {
  return (
    <footer className="mt-16">
      <Separator />
      <div className="page-container grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex w-fit items-center gap-2 rounded-md text-xl font-black outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Image
              src="/logo.svg"
              alt=""
              width={187}
              height={197}
              className="h-8 w-auto"
            />
            r/IGCSE
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            The largest student-run community for IGCSE, O Level and AS/A Level
            students. Free resources, made by students, forever.
          </p>
          <div className="flex gap-2">
            {socialLinks.map(({ name, href, Logo }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`r/IGCSE on ${name}`}
                className={buttonVariants({
                  variant: "outline",
                  size: "icon-lg",
                })}
              >
                <Logo aria-hidden="true" className="size-5" />
              </a>
            ))}
          </div>
        </div>

        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="mb-3 text-sm font-semibold">{column.title}</h2>
            <ul className="flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href} className={footerLinkClass}>
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className={footerLinkClass}>
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <Separator />
      <div className="page-container py-6 text-sm text-muted-foreground">
        © <CopyrightYear /> r/IGCSE. Student-run and free, always.
      </div>
    </footer>
  );
}
