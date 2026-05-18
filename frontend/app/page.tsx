'use client';

import Link from 'next/link';
import { Users, Package, Truck, ShoppingCart, Plus } from 'lucide-react';

export default function Home() {
  const quickActions = [
    {
      icon: Users,
      title: 'Clientes',
      description: 'Gerenciar clientes',
      links: [
        { label: 'Cadastrar', href: '/cadastro-cliente' },
        { label: 'Listar', href: '/listar-clientes' },
      ],
    },
    {
      icon: Truck,
      title: 'Fornecedores',
      description: 'Gerenciar fornecedores',
      links: [
        { label: 'Cadastrar', href: '/cadastro-fornecedor' },
        { label: 'Listar', href: '/listar-fornecedores' },
      ],
    },
    {
      icon: Package,
      title: 'Produtos',
      description: 'Gerenciar produtos',
      links: [
        { label: 'Cadastrar', href: '/cadastro-produto' },
        { label: 'Listar', href: '/listar-produtos' },
      ],
    },
    {
      icon: ShoppingCart,
      title: 'Vendas',
      description: 'Gerenciar vendas',
      links: [
        { label: 'Cadastrar', href: '/cadastro-venda' },
        { label: 'Listar', href: '/listar-vendas' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-light">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 px-4 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">Bem-vindo ao Raffi Estoque</h1>
        <p className="text-lg opacity-90">Sistema de Gerenciamento de Estoque</p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-secondary text-white p-3 rounded-lg">
                  <Icon size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">{action.title}</h2>
                  <p className="text-gray-600">{action.description}</p>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                {action.links.map((link, linkIdx) => (
                  <Link
                    key={linkIdx}
                    href={link.href}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition"
                  >
                    <Plus size={18} />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-4xl font-bold text-secondary mb-2">100+</div>
          <p className="text-gray-600">Clientes Cadastrados</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-4xl font-bold text-secondary mb-2">500+</div>
          <p className="text-gray-600">Produtos em Estoque</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-4xl font-bold text-secondary mb-2">50+</div>
          <p className="text-gray-600">Fornecedores</p>
        </div>
      </div>
    </div>
  );
}
