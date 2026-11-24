import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/faq");

export default function FAQLayout({ children }: { children: ReactNode }) {
  return children;
}
