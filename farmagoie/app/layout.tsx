import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FarmaGOIE — Inteligência Estratégica em Saúde Pública",
  description: "Plataforma de inteligência estratégica farmacêutica do Estado de Goiás",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
