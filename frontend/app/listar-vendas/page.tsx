'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import ActionButtons from '@/components/ActionButtons';

interface ItemVenda {
  codProduto: number;
  nomeProduto: string;
  valorUnitario: number;
  quantidade: number;
  subTotal: number;
}

interface Venda {
  codVenda: number;
  codCliente: number;
  nomeCliente?: string;
  valorTotal: number;
  dataVenda: string;
  itens: ItemVenda[];
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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vendas/get-all-vendas`
      );

      const data = await response.json();

      if (!Array.isArray(data)) {
        setVendas([]);
        return;
      }

      const vendasComCliente = await Promise.all(

        data.map(async (venda: Venda) => {

          let nomeCliente = '-';

          try {

            if (venda.codCliente) {

              const clienteResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/clientes/get-cliente/${venda.codCliente}`
              );

              if (clienteResponse.ok) {

                const clienteData = await clienteResponse.json();

                nomeCliente =
                  clienteData.nomeCliente || '-';
              }
            }

          } catch (error) {
            console.error(error);
          }

          return {
            ...venda,
            nomeCliente,
          };
        })
      );

      setVendas(vendasComCliente);

    } catch (error) {

      toast.error('Erro ao carregar vendas');

      setVendas([]);

    } finally {

      setLoading(false);
    }
  };

  const handleDetails = (venda: Venda) => {

    router.push(
      `/detalhes-venda?codVenda=${venda.codVenda}`
    );
  };

  const handleDelete = async (venda: Venda) => {

    if (
      confirm(
        `Deseja deletar a venda #${venda.codVenda}?`
      )
    ) {

      try {

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/vendas/delete-venda/${venda.codVenda}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {

          toast.success(
            'Venda deletada com sucesso!'
          );

          fetchVendas();

        } else {

          toast.error(
            'Erro ao deletar venda'
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

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6 text-primary">
        Vendas
      </h1>

      <ActionButtons
        createLink="/cadastro-venda"
        createLabel="Nova Venda"
        listLink="/listar-vendas"
        listLabel="Atualizar"
      />

      <div className="bg-white rounded-lg shadow">

        {
          vendas.length > 0
            ? (
              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead className="bg-gray-100 border-b">

                    <tr>

                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        ID
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Cliente
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Data
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Total
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Quantidade de Itens
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Ações
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      vendas.map((venda) => (

                        <tr
                          key={venda.codVenda}
                          className="border-b hover:bg-gray-50 transition"
                        >

                          <td className="px-4 py-3 text-sm text-gray-900">
                            {venda.codVenda}
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-900">
                            {
                              venda.nomeCliente?.trim()
                                ? venda.nomeCliente
                                : '-'
                            }
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-900">
                            {
                              venda.dataVenda?.trim()
                                ? venda.dataVenda
                                : '-'
                            }
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-900">
                            R$ {
                              Number(
                                venda.valorTotal || 0
                              ).toFixed(2)
                            }
                          </td>

                          <td className="px-4 py-3 text-sm text-gray-900">
                            {
                              venda.itens?.length || 0
                            }
                          </td>

                          <td className="px-4 py-3 text-sm space-x-2 flex">

                            <button
                              onClick={() =>
                                handleDetails(venda)
                              }
                              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                              Detalhes
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(venda)
                              }
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                              Deletar
                            </button>

                          </td>

                        </tr>
                      ))
                    }

                  </tbody>

                </table>

              </div>
            )
            : (
              <div className="p-6 text-center text-gray-500">
                Nenhuma venda encontrada
              </div>
            )
        }

      </div>

    </div>
  );
}