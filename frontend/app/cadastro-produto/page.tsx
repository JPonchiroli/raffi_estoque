'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import FormInput from '@/components/FormInput';
import AutocompleteInput from '@/components/AutocompleteInput';

export default function CadastroProduto() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    nome: string;
    descricao: string;
    codigoBarras: string;
    valorCusto: string;
    porcentagemLucro: string;
    valorVenda: string;
    quantidade: string;
    fornecedor: { id?: string | number } | null;
  }>({
    nome: '',
    descricao: '',
    codigoBarras: '',
    valorCusto: '',
    porcentagemLucro: '',
    valorVenda: '',
    quantidade: '',
    fornecedor: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-calcular valor de venda
    if (name === 'valorCusto' || name === 'porcentagemLucro') {
      const custo = parseFloat(name === 'valorCusto' ? value : formData.valorCusto);
      const lucro = parseFloat(name === 'porcentagemLucro' ? value : formData.porcentagemLucro);
      if (custo && lucro) {
        const venda = custo * (1 + lucro / 100);
        setFormData((prev) => ({
          ...prev,
          valorVenda: venda.toFixed(2),
        }));
      }
    }
  };

  const fetchFornecedores = async (query: string) => {
    try {
      const response = await fetch(`/api/fornecedores?nome=${query}`);
      const data = await response.json();
      return Array.isArray(data)
        ? data.map((f: any) => ({
            id: f.id,
            label: f.nome,
            ...f,
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
        ...formData,
        valorCusto: parseFloat(formData.valorCusto),
        porcentagemLucro: parseFloat(formData.porcentagemLucro),
        valorVenda: parseFloat(formData.valorVenda),
        quantidade: parseInt(formData.quantidade),
        fornecedorId: formData.fornecedor?.id,
      };

      const response = await fetch('/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Produto cadastrado com sucesso!');
        router.push('/listar-produtos');
      } else {
        toast.error('Erro ao cadastrar produto');
      }
    } catch (error) {
      toast.error('Erro na conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Cadastrar Produto</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <FormInput
              label="Nome do Produto *"
              name="nome"
              type="text"
              placeholder="Digite o nome do produto"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              name="descricao"
              placeholder="Digite uma descrição"
              value={formData.descricao}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <FormInput
            label="Código de Barras"
            name="codigoBarras"
            type="text"
            placeholder="Escanear ou digitar código"
            value={formData.codigoBarras}
            onChange={handleInputChange}
          />

          <FormInput
            label="Quantidade em Estoque *"
            name="quantidade"
            type="number"
            placeholder="0"
            value={formData.quantidade}
            onChange={handleInputChange}
            required
          />

          <FormInput
            label="Valor de Custo (R$) *"
            name="valorCusto"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.valorCusto}
            onChange={handleInputChange}
            required
          />

          <FormInput
            label="Margem de Lucro (%)"
            name="porcentagemLucro"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.porcentagemLucro}
            onChange={handleInputChange}
          />

          <FormInput
            label="Valor de Venda (R$)"
            name="valorVenda"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.valorVenda}
            onChange={handleInputChange}
            disabled
          />

          <div className="md:col-span-2">
            <AutocompleteInput
              label="Fornecedor"
              placeholder="Digite o nome do fornecedor"
              fetchOptions={fetchFornecedores}
              onSelect={(option) =>
                setFormData((prev) => ({
                  ...prev,
                  fornecedor: option,
                }))
              }
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-primary disabled:opacity-50 transition"
          >
            {loading ? 'Salvando...' : 'Salvar Produto'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/listar-produtos')}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
