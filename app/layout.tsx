import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vitrine Jovens Empreendedores Sicredi",
  description:
    "A vitrine dos jovens empreendedores da rede Sicredi. Conheça, inspire-se e conecte-se com quem está construindo o futuro da cooperativa.",
  openGraph: {
    title: "Vitrine Jovens Empreendedores Sicredi",
    description:
      "Conheça os jovens empreendedores da rede Sicredi. Filtre por categoria, estado e encontre quem pode ser seu próximo parceiro.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
