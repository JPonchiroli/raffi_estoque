'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DataTable from '@/components/DataTable';
import ActionButtons from '@/components/ActionButtons';

interface Fornecedor {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cnpj: string;
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
      const response = await fetch('/api/fornecedores?action=list');
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
    router.push(`/cadastro-fornecedor?id=${fornecedor.id}`);
  };

  const handleDelete = async (fornecedor: Fornecedor) => {
    if (confirm(`Deseja deletar o fornecedor ${fornecedor.nome}?`)) {
      try {
        const response = await fetch(`/api/fornecedores?id=${fornecedor.id}`, {
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
    { key: 'nome' as const, label: 'Razão Social' },
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
        listLink="/listar-fornecedores"
        listLabel="Atualizar"
      />

      <DataTable
        columns={columns}
        data={fornecedores}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKeys={['nome', 'email', 'cnpj']}
      />
    </div>
  );
}
