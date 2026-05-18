import type { Metadata } from 'next';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'Raffi Estoque',
  description: 'Sistema de Gerenciamento de Estoque',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cal+Sans&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-light font-sans text-gray-900">
        <header className="bg-primary text-white">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-5">
            <Link href="/" className="text-2xl font-semibold tracking-tight">
              Raffi Estoque
            </Link>
            <nav className="flex flex-wrap items-center gap-4 text-sm md:text-base">
              <Link href="/" className="hover:text-gray-200 transition">Dashboard</Link>
              <Link href="/listar-clientes" className="hover:text-gray-200 transition">Clientes</Link>
              <Link href="/listar-fornecedores" className="hover:text-gray-200 transition">Fornecedores</Link>
              <Link href="/listar-produtos" className="hover:text-gray-200 transition">Produtos</Link>
              <Link href="/listar-vendas" className="hover:text-gray-200 transition">Vendas</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 w-full">
          {children}
        </main>

        <footer className="bg-[#ecf0f1] text-center text-sm text-gray-700 py-5 mt-auto">
          <div className="max-w-6xl mx-auto px-6">
            &copy; {new Date().getFullYear()} Raffi Estoque. Todos os direitos reservados.
          </div>
        </footer>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
