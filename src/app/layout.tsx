import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jari",
  description:
    "KAIST Unified Reservation Service (URS) with extra convenience features",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      {children}
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
