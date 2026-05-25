'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users, Package, Truck, ShoppingCart, Plus, BarChart2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface ResumoDto {
  totalClientes: number;
  totalProdutos: number;
  faturamentoMesAtual: number;
  produtosEstoqueBaixo: number;
}

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
  const router = useRouter();
  const { user } = useAuth();
  const [resumo, setResumo] = useState<ResumoDto | null>(null);

  useEffect(() => {
    if (user === null) {
      router.replace('/login');
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/relatorios/resumo`)
        .then((res) => res.json())
        .then((data) => setResumo(data))
        .catch(() => {});
    }
  }, [user]);

  if (user === undefined || user === null) {
    return null;
  }

  const fmt = (v: number) => `R$ ${Number(v || 0).toFixed(2)}`;

  return (
    <div className="min-h-screen bg-light px-4 py-8 md:px-8">
      <section className="max-w-6xl mx-auto">
        <div className="bg-primary rounded-3xl text-white px-8 py-12 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Bem-vindo ao Raffi Estoque</h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl">
            Dashboards, cadastros e relatórios prontos para gerenciar clientes, fornecedores, produtos e vendas com rapidez.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

          <div className="bg-white rounded-2xl shadow p-5 border border-slate-200">
            <p className="text-sm text-gray-500">Total de Clientes</p>
            <p className="text-3xl font-bold text-primary mt-1">
              {resumo ? resumo.totalClientes : '—'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 border border-slate-200">
            <p className="text-sm text-gray-500">Total de Produtos</p>
            <p className="text-3xl font-bold text-primary mt-1">
              {resumo ? resumo.totalProdutos : '—'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 border border-slate-200">
            <p className="text-sm text-gray-500">Faturamento do Mês</p>
            <p className="text-3xl font-bold text-primary mt-1">
              {resumo ? fmt(resumo.faturamentoMesAtual) : '—'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 border border-slate-200">
            <p className="text-sm text-gray-500">Estoque Baixo</p>
            <p className={`text-3xl font-bold mt-1 ${resumo && resumo.produtosEstoqueBaixo > 0 ? 'text-red-600' : 'text-primary'}`}>
              {resumo ? resumo.produtosEstoqueBaixo : '—'}
            </p>
            {resumo && resumo.produtosEstoqueBaixo > 0 && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                Atenção
              </span>
            )}
          </div>

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

          {/* Relatórios card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-4 mb-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-white shadow-sm">
                <BarChart2 size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-primary">Relatórios</h2>
                <p className="text-sm text-slate-600 mt-1">Análise de vendas, faturamento e estoque.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/relatorios"
                className="inline-flex items-center gap-2 rounded-[8px] bg-secondary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary"
              >
                <Plus size={16} />
                Ver Relatórios
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
