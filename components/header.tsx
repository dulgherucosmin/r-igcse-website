"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./header.module.css";
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
        className={`${styles.header} ${isHomepage ? styles.homeHeader : ""}`}
      >
        <div className={styles.inner}>
          <Link className={styles.brand} href="/" aria-label="r/IGCSE home">
            <Image
              className={styles.logo}
              src="/logo.png"
              alt=""
              width={50}
              height={50}
            />
            <span>r/IGCSE</span>
          </Link>

          <nav className={styles.desktopNav} aria-label="Primary navigation">
            <Navbar />
          </nav>

          <button
            className={styles.menuButton}
            type="button"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </button>
        </div>
      </header>

      <button
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        type="button"
        aria-label="Close navigation"
        tabIndex={isOpen ? 0 : -1}
        onClick={() => setIsOpen(false)}
      />
      <nav
        id="mobile-navigation"
        className={`${styles.mobileNav} ${
          isHomepage ? styles.homeMobileNav : ""
        } ${isOpen ? styles.mobileNavOpen : ""}`}
        aria-label="Mobile navigation"
      >
        <Navbar onNavigate={() => setIsOpen(false)} />
      </nav>
    </>
  );
}
