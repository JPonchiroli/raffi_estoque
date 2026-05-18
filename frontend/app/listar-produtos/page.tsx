'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DataTable from '@/components/DataTable';
import ActionButtons from '@/components/ActionButtons';

interface Produto {
  id: string;
  nome: string;
  codigoBarras: string;
  valorVenda: number;
  quantidade: number;
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
      const response = await fetch('/api/produtos?action=list');
      const data = await response.json();
      setProdutos(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (produto: Produto) => {
    router.push(`/cadastro-produto?id=${produto.id}`);
  };

  const handleDelete = async (produto: Produto) => {
    if (confirm(`Deseja deletar o produto ${produto.nome}?`)) {
      try {
        const response = await fetch(`/api/produtos?id=${produto.id}`, {
          method: 'DELETE',
        });

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
    { key: 'nome' as const, label: 'Nome' },
    { key: 'codigoBarras' as const, label: 'Código de Barras' },
    { 
      key: 'valorVenda' as const, 
      label: 'Preço',
      render: (value: number) => `R$ ${value.toFixed(2)}`
    },
    { key: 'quantidade' as const, label: 'Estoque' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-primary">Produtos</h1>

      <ActionButtons
        createLink="/cadastro-produto"
        createLabel="Novo Produto"
        listLink="/listar-produtos"
        listLabel="Atualizar"
      />

      <DataTable
        columns={columns}
        data={produtos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKeys={['nome', 'codigoBarras']}
      />
    </div>
  );
}
