'use client';

import { useState, useEffect } from 'react';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';

import toast from 'react-hot-toast';

import FormInput from '@/components/FormInput';
import AutocompleteInput from '@/components/AutocompleteInput';

import { useAuth } from '@/context/AuthContext';

export default function CadastroProduto() {

  const { user } = useAuth();

  const router = useRouter();

  const searchParams = useSearchParams();

  const produtoId = searchParams.get('id');

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<{
    nomeProduto: string;
    codigoBarras: string;
    unidadeMedida: string;
    valorCusto: string;
    porcentagemLucro: string;
    valorVenda: string;
    estoqueAtual: string;
    estoqueMinimo: string;
    fornecedor: {
      id?: string | number;
      label?: string;
    } | null;
  }>({
    nomeProduto: '',
    codigoBarras: '',
    unidadeMedida: '',
    valorCusto: '',
    porcentagemLucro: '',
    valorVenda: '',
    estoqueAtual: '',
    estoqueMinimo: '',
    fornecedor: null,
  });

  useEffect(() => {

    if (!produtoId) {
      return;
    }

    const fetchProduto = async () => {

      try {

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/get-produto/${produtoId}`
        );

        if (!response.ok) {
          toast.error('Erro ao buscar produto');
          return;
        }

        const data = await response.json();

        let fornecedor = null;

        if (data.codFornecedor) {

          const fornecedorResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/fornecedores/get-fornecedor/${data.codFornecedor}`
          );

          if (fornecedorResponse.ok) {

            const fornecedorData = await fornecedorResponse.json();

            fornecedor = {
              id: fornecedorData.codFornecedor,
              label: fornecedorData.nomeFornecedor,
            };
          }
        }

        setFormData({
          nomeProduto: data.nomeProduto || '',
          codigoBarras: data.codigoBarras || '',
          unidadeMedida: data.unidadeMedida || '',
          valorCusto: String(data.valorCusto || ''),
          porcentagemLucro: String(data.porcentagemLucro || ''),
          valorVenda: String(data.valorVenda || ''),
          estoqueAtual: String(data.estoqueAtual || ''),
          estoqueMinimo: String(data.estoqueMinimo || ''),
          fornecedor,
        });

      } catch (error) {

        toast.error('Erro ao carregar produto');

      }
    };

    fetchProduto();

  }, [produtoId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {

    const { name, value } = e.target;

    setFormData((prev) => {

      const updated = {
        ...prev,
        [name]: value,
      };

      const custo = parseFloat(
        name === 'valorCusto'
          ? value
          : updated.valorCusto
      );

      const lucro = parseFloat(
        name === 'porcentagemLucro'
          ? value
          : updated.porcentagemLucro
      );

      if (
        !isNaN(custo) &&
        !isNaN(lucro)
      ) {

        updated.valorVenda = (
          custo *
          (1 + lucro / 100)
        ).toFixed(2);
      }

      return updated;
    });
  };

  const fetchFornecedores = async (
    query: string
  ) => {

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/fornecedores/get-fornecedor-nome/${query}`
      );

      const data = await response.json();

      return Array.isArray(data)

        ? data.map((f: any) => ({
            id: f.codFornecedor,
            label: f.nomeFornecedor,
            ...f,
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

      const isEdit = Boolean(produtoId);

      const payload = {

        nomeProduto: formData.nomeProduto,

        codigoBarras: formData.codigoBarras,

        unidadeMedida: formData.unidadeMedida,

        valorCusto: formData.valorCusto
          ? parseFloat(formData.valorCusto)
          : null,

        porcentagemLucro:
          formData.porcentagemLucro
            ? parseFloat(
                formData.porcentagemLucro
              )
            : null,

        valorVenda: formData.valorVenda
          ? parseFloat(formData.valorVenda)
          : null,

        estoqueAtual: formData.estoqueAtual
          ? parseInt(formData.estoqueAtual)
          : null,

        estoqueMinimo: formData.estoqueMinimo
          ? parseInt(formData.estoqueMinimo)
          : null,

        codFornecedor:
          formData.fornecedor?.id,

        codUsuario: user?.usuarioId,
      };

      const response = await fetch(

        isEdit
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/update-produto/${produtoId}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/create-produto`,

        {
          method:
            isEdit
              ? 'PUT'
              : 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {

        toast.success(

          isEdit
            ? 'Produto atualizado com sucesso!'
            : 'Produto cadastrado com sucesso!'
        );

        router.push('/listar-produtos');

      } else {

        toast.error(

          isEdit
            ? 'Erro ao atualizar produto'
            : 'Erro ao cadastrar produto'
        );
      }

    } catch (error) {

      toast.error('Erro na conexão');

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-primary">

        {
          produtoId
            ? 'Editar Produto'
            : 'Cadastrar Produto'
        }

      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="md:col-span-2">

            <FormInput
              label="Nome do Produto *"
              name="nomeProduto"
              type="text"
              placeholder="Digite o nome do produto"
              value={formData.nomeProduto}
              onChange={handleInputChange}
              required
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
            label="Unidade de Medida"
            name="unidadeMedida"
            type="text"
            placeholder="Ex: Unidade, KG, Caixa"
            value={formData.unidadeMedida}
            onChange={handleInputChange}
          />

          <FormInput
            label="Estoque Atual *"
            name="estoqueAtual"
            type="number"
            placeholder="0"
            value={formData.estoqueAtual}
            onChange={handleInputChange}
            required
          />

          <FormInput
            label="Estoque Mínimo"
            name="estoqueMinimo"
            type="number"
            placeholder="0"
            value={formData.estoqueMinimo}
            onChange={handleInputChange}
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
              value={formData.fornecedor?.label || ''}
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

            {
              loading
                ? 'Salvando...'
                : produtoId
                  ? 'Atualizar Produto'
                  : 'Salvar Produto'
            }

          </button>

          <button
            type="button"
            onClick={() =>
              router.push('/listar-produtos')
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