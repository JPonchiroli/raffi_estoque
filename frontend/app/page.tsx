'use client';

import Link from 'next/link';
import { Users, Package, Truck, ShoppingCart, Plus } from 'lucide-react';

const quickActions = [
  {
    icon: Users,
    title: 'Clientes',
    description: 'Gerenciar clientes e contatos cadastrados.',
    links: [
      { label: 'Cadastrar', href: '/cadastro-cliente' },
      { label: 'Listar', href: '/listar-clientes' },
    ],
  },
  {
    icon: Truck,
    title: 'Fornecedores',
    description: 'Controlar fornecedores e entregas.',
    links: [
      { label: 'Cadastrar', href: '/cadastro-fornecedor' },
      { label: 'Listar', href: '/listar-fornecedores' },
    ],
  },
  {
    icon: Package,
    title: 'Produtos',
    description: 'Gerenciar produtos, estoque e valores.',
    links: [
      { label: 'Cadastrar', href: '/cadastro-produto' },
      { label: 'Listar', href: '/listar-produtos' },
    ],
  },
  {
    icon: ShoppingCart,
    title: 'Vendas',
    description: 'Registrar vendas e acompanhar resultados.',
    links: [
      { label: 'Cadastrar', href: '/cadastro-venda' },
      { label: 'Listar', href: '/listar-vendas' },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-light px-4 py-8 md:px-8">
      <section className="max-w-6xl mx-auto">
        <div className="bg-primary rounded-3xl text-white px-8 py-12 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Bem-vindo ao Raffi Estoque</h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl">
            Dashboards, cadastros e relatórios prontos para gerenciar clientes, fornecedores, produtos e vendas com rapidez.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div key={action.title} className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-white shadow-sm">
                    <Icon size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-primary">{action.title}</h2>
                    <p className="text-sm text-slate-600 mt-1">{action.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {action.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="inline-flex items-center gap-2 rounded-[8px] bg-secondary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary"
                    >
                      <Plus size={16} />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
