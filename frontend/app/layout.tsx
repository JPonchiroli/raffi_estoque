import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
        <link href="https://fonts.googleapis.com/css2?family=Calligraffitti&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-light font-sans">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
