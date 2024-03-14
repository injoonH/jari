import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/app/style/global.css";

export const metadata: Metadata = {
  title: "Jari",
  description:
    "KAIST Unified Reservation Service (URS) with extra convenience features",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <body>
      {children}
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
