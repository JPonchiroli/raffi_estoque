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

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/get-all-produtos`
      );

      const data = await response.json();

      setProdutos(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      toast.error('Erro ao carregar produtos');

      setProdutos([]);

    } finally {

      setLoading(false);
    }
  };

  const handleEdit = (produto: Produto) => {

    router.push(
      `/cadastro-produto?id=${produto.codProduto}`
    );
  };

  const handleDelete = async (
    produto: Produto
  ) => {

    if (
      confirm(
        `Deseja deletar o produto ${produto.nomeProduto}?`
      )
    ) {

      try {

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/deletar-produto/${produto.codProduto}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {

          toast.success(
            'Produto deletado com sucesso!'
          );

          fetchProdutos();

        } else {

          toast.error(
            'Erro ao deletar produto'
          );
        }

      } catch (error) {

        toast.error('Erro na conexão');
      }
    }
  };

  if (loading) {

    return (
      <div className="text-center py-8">
        Carregando...
      </div>
    );
  }

  const columns = [

    {
      key: 'nomeProduto' as const,
      label: 'Nome',
    },

    {
      key: 'codigoBarras' as const,
      label: 'Código de Barras',
    },

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
    },

    {
      key: 'unidadeMedida' as const,
      label: 'Unidade',
    },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6 text-primary">
        Produtos
      </h1>

      <ActionButtons
        createLink="/cadastro-produto"
        createLabel="Novo Produto"
      />

      <DataTable
        columns={columns}
        data={produtos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKeys={[
          'nomeProduto',
          'codigoBarras',
        ]}
      />

    </div>
  );
}