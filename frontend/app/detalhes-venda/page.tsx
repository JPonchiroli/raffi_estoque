'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ItemVenda {
  id: string;
  produto: { nome: string };
  quantidade: number;
  preco: number;
}

interface VendaDetalhes {
  id: string;
  cliente: { nome: string; email: string; telefone: string };
  dataVenda: string;
  valorTotal: number;
  itens: ItemVenda[];
}

export default function DetalhesVenda() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const codVenda = searchParams.get('codVenda');

  const [venda, setVenda] = useState<VendaDetalhes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (codVenda) {
      fetchVenda();
    }
  }, [codVenda]);

  const fetchVenda = async () => {
    try {
      const response = await fetch(
        `/api/vendas?id=${codVenda}&action=items`
      );
      const data = await response.json();
      setVenda(data);
    } catch (error) {
      toast.error('Erro ao carregar detalhes da venda');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  if (!venda) {
    return (
      <div className="text-center py-8">
        <p>Venda não encontrada</p>
        <Link href="/listar-vendas" className="text-blue-500 hover:text-blue-700">
          Voltar para vendas
        </Link>
      </div>
    );
  }

  const totalItems = venda.itens?.reduce((sum: number, item: ItemVenda) => sum + item.quantidade, 0) || 0;

  return (
    <div>
      <Link
        href="/listar-vendas"
        className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-6"
      >
        <ArrowLeft size={20} />
        Voltar para Vendas
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-primary">Detalhes da Venda #{venda.id}</h1>

      {/* Informações da Venda */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600">Data da Venda</p>
            <p className="text-lg font-semibold">
              {new Date(venda.dataVenda).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Cliente</p>
            <p className="text-lg font-semibold">{venda.cliente?.nome}</p>
            <p className="text-sm text-gray-600">{venda.cliente?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Telefone</p>
            <p className="text-lg font-semibold">{venda.cliente?.telefone}</p>
          </div>
        </div>
      </div>

      {/* Itens da Venda */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6 border-b bg-gray-100">
          <h2 className="text-xl font-bold text-primary">Itens da Venda</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Produto</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Quantidade</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Preço Unit.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {venda.itens && venda.itens.length > 0 ? (
                venda.itens.map((item: ItemVenda) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{item.produto?.nome}</td>
                    <td className="px-4 py-3 text-sm text-center">{item.quantidade}</td>
                    <td className="px-4 py-3 text-sm">R$ {item.preco.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm font-semibold">
                      R$ {(item.quantidade * item.preco).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                    Nenhum item encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumo */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600 mb-2">Total de Itens: <strong>{totalItems}</strong></p>
            <p className="text-2xl font-bold text-primary">
              Total: R$ {venda.valorTotal.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => router.push('/listar-vendas')}
            className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
