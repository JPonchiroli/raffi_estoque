'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import FormInput from '@/components/FormInput';

export default function CadastroCliente() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const response = await fetch(`/api/utils?cep=${cep}`);
        const data = await response.json();
        if (data.endereco) {
          setFormData((prev) => ({
            ...prev,
            endereco: data.endereco.logradouro || '',
            bairro: data.endereco.bairro || '',
            cidade: data.endereco.localidade || '',
            estado: data.endereco.uf || '',
          }));
          toast.success('Endereço encontrado!');
        }
      } catch (error) {
        toast.error('Erro ao buscar endereço');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Cliente cadastrado com sucesso!');
        router.push('/listar-clientes');
      } else {
        toast.error('Erro ao cadastrar cliente');
      }
    } catch (error) {
      toast.error('Erro na conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Cadastrar Cliente</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <FormInput
              label="Nome Completo *"
              name="nome"
              type="text"
              placeholder="Digite o nome completo"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>

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
            name="endereco"
            type="text"
            placeholder="Digite o endereço"
            value={formData.endereco}
            onChange={handleInputChange}
          />

          <FormInput
            label="Número"
            name="numero"
            type="text"
            placeholder="Número"
            value={formData.numero}
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
            name="estado"
            type="text"
            placeholder="UF"
            value={formData.estado}
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
            {loading ? 'Salvando...' : 'Salvar Cliente'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/listar-clientes')}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
