import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import Providers from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_URL } from "@/lib/config";
import { siteJsonLd } from "@/lib/structured-data";
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
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full font-sans antialiased motion-safe:scroll-smooth",
        dmSans.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={siteJsonLd()} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
