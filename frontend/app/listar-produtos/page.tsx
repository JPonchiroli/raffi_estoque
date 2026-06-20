'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DataTable from '@/components/DataTable';
import ActionButtons from '@/components/ActionButtons';

interface Produto {
  codProduto: number;
  codigoBarras: string | null;
  nomeProduto: string;
  unidadeMedida: string | null;
  valorCusto: number | null;
  porcentagemLucro: number | null;
  valorVenda: number | null;
  estoqueAtual: number | null;
  estoqueMinimo: number | null;
  codFornecedor: number | null;
}

export default function ListarProdutos() {

  const router = useRouter();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [buscaCodigoBarras, setBuscaCodigoBarras] = useState('');

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/get-all-produtos`
      );
      const data = await response.json();
      setProdutos(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  };

  const buscarPorCodigoBarras = async () => {
    if (!buscaCodigoBarras.trim()) {
      fetchProdutos();
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/get-produto-cod-barras/${encodeURIComponent(buscaCodigoBarras)}`
      );
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const produtosCompletos = await Promise.all(
          data.map(async (p: { codProduto: number }) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/get-produto/${p.codProduto}`
            );
            return res.json();
          })
        );
        setProdutos(produtosCompletos);
      } else {
        setProdutos([]);
        toast.error('Nenhum produto encontrado');
      }
    } catch (error) {
      toast.error('Erro ao buscar produto');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (produto: Produto) => {
    router.push(`/cadastro-produto?id=${produto.codProduto}`);
  };

  const handleDelete = async (produto: Produto) => {
    if (confirm(`Deseja deletar o produto ${produto.nomeProduto}?`)) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/deletar-produto/${produto.codProduto}`,
          { method: 'DELETE' }
        );
        if (response.ok) {
          toast.success('Produto deletado com sucesso!');
          fetchProdutos();
        } else {
          toast.error('Erro ao deletar produto');
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
    { key: 'nomeProduto' as const, label: 'Nome' },
    { key: 'codigoBarras' as const, label: 'Código de Barras' },
    {
      key: 'valorVenda' as const,
      label: 'Preço',
      render: (value: number | null) =>

        value != null
          ? `R$ ${value.toFixed(2)}`
          : '-',
    },

    {
      key: 'estoqueAtual' as const,
      label: 'Estoque',
      render: (value: number | null, item: Produto) => {
        const baixo = value !== null && item.estoqueMinimo !== null && value <= item.estoqueMinimo;
        return (
          <span className={baixo ? 'text-red-600 font-bold' : ''}>
            {value ?? '-'}
            {baixo && (
              <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                ⚠️ Estoque baixo
              </span>
            )}
          </span>
        );
      },
    },

    {
      key: 'unidadeMedida' as const,
      label: 'Unidade',
    },
    { key: 'estoqueAtual' as const, label: 'Estoque' },
    { key: 'unidadeMedida' as const, label: 'Unidade' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-primary">Produtos</h1>

      <ActionButtons createLink="/cadastro-produto" createLabel="Novo Produto" />

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por código de barras..."
          value={buscaCodigoBarras}
          onChange={(e) => setBuscaCodigoBarras(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && buscarPorCodigoBarras()}
          className="border border-gray-300 rounded-md px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <button
          onClick={buscarPorCodigoBarras}
          className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary transition"
        >
          Buscar
        </button>
        <button
          onClick={() => { setBuscaCodigoBarras(''); fetchProdutos(); }}
          className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
        >
          Limpar
        </button>
      </div>

      <DataTable
        columns={columns}
        data={produtos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKeys={['nomeProduto', 'codigoBarras']}
      />
    </div>
  );
}