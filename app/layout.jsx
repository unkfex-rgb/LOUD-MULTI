import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "LOUD MULTI",
  description: "Multi Stream Hub da LOUD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
