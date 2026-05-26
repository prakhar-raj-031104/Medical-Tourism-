import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/layout/ChatWidget";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "OneEarthMed Alliance — World-Class Healthcare, Wherever You Are",
    template: "%s | OneEarthMed Alliance",
  },
  description:
    "Connect with 200+ JCI-accredited hospitals across 45 countries. Expert medical tourism services — free consultation, treatment planning, and full patient support.",
  keywords: [
    "medical tourism", "healthcare abroad", "international hospitals", "medical travel",
    "health tourism", "affordable surgery", "JCI accredited hospitals",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
