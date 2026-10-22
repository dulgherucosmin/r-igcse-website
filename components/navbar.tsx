"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/data/navdata";
import { navItems } from "@/data/navdata";

type NavbarProps = {
  selectedHref?: string;
  onNavigate?: () => void;
};

export default function Navbar({ selectedHref, onNavigate }: NavbarProps) {
  const pathname = usePathname();
  const resolvedSelectedHref = selectedHref ?? pathname;

  return (
    <ul className="absolute top-0 right-6 bottom-0 left-55 m-0 flex list-none items-center justify-start gap-6 p-0 max-[1250px]:static max-[1250px]:w-full max-[1250px]:flex-col max-[1250px]:items-stretch max-[1250px]:gap-0">
      {navItems.map((item: NavItem) => {
        const isActive = resolvedSelectedHref === item.href;

        return (
          <li className="min-w-0 max-[1250px]:static" key={item.id}>
            <Link
              href={item.href}
              className={`relative block whitespace-nowrap text-lg leading-6.5 font-normal text-inherit no-underline after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-[1.5px] after:scale-x-100 after:bg-primary-500 after:opacity-0 after:transition-opacity after:duration-150 hover:after:opacity-100 focus-visible:after:opacity-100 max-[1250px]:px-6 max-[1250px]:py-[11px] max-[1250px]:leading-6 max-[1250px]:after:top-[9px] max-[1250px]:after:right-auto max-[1250px]:after:bottom-[9px] max-[1250px]:after:left-[13px] max-[1250px]:after:h-auto max-[1250px]:after:w-0.5 max-[1250px]:after:scale-y-[0.65] max-[1250px]:hover:after:scale-y-100 max-[1250px]:focus-visible:after:scale-y-100 ${isActive ? "after:opacity-100 max-[1250px]:after:scale-y-100" : ""}`}
              onClick={onNavigate}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
