import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ItineraryProvider } from "@/components/ItineraryContext";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tourist's Hub — Zambia, without the surprises",
  description:
    "An interactive, data-driven guide to Zambia: Victoria Falls water-level predictor, the Bush Reality Scale, smart packing grids, bus-culture buffers, local languages and maps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ItineraryProvider>
          <SiteHeader />
          <main className="flex-1 w-full">{children}</main>
          <SiteFooter />
        </ItineraryProvider>
      </body>
    </html>
  );
}
