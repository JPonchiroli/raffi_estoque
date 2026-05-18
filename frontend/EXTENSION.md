# 🔧 Guia de Extensão - Raffi Estoque Frontend

Este documento descreve como adicionar novas funcionalidades ao projeto.

## 📌 Adicionando um Novo Recurso (CRUD)

Suponha que você quer adicionar um novo recurso chamado "Categorias".

### 1. Criar o Route Handler

Arquivo: `/app/api/categorias/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8080/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(`${BACKEND_URL}/categorias/create-categoria`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar categoria' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const nome = searchParams.get('nome');
    const action = searchParams.get('action');

    let url = '';

    if (action === 'list') {
      url = `${BACKEND_URL}/categorias/list-categoria`;
    } else if (id) {
      url = `${BACKEND_URL}/categorias/busca-categoria-id/${id}`;
    } else if (nome) {
      url = `${BACKEND_URL}/categorias/busca-categorias-nome/${nome}`;
    }

    if (!url) {
      return NextResponse.json(
        { error: 'Parâmetro inválido' },
        { status: 400 }
      );
    }

    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar categorias' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    const response = await fetch(
      `${BACKEND_URL}/categorias/atualizar-categoria/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar categoria' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const response = await fetch(`${BACKEND_URL}/categorias/deletar-categoria/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar categoria' },
      { status: 500 }
    );
  }
}
```

### 2. Adicionar Tipo TypeScript

Arquivo: `types/index.ts` - Adicionar:

```typescript
export interface Categoria {
  id?: string | number;
  nome: string;
  descricao?: string;
  cor?: string;
}

export interface CategoriaCreateDto extends Omit<Categoria, 'id'> {}
```

### 3. Criar Página de Cadastro

Arquivo: `/app/cadastro-categoria/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import FormInput from '@/components/FormInput';

export default function CadastroCategoria() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Categoria cadastrada com sucesso!');
        router.push('/listar-categorias');
      } else {
        toast.error('Erro ao cadastrar categoria');
      }
    } catch (error) {
      toast.error('Erro na conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Cadastrar Categoria</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <FormInput
          label="Nome da Categoria *"
          name="nome"
          type="text"
          placeholder="Digite o nome"
          value={formData.nome}
          onChange={handleInputChange}
          required
        />

        <div className="mb-4">
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

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-primary disabled:opacity-50 transition"
          >
            {loading ? 'Salvando...' : 'Salvar Categoria'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/listar-categorias')}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
```

### 4. Criar Página de Listagem

Arquivo: `/app/listar-categorias/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DataTable from '@/components/DataTable';
import ActionButtons from '@/components/ActionButtons';

interface Categoria {
  id: string;
  nome: string;
  descricao: string;
}

export default function ListarCategorias() {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch('/api/categorias?action=list');
      const data = await response.json();
      setCategorias(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Erro ao carregar categorias');
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (categoria: Categoria) => {
    router.push(`/cadastro-categoria?id=${categoria.id}`);
  };

  const handleDelete = async (categoria: Categoria) => {
    if (confirm(`Deseja deletar a categoria ${categoria.nome}?`)) {
      try {
        const response = await fetch(`/api/categorias?id=${categoria.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Categoria deletada com sucesso!');
          fetchCategorias();
        } else {
          toast.error('Erro ao deletar categoria');
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
    { key: 'descricao' as const, label: 'Descrição' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-primary">Categorias</h1>

      <ActionButtons
        createLink="/cadastro-categoria"
        createLabel="Nova Categoria"
        listLink="/listar-categorias"
        listLabel="Atualizar"
      />

      <DataTable
        columns={columns}
        data={categorias}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchKeys={['nome', 'descricao']}
      />
    </div>
  );
}
```

### 5. Atualizar Header

Arquivo: `components/Header.tsx` - Adicionar link na navegação:

```typescript
<Link href="/listar-categorias" className="hover:text-gray-300 transition">
  Categorias
</Link>
```

### 6. Atualizar Dashboard

Arquivo: `app/page.tsx` - Adicionar card de categorias

## 🎨 Adicionando um Novo Componente

### Exemplo: Componente de Filtro

Arquivo: `components/FilterBar.tsx`

```typescript
'use client';

import { useState } from 'react';
import FormInput from './FormInput';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  onFilter: (filters: Record<string, string>) => void;
  fields: Array<{ name: string; label: string; type?: string }>;
}

export default function FilterBar({ onFilter, fields }: FilterBarProps) {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    onFilter(filters);
  };

  const handleClear = () => {
    setFilters({});
    onFilter({});
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-primary" />
        <h3 className="font-semibold">Filtros</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fields.map((field) => (
          <FormInput
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || 'text'}
            value={filters[field.name] || ''}
            onChange={handleChange}
          />
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
```

## 🔌 Adicionando Integração com API Externa

### Exemplo: Integrar com API de Tabela de Preços

Arquivo: `app/api/precos/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API = 'https://api-externa.com';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const produto = searchParams.get('produto');

    const response = await fetch(
      `${EXTERNAL_API}/precos?produto=${produto}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar preços' },
      { status: 500 }
    );
  }
}
```

## 🧪 Adicionando Testes

Arquivo: `__tests__/components/FormInput.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import FormInput from '@/components/FormInput';

describe('FormInput', () => {
  it('renders with label', () => {
    render(<FormInput label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<FormInput error="Test error" />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
});
```

## 📱 Adicionando Nova Página Responsiva

### Template de Página Responsiva

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function ResponsivePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        // Layout Mobile
        <div className="grid grid-cols-1 gap-4">
          {/* Cards empilhados */}
        </div>
      ) : (
        // Layout Desktop
        <div className="grid grid-cols-3 gap-6">
          {/* Cards lado a lado */}
        </div>
      )}
    </div>
  );
}
```

## 🔐 Adicionando Autenticação

### Middleware de Autenticação

Arquivo: `middleware.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');

  // Se não tiver token, redirecionar para login
  if (!token && request.nextUrl.pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*'],
};
```

## 📊 Adicionando Gráficos

### Instalação

```bash
npm install recharts
```

### Uso

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function Chart() {
  const data = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 200 },
  ];

  return (
    <LineChart width={400} height={300} data={data}>
      <CartesianGrid />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#34495e" />
    </LineChart>
  );
}
```

## 🔍 Boas Práticas

1. **Sempre use tipos TypeScript** - Adicione tipos para props e dados
2. **Trate erros apropriadamente** - Use try/catch e mostre mensagens amigáveis
3. **Use componentes reutilizáveis** - Evite duplicação
4. **Mantenha o estado simples** - Use useState e useContext
5. **Documente seu código** - Adicione comentários quando necessário
6. **Teste suas mudanças** - Execute testes antes de commitar
7. **Siga o padrão de nomenclatura** - Use camelCase e kebab-case apropriados
8. **Mantenha componentes pequenos** - Divida em subcomponentes

## 📋 Checklist para Novo Recurso

- [ ] Criar Route Handler (`/app/api/recurso/route.ts`)
- [ ] Adicionar tipos em `types/index.ts`
- [ ] Criar página de cadastro (`/app/cadastro-recurso/page.tsx`)
- [ ] Criar página de listagem (`/app/listar-recurso/page.tsx`)
- [ ] Adicionar link no Header (se necessário)
- [ ] Adicionar ao Dashboard (se necessário)
- [ ] Testar todas as funcionalidades CRUD
- [ ] Testar responsividade
- [ ] Adicionar documentação
- [ ] Fazer commit com mensagem clara

---

**Está tudo pronto para expandir! Boa sorte com suas mudanças! 🚀**
