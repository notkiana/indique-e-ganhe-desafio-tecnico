import "./globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const MedicalBackground = dynamic(
  () => import("@/app/components/backgroung/MedicalBackground").then(m => m.MedicalBackground),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Indique e Ganhe - Desafio Técnico",
  description: "Página de Indicação de Amigos com Next.js + Tailwind + JSON storage",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <MedicalBackground />

        <div className="container py-10 relative z-10">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Programa Indique e Ganhe</h1>
            <p className="text-slate-300 mt-2">Clínica da Cidade • Desafio Técnico</p>
          </header>

          {children}

          <footer className="mt-12 text-center text-sm text-slate-400">
            Feito com Next.js + Tailwind • Armazenamento em arquivo JSON local
          </footer>
        </div>
      </body>
    </html>
  );
}
