"use client";

import { BooksIcon, ListIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, Suspense, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { type NavItem, navItems } from "@/data/navdata";
import { trackPath } from "@/lib/landing";
import { cn } from "@/lib/utils";

function navLink(
  item: NavItem,
  props?: { className?: string; onClick?: () => void; "aria-current"?: "page" },
) {
  return item.external ? (
    <a href={item.href} target="_blank" rel="noreferrer" {...props}>
      {item.name}
    </a>
  ) : (
    <Link href={item.href} {...props}>
      {item.name}
    </Link>
  );
}

const isActive = (pathname: string | undefined, href: string) =>
  pathname === href || Boolean(pathname?.startsWith(`${href}/`));

function DesktopNavLinks({ pathname }: { pathname?: string }) {
  return (
    <NavigationMenuList className="gap-1">
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuLink
              active={active}
              className={cn("px-3 text-base", active && "text-brand")}
              render={navLink(item)}
            />
          </NavigationMenuItem>
        );
      })}
    </NavigationMenuList>
  );
}

function MobileNavLinks({
  pathname,
  onNavigate,
}: {
  pathname?: string;
  onNavigate: () => void;
}) {
  return navItems.map((item) => {
    const active = isActive(pathname, item.href);
    return (
      <Fragment key={item.id}>
        {navLink(item, {
          "aria-current": active ? "page" : undefined,
          onClick: onNavigate,
          className: cn(
            buttonVariants({
              variant: active ? "secondary" : "ghost",
              size: "lg",
            }),
            "justify-start text-base",
          ),
        })}
      </Fragment>
    );
  });
}

function CurrentDesktopNavLinks() {
  return <DesktopNavLinks pathname={usePathname()} />;
}

function CurrentMobileNavLinks({ onNavigate }: { onNavigate: () => void }) {
  return <MobileNavLinks pathname={usePathname()} onNavigate={onNavigate} />;
}

function PathTracker() {
  trackPath(usePathname());
  return null;
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-(--site-header-height) border-b border-border/60 bg-background/95 backdrop-blur">
      <Suspense fallback={null}>
        <PathTracker />
      </Suspense>
      <div className="page-container grid h-full grid-cols-[1fr_auto_1fr] items-center gap-6">
        <Link
          href="/"
          aria-label="r/IGCSE home"
          className="flex items-center gap-2 justify-self-start rounded-md text-xl font-black outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
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

        <NavigationMenu
          aria-label="Primary navigation"
          className="max-lg:hidden"
        >
          <Suspense fallback={<DesktopNavLinks />}>
            <CurrentDesktopNavLinks />
          </Suspense>
        </NavigationMenu>

        <div className="col-start-3 flex items-center gap-2 justify-self-end">
          <Link
            href="/resources"
            className={cn(buttonVariants(), "max-sm:hidden")}
          >
            <BooksIcon weight="fill" />
            Browse Resources
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation"
                />
              }
            >
              <ListIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(78vw,310px)]">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="grid gap-1 px-2">
                <Suspense
                  fallback={
                    <MobileNavLinks onNavigate={() => setOpen(false)} />
                  }
                >
                  <CurrentMobileNavLinks onNavigate={() => setOpen(false)} />
                </Suspense>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
