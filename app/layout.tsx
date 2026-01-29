import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/lib/convexClient";
import { AuthProvider } from "@/lib/auth-context";
import ScrollToTop from "@/components/scroll-to-top";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Voyage Collective by VTS | Premium Travel Experiences",
  description: "Discover the world with Voyage Collective by VTS. Premium travel experiences, curated destinations, and personalized journeys await.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ConvexClientProvider>
          <AuthProvider>{children}</AuthProvider>
          <ScrollToTop />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
