'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import FormInput from '@/components/FormInput';
import { useAuth } from '@/context/AuthContext';

export default function CadastroFornecedorForm() {

  const { user } = useAuth();

  const router = useRouter();

  const searchParams = useSearchParams();

  const fornecedorId = searchParams.get('id');

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nomeFornecedor: '',
    email: '',
    telefone: '',
    cnpj: '',
    rua: '',
    numeroRua: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    uf: '',
  });

  useEffect(() => {

    if (!fornecedorId) {
      return;
    }

    const fetchFornecedor = async () => {

      try {

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/fornecedores/get-fornecedor/${fornecedorId}`
        );

        if (!response.ok) {

          toast.error('Erro ao buscar fornecedor');

          return;
        }

        const data = await response.json();

        setFormData({
          nomeFornecedor: data.nomeFornecedor || '',
          email: data.email || '',
          telefone: data.telefone || '',
          cnpj: data.cnpj || '',
          rua: data.rua || '',
          numeroRua: data.numeroRua || '',
          complemento: data.complemento || '',
          bairro: data.bairro || '',
          cep: data.cep || '',
          cidade: data.cidade || '',
          uf: data.uf || '',
        });

      } catch (error) {

        toast.error('Erro ao carregar fornecedor');
      }
    };

    fetchFornecedor();

  }, [fornecedorId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCepBlur = async (
    e: React.FocusEvent<HTMLInputElement>
  ) => {

    const cep = e.target.value.replace(/\D/g, '');

    if (cep.length === 8) {

      try {

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/clientes/get-address/${cep}`
        );

        const data = await response.json();

        if (data) {

          setFormData((prev) => ({
            ...prev,
            rua: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            uf: data.uf || '',
            numeroRua: '',
            complemento: '',
          }));

          toast.success('Endereço encontrado!');
        }

      } catch (error) {

        toast.error('Erro ao buscar endereço');
      }
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const isEdit = Boolean(fornecedorId);

      const response = await fetch(

        isEdit
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/fornecedores/update-fornecedor/${fornecedorId}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/fornecedores/create-fornecedor`,

        {
          method: isEdit ? 'PUT' : 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            ...formData,
            codUsuario: user?.usuarioId,
          }),
        }
      );

      if (response.ok) {

        toast.success(
          isEdit
            ? 'Fornecedor atualizado com sucesso!'
            : 'Fornecedor cadastrado com sucesso!'
        );

        router.push('/listar-fornecedores');

      } else {

        toast.error(
          isEdit
            ? 'Erro ao atualizar fornecedor'
            : 'Erro ao cadastrar fornecedor'
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
          fornecedorId
            ? 'Editar Fornecedor'
            : 'Cadastrar Fornecedor'
        }
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="md:col-span-2">
            <FormInput
              label="Razão Social *"
              name="nomeFornecedor"
              type="text"
              placeholder="Digite a razão social"
              value={formData.nomeFornecedor}
              onChange={handleInputChange}
              required
            />
          </div>

          <FormInput
            label="CNPJ"
            name="cnpj"
            type="text"
            placeholder="00.000.000/0000-00"
            value={formData.cnpj}
            onChange={handleInputChange}
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Digite o email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <FormInput
            label="Telefone"
            name="telefone"
            type="tel"
            placeholder="(00) 0000-0000"
            value={formData.telefone}
            onChange={handleInputChange}
          />

          <FormInput
            label="CEP"
            name="cep"
            type="text"
            placeholder="00000-000"
            value={formData.cep}
            onChange={handleInputChange}
            onBlur={handleCepBlur}
          />

          <FormInput
            label="Endereço"
            name="rua"
            type="text"
            placeholder="Digite o endereço"
            value={formData.rua}
            onChange={handleInputChange}
          />

          <FormInput
            label="Número"
            name="numeroRua"
            type="text"
            placeholder="Número"
            value={formData.numeroRua}
            onChange={handleInputChange}
          />

          <FormInput
            label="Complemento"
            name="complemento"
            type="text"
            placeholder="Apto, Bloco, etc"
            value={formData.complemento}
            onChange={handleInputChange}
          />

          <FormInput
            label="Bairro"
            name="bairro"
            type="text"
            placeholder="Digite o bairro"
            value={formData.bairro}
            onChange={handleInputChange}
          />

          <FormInput
            label="Cidade"
            name="cidade"
            type="text"
            placeholder="Digite a cidade"
            value={formData.cidade}
            onChange={handleInputChange}
          />

          <FormInput
            label="Estado"
            name="uf"
            type="text"
            placeholder="UF"
            value={formData.uf}
            onChange={handleInputChange}
            maxLength={2}
          />

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
                : fornecedorId
                  ? 'Atualizar Fornecedor'
                  : 'Salvar Fornecedor'
            }
          </button>

          <button
            type="button"
            onClick={() => router.push('/listar-fornecedores')}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cancelar
          </button>

        </div>

      </form>
    </div>
  );
}