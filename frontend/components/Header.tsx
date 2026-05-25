'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Raffi Estoque
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="hover:text-gray-300 transition">
              Dashboard
            </Link>
            <Link href="/listar-clientes" className="hover:text-gray-300 transition">
              Clientes
            </Link>
            <Link href="/listar-fornecedores" className="hover:text-gray-300 transition">
              Fornecedores
            </Link>
            <Link href="/listar-produtos" className="hover:text-gray-300 transition">
              Produtos
            </Link>
            <Link href="/listar-vendas" className="hover:text-gray-300 transition">
              Vendas
            </Link>
            <Link href="/relatorios" className="hover:text-gray-300 transition">
              Relatórios
            </Link>
          </nav>

          <button
            className="md:hidden p-2 hover:bg-secondary rounded-md transition"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-2">
            <Link href="/" className="block px-4 py-2 hover:bg-secondary rounded-md transition">
              Dashboard
            </Link>
            <Link href="/listar-clientes" className="block px-4 py-2 hover:bg-secondary rounded-md transition">
              Clientes
            </Link>
            <Link href="/listar-fornecedores" className="block px-4 py-2 hover:bg-secondary rounded-md transition">
              Fornecedores
            </Link>
            <Link href="/listar-produtos" className="block px-4 py-2 hover:bg-secondary rounded-md transition">
              Produtos
            </Link>
            <Link href="/listar-vendas" className="block px-4 py-2 hover:bg-secondary rounded-md transition">
              Vendas
            </Link>
            <Link href="/relatorios" className="block px-4 py-2 hover:bg-secondary rounded-md transition">
              Relatórios
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
