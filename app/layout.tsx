import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { SITE_URL } from "@/lib/config";
import { cn } from "@/lib/utils";
import "./globals.css";

const dmSans = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  variable: "--font-dm-sans",
  weight: "400 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "r/IGCSE Resource Repository",
    template: "%s | r/IGCSE",
  },
  description:
    "Free, student-made IGCSE, O Level and AS/A Level study resources from the r/IGCSE community.",
  openGraph: {
    type: "website",
    siteName: "r/IGCSE",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#e62317",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark h-full font-sans antialiased", dmSans.variable)}
    >
      <body className="flex min-h-full flex-col">
        <NuqsAdapter>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  );
}
