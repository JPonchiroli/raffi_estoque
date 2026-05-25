'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DataTable from '@/components/DataTable';
import ActionButtons from '@/components/ActionButtons';

interface Fornecedor {
  codFornecedor: number;
  nomeFornecedor: string;
  email: string | null;
  telefone: string | null;
  cnpj: string | null;
}

export default function ListarFornecedores() {
  const router = useRouter();
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const fetchFornecedores = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fornecedores/get-all-fornecedores`);
      const data = await response.json();
      setFornecedores(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Erro ao carregar fornecedores');
      setFornecedores([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (fornecedor: Fornecedor) => {
    router.push(`/cadastro-fornecedor?id=${fornecedor.codFornecedor}`);
  };

  const handleDelete = async (fornecedor: Fornecedor) => {
    if (confirm(`Deseja deletar o fornecedor ${fornecedor.nomeFornecedor}?`)) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fornecedores/deletar-fornecedor/${fornecedor.codFornecedor}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Fornecedor deletado com sucesso!');
          fetchFornecedores();
        } else {
          toast.error('Erro ao deletar fornecedor');
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
    { key: 'nomeFornecedor' as const, label: 'Razão Social' },
    { key: 'cnpj' as const, label: 'CNPJ' },
    { key: 'email' as const, label: 'Email' },
    { key: 'telefone' as const, label: 'Telefone' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-primary">Fornecedores</h1>

      <ActionButtons
        createLink="/cadastro-fornecedor"
        createLabel="Novo Fornecedor"
      />

      <DataTable
        columns={columns}
        data={fornecedores}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKeys={['nomeFornecedor', 'email', 'cnpj', 'telefone']}
      />
    </div>
  );
}
