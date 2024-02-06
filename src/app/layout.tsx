import "@/styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextUiProvider } from "@/providers/next-ui";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/header";
import favicon from "@/assets/favicon.png";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title:
    "Cadê o Jogo? - Descubra aqui onde assistir todos os jogos do Paulistão Sicredi 2024",
  description:
    "Descubra aqui onde assistir todos os jogos do Paulistão Sicredi 2024",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href={favicon.src} />
      </head>
      <body className={`${poppins.className} dark`}>
        <NextUiProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Analytics />
        </NextUiProvider>
      </body>
    </html>
  );
}
