'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ResumoDto {
  totalClientes: number;
  totalFornecedores: number;
  totalProdutos: number;
  totalVendasMesAtual: number;
  faturamentoMesAtual: number;
  faturamentoMesAnterior: number;
  produtosEstoqueBaixo: number;
}

interface ProdutoMaisVendidoDto {
  codProduto: number;
  nomeProduto: string;
  totalVendido: number;
  valorTotalGerado: number;
}

interface FaturamentoPeriodoDto {
  totalFaturado: number;
  quantidadeVendas: number;
  ticketMedio: number;
}

interface FaturamentoMensalDto {
  ano: number;
  mes: number;
  mesAno: string;
  valorTotal: number;
}

interface ProdutoEstoqueBaixoDto {
  codProduto: number;
  nomeProduto: string;
  estoqueAtual: number;
  estoqueMinimo: number;
}

const fmt = (value: number) =>
  `R$ ${Number(value || 0).toFixed(2)}`;

export default function Relatorios() {

  const [resumo, setResumo] = useState<ResumoDto | null>(null);
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState<ProdutoMaisVendidoDto[]>([]);
  const [faturamentoMensal, setFaturamentoMensal] = useState<FaturamentoMensalDto[]>([]);
  const [estoqueBaixo, setEstoqueBaixo] = useState<ProdutoEstoqueBaixoDto[]>([]);

  const [loadingResumo, setLoadingResumo] = useState(true);
  const [loadingProdutos, setLoadingProdutos] = useState(true);
  const [loadingMensal, setLoadingMensal] = useState(true);
  const [loadingEstoque, setLoadingEstoque] = useState(true);

  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [faturamentoPeriodo, setFaturamentoPeriodo] = useState<FaturamentoPeriodoDto | null>(null);
  const [loadingPeriodo, setLoadingPeriodo] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchResumo();
    fetchProdutosMaisVendidos();
    fetchFaturamentoMensal();
    fetchEstoqueBaixo();
  }, []);

  const fetchResumo = async () => {
    try {
      const res = await fetch(`${API}/api/relatorios/resumo`);
      setResumo(await res.json());
    } catch {
      toast.error('Erro ao carregar resumo');
    } finally {
      setLoadingResumo(false);
    }
  };

  const fetchProdutosMaisVendidos = async () => {
    try {
      const res = await fetch(`${API}/api/relatorios/produtos-mais-vendidos`);
      const data = await res.json();
      setProdutosMaisVendidos(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Erro ao carregar produtos mais vendidos');
    } finally {
      setLoadingProdutos(false);
    }
  };

  const fetchFaturamentoMensal = async () => {
    try {
      const res = await fetch(`${API}/api/relatorios/faturamento-mensal`);
      const data = await res.json();
      setFaturamentoMensal(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Erro ao carregar faturamento mensal');
    } finally {
      setLoadingMensal(false);
    }
  };

  const fetchEstoqueBaixo = async () => {
    try {
      const res = await fetch(`${API}/api/relatorios/estoque-baixo`);
      const data = await res.json();
      setEstoqueBaixo(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Erro ao carregar estoque baixo');
    } finally {
      setLoadingEstoque(false);
    }
  };

  const fetchFaturamentoPeriodo = async () => {
    if (!dataInicio || !dataFim) {
      toast.error('Informe as datas de início e fim');
      return;
    }
    setLoadingPeriodo(true);
    try {
      const res = await fetch(
        `${API}/api/relatorios/faturamento?dataInicio=${dataInicio}&dataFim=${dataFim}`
      );
      setFaturamentoPeriodo(await res.json());
    } catch {
      toast.error('Erro ao buscar faturamento por período');
    } finally {
      setLoadingPeriodo(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      <h1 className="text-3xl font-bold mb-8 text-primary">
        Relatórios
      </h1>

      {/* Resumo Geral */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-primary mb-4">Resumo Geral</h2>
        {loadingResumo ? (
          <div className="text-center py-4 text-gray-500">Carregando...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

            <div className="bg-white rounded-2xl shadow p-4 border border-slate-200">
              <p className="text-sm text-gray-500">Total de Clientes</p>
              <p className="text-2xl font-bold text-primary mt-1">
                {resumo?.totalClientes ?? '-'}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 border border-slate-200">
              <p className="text-sm text-gray-500">Total de Produtos</p>
              <p className="text-2xl font-bold text-primary mt-1">
                {resumo?.totalProdutos ?? '-'}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 border border-slate-200">
              <p className="text-sm text-gray-500">Faturamento Mês Atual</p>
              <p className="text-2xl font-bold text-primary mt-1">
                {fmt(resumo?.faturamentoMesAtual ?? 0)}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 border border-slate-200">
              <p className="text-sm text-gray-500">Faturamento Mês Anterior</p>
              <p className="text-2xl font-bold text-primary mt-1">
                {fmt(resumo?.faturamentoMesAnterior ?? 0)}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-4 border border-slate-200">
              <p className="text-sm text-gray-500">Estoque Baixo</p>
              <p className={`text-2xl font-bold mt-1 ${(resumo?.produtosEstoqueBaixo ?? 0) > 0 ? 'text-red-600' : 'text-primary'}`}>
                {resumo?.produtosEstoqueBaixo ?? '-'}
                {(resumo?.produtosEstoqueBaixo ?? 0) > 0 && (
                  <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-normal align-middle">
                    Atenção
                  </span>
                )}
              </p>
            </div>

          </div>
        )}
      </section>

      {/* Produtos Mais Vendidos */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-primary mb-4">Produtos Mais Vendidos</h2>
        <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-x-auto">
          {loadingProdutos ? (
            <div className="text-center py-6 text-gray-500">Carregando...</div>
          ) : produtosMaisVendidos.length === 0 ? (
            <div className="text-center py-6 text-gray-500">Nenhuma venda registrada</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total Vendido (un.)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Valor Total Gerado</th>
                </tr>
              </thead>
              <tbody>
                {produtosMaisVendidos.map((p) => (
                  <tr key={p.codProduto} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm text-gray-900">{p.nomeProduto}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{p.totalVendido}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{fmt(p.valorTotalGerado)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Faturamento por Período */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-primary mb-4">Faturamento por Período</h2>
        <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">
          <div className="flex flex-wrap gap-4 items-end mb-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Data Início</label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Data Fim</label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={fetchFaturamentoPeriodo}
              disabled={loadingPeriodo}
              className="px-5 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:bg-primary transition disabled:opacity-60"
            >
              {loadingPeriodo ? 'Buscando...' : 'Filtrar'}
            </button>
          </div>

          {faturamentoPeriodo && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Total Faturado</p>
                <p className="text-xl font-bold text-primary">
                  {fmt(faturamentoPeriodo.totalFaturado)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Quantidade de Vendas</p>
                <p className="text-xl font-bold text-primary">
                  {faturamentoPeriodo.quantidadeVendas}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Ticket Médio</p>
                <p className="text-xl font-bold text-primary">
                  {fmt(faturamentoPeriodo.ticketMedio)}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Faturamento Mensal */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-primary mb-4">Faturamento Mensal (Últimos 12 Meses)</h2>
        <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-x-auto">
          {loadingMensal ? (
            <div className="text-center py-6 text-gray-500">Carregando...</div>
          ) : faturamentoMensal.length === 0 ? (
            <div className="text-center py-6 text-gray-500">Nenhum dado disponível</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mês/Ano</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Valor Faturado</th>
                </tr>
              </thead>
              <tbody>
                {faturamentoMensal.map((m) => (
                  <tr key={`${m.ano}-${m.mes}`} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm text-gray-900">{m.mesAno}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{fmt(m.valorTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Estoque Baixo */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-primary mb-4">Produtos com Estoque Baixo</h2>
        <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-x-auto">
          {loadingEstoque ? (
            <div className="text-center py-6 text-gray-500">Carregando...</div>
          ) : estoqueBaixo.length === 0 ? (
            <div className="text-center py-6 text-gray-500">Nenhum produto com estoque baixo</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estoque Atual</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estoque Mínimo</th>
                </tr>
              </thead>
              <tbody>
                {estoqueBaixo.map((p) => (
                  <tr key={p.codProduto} className="border-b bg-red-50 hover:bg-red-100 transition">
                    <td className="px-4 py-3 text-sm font-medium text-red-800">{p.nomeProduto}</td>
                    <td className="px-4 py-3 text-sm font-bold text-red-700">{p.estoqueAtual}</td>
                    <td className="px-4 py-3 text-sm text-red-700">{p.estoqueMinimo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

    </div>
  );
}
