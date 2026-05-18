'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DataTable from '@/components/DataTable';
import ActionButtons from '@/components/ActionButtons';
import Link from 'next/link';

interface Venda {
  id: string;
  cliente: { nome: string };
  dataVenda: string;
  valorTotal: number;
}

export default function ListarVendas() {
  const router = useRouter();
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendas();
  }, []);

  const fetchVendas = async () => {
    try {
      const response = await fetch('/api/vendas?action=list');
      const data = await response.json();
      setVendas(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Erro ao carregar vendas');
      setVendas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = (venda: Venda) => {
    router.push(`/detalhes-venda?codVenda=${venda.id}`);
  };

  const handleDelete = async (venda: Venda) => {
    if (confirm(`Deseja deletar a venda #${venda.id}?`)) {
      try {
        const response = await fetch(`/api/vendas?id=${venda.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Venda deletada com sucesso!');
          fetchVendas();
        } else {
          toast.error('Erro ao deletar venda');
        }
      } catch (error) {
        toast.error('Erro na conexão');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  const columns = [
    { key: 'id' as const, label: 'ID' },
    { 
      key: 'cliente' as const, 
      label: 'Cliente',
      render: (value: any) => value?.nome || 'N/A'
    },
    { 
      key: 'dataVenda' as const, 
      label: 'Data',
      render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
    },
    { 
      key: 'valorTotal' as const, 
      label: 'Total',
      render: (value: number) => `R$ ${value.toFixed(2)}`
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-primary">Vendas</h1>

      <ActionButtons
        createLink="/cadastro-venda"
        createLabel="Nova Venda"
        listLink="/listar-vendas"
        listLabel="Atualizar"
      />

      <div className="bg-white rounded-lg shadow">
        {vendas.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={String(col.key)}
                      className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {vendas.map((venda) => (
                  <tr key={venda.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm text-gray-900">{venda.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{venda.cliente?.nome}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {new Date(venda.dataVenda).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      R$ {venda.valorTotal.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm space-x-2 flex">
                      <button
                        onClick={() => handleDetails(venda)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        Detalhes
                      </button>
                      <button
                        onClick={() => handleDelete(venda)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">Nenhuma venda encontrada</div>
        )}
      </div>
    </div>
  );
}
