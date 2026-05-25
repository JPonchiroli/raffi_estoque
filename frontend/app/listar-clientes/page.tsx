'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DataTable from '@/components/DataTable';
import ActionButtons from '@/components/ActionButtons';

interface Cliente {
  codCliente: string;
  nomeCliente: string;
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clientes/get-all-clientes`);
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
    router.push(`/cadastro-cliente?id=${cliente.codCliente}`);
  };

  const handleDelete = async (cliente: Cliente) => {
    if (confirm(`Deseja deletar o cliente ${cliente.nomeCliente}?`)) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clientes/deletar-cliente/${cliente.codCliente}`, {
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

  const columns: { key: keyof Cliente; label: string }[] = [
    { key: 'nomeCliente', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'telefone', label: 'Telefone' },
    { key: 'cidade', label: 'Cidade' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-primary">Clientes</h1>

      <ActionButtons
        createLink="/cadastro-cliente"
        createLabel="Novo Cliente"
      />

      <DataTable
        columns={columns}
        data={clientes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKeys={['nomeCliente', 'email', 'telefone']}
      />
    </div>
  );
}
