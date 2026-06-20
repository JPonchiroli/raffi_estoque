'use client';

import { useEffect, useState } from 'react';

import {
  useRouter,
  useSearchParams,
} from 'next/navigation';

import toast from 'react-hot-toast';

import FormInput from '@/components/FormInput';
import AutocompleteInput from '@/components/AutocompleteInput';

import { useAuth } from '@/context/AuthContext';

interface ItemVenda {
  produto: {
    id?: string | number;
    label?: string;
  } | null;

  quantidade: string;

  preco: string;
}

export default function CadastroVenda() {

  const { user } = useAuth();

  const router = useRouter();

  const searchParams = useSearchParams();

  const vendaId = searchParams.get('id');

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<{
    cliente: {
      id?: string | number;
      label?: string;
    } | null;
    itens: ItemVenda[];
  }>({

    cliente: null,
    itens: [
      {
        produto: null,
        quantidade: '',
        preco: '',
      },
    ],
  });

  useEffect(() => {

    if (!vendaId) {
      return;
    }

    const fetchVenda = async () => {

      try {

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/vendas/get-venda/${vendaId}`
        );

        if (!response.ok) {

          toast.error(
            'Erro ao buscar venda'
          );

          return;
        }

        const data = await response.json();

        let cliente = null;

        if (data.codCliente) {

          const clienteResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/clientes/get-cliente/${data.codCliente}`
          );

          if (clienteResponse.ok) {

            const clienteData =
              await clienteResponse.json();

            cliente = {
              id: clienteData.codCliente,
              label:
                clienteData.nomeCliente,
            };
          }
        }

        const itens = await Promise.all(

          (data.itens || []).map(
            async (item: any) => {

              let produto = null;

              if (item.codProduto) {

                const produtoResponse =
                  await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/get-produto/${item.codProduto}`
                  );

                if (produtoResponse.ok) {

                  const produtoData =
                    await produtoResponse.json();

                  produto = {
                    id:
                      produtoData.codProduto,

                    label:
                      produtoData.nomeProduto,
                  };
                }
              }

              return {
                produto,
                quantidade: String(
                  item.quantidade || ''
                ),
                preco: String(
                  item.valorUnitario || ''
                ),
              };
            }
          )
        );

        setFormData({

          cliente,
          itens:
            itens.length > 0
              ? itens
              : [
                  {
                    produto: null,
                    quantidade: '',
                    preco: '',
                  },
                ],
        });

      } catch (error) {

        toast.error(
          'Erro ao carregar venda'
        );
      }
    };

    fetchVenda();

  }, [vendaId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: any
  ) => {

    setFormData((prev) => {

      const newItens = [...prev.itens];

      newItens[index] = {
        ...newItens[index],
        [field]: value,
      };

      return {
        ...prev,
        itens: newItens,
      };
    });
  };

  const addItem = () => {

    setFormData((prev) => ({
      ...prev,

      itens: [
        ...prev.itens,
        {
          produto: null,
          quantidade: '',
          preco: '',
        },
      ],
    }));
  };

  const removeItem = (index: number) => {

    setFormData((prev) => ({

      ...prev,

      itens: prev.itens.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const fetchClientes = async (
    query: string
  ) => {

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/clientes/get-cliente-nome/${query}`
      );

      const data = await response.json();

      return Array.isArray(data)

        ? data.map((c: any) => ({
            id: c.codCliente,
            label: c.nomeCliente,
            ...c,
          }))

        : [];

    } catch (error) {

      return [];
    }
  };

  const fetchProdutos = async (
    query: string
  ) => {

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/get-produto-nome/${query}`
      );

      const data = await response.json();

      return Array.isArray(data)

        ? data.map((p: any) => ({
            id: p.codProduto,
            label: p.nomeProduto,
            valorUnitario: p.valorVenda,
            ...p,
          }))

        : [];

    } catch (error) {

      return [];
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const isEdit = Boolean(vendaId);

      const payload = {

        codCliente:
          formData.cliente?.id,

        itens: formData.itens.map(
          (item) => ({

            codProduto:
              item.produto?.id,

            quantidade:
              item.quantidade
                ? parseInt(
                    item.quantidade
                  )
                : 0,

            valorUnitario:
              item.preco
                ? parseFloat(
                    item.preco
                  )
                : 0,
          })
        ),

        codUsuario:
          user?.usuarioId,
      };

      const response = await fetch(

        isEdit

          ? `${process.env.NEXT_PUBLIC_API_URL}/api/vendas/update-venda/${vendaId}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/vendas/create-venda`,

        {

          method:
            isEdit
              ? 'PUT'
              : 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(
            payload
          ),
        }
      );

      if (response.ok) {

        toast.success(

          isEdit
            ? 'Venda atualizada com sucesso!'
            : 'Venda cadastrada com sucesso!'
        );

        router.push(
          '/listar-vendas'
        );

      } else {

        toast.error(

          isEdit
            ? 'Erro ao atualizar venda'
            : 'Erro ao cadastrar venda'
        );
      }

    } catch (error) {

      toast.error(
        'Erro na conexão'
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-primary">

        {
          vendaId
            ? 'Editar Venda'
            : 'Cadastrar Venda'
        }

      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6"
      >

        <div className="mb-6 pb-6">

          <h2 className="text-xl font-bold mb-4 text-primary">
            Dados da Venda
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="md:col-span-2">

              <AutocompleteInput
                label="Cliente *"
                placeholder="Digite o nome do cliente"
                value={
                  formData.cliente?.label || ''
                }
                fetchOptions={fetchClientes}
                onSelect={(option) =>
                  setFormData((prev) => ({
                    ...prev,
                    cliente: option,
                  }))
                }
              />

            </div>

          </div>

        </div>

        <div className="mb-6">

          <h2 className="text-xl font-bold mb-4 text-primary">
            Itens da Venda
          </h2>

          <div className="space-y-4">

            {
              formData.itens.map(
                (item, index) => (

                  <div
                    key={index}
                    className="border rounded-lg p-4 bg-gray-50"
                  >

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

                      <div className="md:col-span-2">

                        <AutocompleteInput
                          label="Produto"
                          placeholder="Digite o nome do produto"
                          value={
                            item.produto?.label || ''
                          }
                          fetchOptions={fetchProdutos}
                          onSelect={(option) => {

                            handleItemChange(
                              index,
                              'produto',
                              option
                            );

                            handleItemChange(
                              index,
                              'preco',
                              String(option.valorUnitario || '')
                            );
                          }}
                        />

                      </div>

                      <FormInput
                        label="Quantidade"
                        type="number"
                        placeholder="0"
                        value={item.quantidade}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            'quantidade',
                            e.target.value
                          )
                        }
                      />

                      <FormInput
                        label="Preço Unitário (R$)"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={item.preco}
                        readOnly={true}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            'preco',
                            e.target.value
                          )
                        }
                      />

                    </div>

                    {
                      formData.itens.length > 1 && (

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(index)
                          }
                          className="mt-2 text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Remover Item
                        </button>
                      )
                    }

                  </div>
                )
              )
            }

          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            + Adicionar Item
          </button>

        </div>

        <div className="flex gap-3">

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-primary disabled:opacity-50 transition"
          >

            {
              loading
                ? 'Salvando...'
                : vendaId
                  ? 'Atualizar Venda'
                  : 'Salvar Venda'
            }

          </button>

          <button
            type="button"
            onClick={() =>
              router.push(
                '/listar-vendas'
              )
            }
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cancelar
          </button>

        </div>

      </form>

    </div>
  );
}