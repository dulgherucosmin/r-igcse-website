"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./navbar";

export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`sticky top-0 right-0 left-0 z-50 h-[var(--site-header-height)] bg-background text-foreground ${isHomepage ? "bg-[#121010] text-white" : ""}`}
      >
        <div className="relative mx-auto h-full w-full max-w-[1920px] max-[700px]:w-[min(100%,393px)]">
          <Link
            className="absolute top-[min(0.260417vw,5px)] left-[min(1.510417vw,29px)] flex h-[min(2.604167vw,50px)] items-center gap-[min(0.625vw,12px)] whitespace-nowrap text-inherit no-underline [font-size:min(1.25vw,24px)] leading-none font-black max-[1250px]:top-[10px] max-[1250px]:left-[19px] max-[1250px]:h-[30px] max-[1250px]:gap-0 max-[1250px]:text-base max-[1250px]:opacity-90"
            href="/"
            aria-label="r/IGCSE home"
          >
            <Image
              className="size-[min(2.604167vw,50px)] object-contain max-[1250px]:size-[30px]"
              src="/logo.png"
              alt=""
              width={50}
              height={50}
            />
            <span>r/IGCSE</span>
          </Link>

          <nav
            className="absolute inset-0 max-[1250px]:hidden"
            aria-label="Primary navigation"
          >
            <Navbar />
          </nav>

          <button
            className="absolute top-[13px] right-[18px] hidden size-6 cursor-pointer flex-col items-center justify-center gap-1 border-0 bg-transparent p-0 text-inherit max-[1250px]:flex"
            type="button"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="block h-[1.5px] w-[16.5px] rounded-full bg-current" />
            <span className="block h-[1.5px] w-[16.5px] rounded-full bg-current" />
            <span className="block h-[1.5px] w-[16.5px] rounded-full bg-current" />
          </button>
        </div>
      </header>

      <button
        className={`fixed inset-0 z-[38] hidden h-full w-full border-0 bg-black/55 p-0 opacity-0 transition-opacity duration-200 max-[1250px]:block ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none"}`}
        type="button"
        aria-label="Close navigation"
        tabIndex={isOpen ? 0 : -1}
        onClick={() => setIsOpen(false)}
      />
      <nav
        id="mobile-navigation"
        className={`fixed top-[var(--site-header-height)] right-0 z-[45] hidden w-[min(78vw,310px)] rounded-bl-xl bg-background px-0 pt-2 pb-4 text-foreground opacity-0 shadow-[0_20px_50px_rgb(0_0_0/42%)] transition-[opacity,transform] duration-200 motion-reduce:transition-none max-[1250px]:block max-[1250px]:translate-x-[105%] ${isHomepage ? "bg-[#121010] text-white" : ""} ${isOpen ? "pointer-events-auto opacity-100 max-[1250px]:translate-x-0" : "pointer-events-none"}`}
        aria-label="Mobile navigation"
      >
        <Navbar onNavigate={() => setIsOpen(false)} />
      </nav>
    </>
  );
}
