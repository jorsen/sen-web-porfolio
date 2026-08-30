import type { Metadata } from "next";
import "./globals.css";
import GlobalEffects from "@/components/GlobalEffects";

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23050816'/%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2300d4ff'/%3E%3Cstop offset='100%25' stop-color='%237928ca'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial Black,sans-serif' font-weight='900' font-size='28' fill='url(%23g)'%3EJM%3C/text%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: "Jorsen Mejia — Website Developer",
  icons: { icon: FAVICON },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="pt" />
        <div className="grid-bg" />
        <div className="cur" id="cur" />
        <div className="cur-f" id="curf" />
        {children}
        <GlobalEffects />
      </body>
    </html>
  );
}
