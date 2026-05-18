'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DataTable from '@/components/DataTable';
import ActionButtons from '@/components/ActionButtons';

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
}

export default function ListarClientes() {
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch('/api/clientes?action=list');
      const data = await response.json();
      setClientes(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Erro ao carregar clientes');
      setClientes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cliente: Cliente) => {
    router.push(`/cadastro-cliente?id=${cliente.id}`);
  };

  const handleDelete = async (cliente: Cliente) => {
    if (confirm(`Deseja deletar o cliente ${cliente.nome}?`)) {
      try {
        const response = await fetch(`/api/clientes?id=${cliente.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Cliente deletado com sucesso!');
          fetchClientes();
        } else {
          toast.error('Erro ao deletar cliente');
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
    { key: 'email' as const, label: 'Email' },
    { key: 'telefone' as const, label: 'Telefone' },
    { key: 'cidade' as const, label: 'Cidade' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-primary">Clientes</h1>

      <ActionButtons
        createLink="/cadastro-cliente"
        createLabel="Novo Cliente"
        listLink="/listar-clientes"
        listLabel="Atualizar"
      />

      <DataTable
        columns={columns}
        data={clientes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKeys={['nome', 'email', 'telefone']}
      />
    </div>
  );
}
