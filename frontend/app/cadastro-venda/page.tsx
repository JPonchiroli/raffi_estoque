'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import FormInput from '@/components/FormInput';
import AutocompleteInput from '@/components/AutocompleteInput';

export default function CadastroVenda() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    cliente: { id?: string | number } | null;
    datavenda: string;
    itens: Array<{
      produto: { id?: string | number } | null;
      quantidade: string;
      preco: string;
    }>;
  }>({
    cliente: null,
    datavenda: new Date().toISOString().split('T')[0],
    itens: [{ produto: null, quantidade: '', preco: '' }],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      itens: [...prev.itens, { produto: {}, quantidade: '', preco: '' }],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      itens: prev.itens.filter((_, i) => i !== index),
    }));
  };

  const fetchClientes = async (query: string) => {
    try {
      const response = await fetch(`/api/clientes?nome=${query}`);
      const data = await response.json();
      return Array.isArray(data)
        ? data.map((c: any) => ({
            id: c.id,
            label: c.nome,
            ...c,
          }))
        : [];
    } catch (error) {
      return [];
    }
  };

  const fetchProdutos = async (query: string) => {
    try {
      const response = await fetch(`/api/produtos?nome=${query}`);
      const data = await response.json();
      return Array.isArray(data)
        ? data.map((p: any) => ({
            id: p.id,
            label: p.nome,
            ...p,
          }))
        : [];
    } catch (error) {
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        clienteId: formData.cliente?.id,
        dataVenda: formData.datavenda,
        itensVenda: formData.itens.map((item: any) => ({
          produtoId: item.produto?.id,
          quantidade: parseInt(item.quantidade),
          preco: parseFloat(item.preco),
        })),
      };

      const response = await fetch('/api/vendas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Venda cadastrada com sucesso!');
        router.push('/listar-vendas');
      } else {
        toast.error('Erro ao cadastrar venda');
      }
    } catch (error) {
      toast.error('Erro na conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Cadastrar Venda</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        {/* Seção de Cliente */}
        <div className="mb-6 pb-6 border-b">
          <h2 className="text-xl font-bold mb-4 text-primary">Dados da Venda</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <AutocompleteInput
                label="Cliente *"
                placeholder="Digite o nome do cliente"
                fetchOptions={fetchClientes}
                onSelect={(option) =>
                  setFormData((prev) => ({
                    ...prev,
                    cliente: option,
                  }))
                }
              />
            </div>
            <FormInput
              label="Data da Venda"
              name="datavenda"
              type="date"
              value={formData.datavenda}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Seção de Itens */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-primary">Itens da Venda</h2>
          <div className="space-y-4">
            {formData.itens.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="md:col-span-2">
                    <AutocompleteInput
                      label="Produto"
                      placeholder="Digite o nome do produto"
                      fetchOptions={fetchProdutos}
                      onSelect={(option) =>
                        handleItemChange(index, 'produto', option)
                      }
                    />
                  </div>
                  <FormInput
                    label="Quantidade"
                    type="number"
                    placeholder="0"
                    value={item.quantidade}
                    onChange={(e) =>
                      handleItemChange(index, 'quantidade', e.target.value)
                    }
                  />
                  <FormInput
                    label="Preço Unitário (R$)"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={item.preco}
                    onChange={(e) =>
                      handleItemChange(index, 'preco', e.target.value)
                    }
                  />
                </div>
                {formData.itens.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="mt-2 text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remover Item
                  </button>
                )}
              </div>
            ))}
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
            {loading ? 'Salvando...' : 'Salvar Venda'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/listar-vendas')}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
