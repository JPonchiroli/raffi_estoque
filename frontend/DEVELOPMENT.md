# Guia de Desenvolvimento - Raffi Estoque Frontend

Este documento descreve como trabalhar com o projeto Next.js.

## 🎯 Estrutura de Componentes

### Componentes Core

#### 1. FormInput
Componente genérico para inputs de formulário com validação.

```typescript
<FormInput
  label="Nome Completo"
  name="nome"
  type="text"
  placeholder="Digite o nome"
  value={formData.nome}
  onChange={handleChange}
  error={errors.nome}
  required
/>
```

**Props:**
- `label?`: Label do input
- `error?`: Mensagem de erro
- `helperText?`: Texto de ajuda
- Todos os atributos padrão do HTML input

#### 2. AutocompleteInput
Input com busca em tempo real e dropdown de opções.

```typescript
<AutocompleteInput
  label="Cliente"
  placeholder="Digite para buscar..."
  fetchOptions={async (query) => {
    const res = await fetch(`/api/clientes?nome=${query}`);
    return res.json();
  }}
  onSelect={(option) => handleSelect(option)}
/>
```

**Props:**
- `label?`: Label
- `placeholder?`: Placeholder
- `fetchOptions`: Função assíncrona que retorna Array<{id, label, ...}>
- `onSelect`: Callback quando opção é selecionada

#### 3. DataTable
Tabela com busca e paginação integrada.

```typescript
<DataTable
  columns={[
    { key: 'nome', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { 
      key: 'valor', 
      label: 'Valor',
      render: (value) => `R$ ${value.toFixed(2)}`
    },
  ]}
  data={clientes}
  onEdit={(item) => handleEdit(item)}
  onDelete={(item) => handleDelete(item)}
  searchKeys={['nome', 'email']}
  pageSize={15}
/>
```

**Props:**
- `columns`: Array de Column<T>
- `data`: Array de dados
- `onEdit?`: Callback para editar
- `onDelete?`: Callback para deletar
- `searchKeys?`: Chaves para buscar
- `pageSize?`: Itens por página (padrão: 10)

#### 4. ActionButtons
Botões de ação rápida para navegação.

```typescript
<ActionButtons
  createLink="/cadastro-cliente"
  createLabel="Novo Cliente"
  listLink="/listar-clientes"
  listLabel="Atualizar"
/>
```

## 📝 Criando uma Nova Página

1. Criar arquivo em `/app/sua-pagina/page.tsx`
2. Usar `'use client'` no topo
3. Importar componentes necessários
4. Estrutura básica:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SuaPagina() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sua lógica aqui
      toast.success('Sucesso!');
    } catch (error) {
      toast.error('Erro!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-primary">Sua Página</h1>
      {/* Seu conteúdo */}
    </div>
  );
}
```

## 🔌 Criando um Novo Route Handler

1. Criar arquivo em `/app/api/seu-recurso/route.ts`
2. Implementar os métodos necessários:

```typescript
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8080/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const response = await fetch(
      `${BACKEND_URL}/seu-recurso/${id}`
    );
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(`${BACKEND_URL}/seu-recurso`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar' },
      { status: 500 }
    );
  }
}
```

## 🎨 Customizando Estilos

### Tailwind Classes Comuns

```typescript
// Background
bg-light          // #f4f4f4
bg-primary        // #2c3e50
bg-secondary      // #34495e
bg-white
bg-gray-100

// Texto
text-primary
text-secondary
text-gray-600
text-white

// Padding
p-4 px-4 py-2

// Margin
m-4 mb-6

// Borders
border border-gray-300 rounded-lg rounded-md

// Hover
hover:bg-primary
hover:text-gray-300

// Responsividade
md:col-span-2
md:grid-cols-2
hidden md:flex
```

### Adicionando Novas Cores

Em `tailwind.config.js`:
```javascript
extend: {
  colors: {
    'custom-color': '#hexcode',
  },
}
```

## 🔍 Padrões de Busca e Paginação

### Usando DataTable com Busca

```typescript
const [dados, setDados] = useState<Item[]>([]);

// A paginação e busca são gerenciadas pelo DataTable
// apenas passe os dados e as chaves para buscar
<DataTable
  data={dados}
  searchKeys={['nome', 'email', 'telefone']}
  pageSize={10}
/>
```

### Autocomplete com Busca

```typescript
const fetchOptions = async (query: string) => {
  const response = await fetch(`/api/recurso?nome=${query}`);
  return response.json();
};

<AutocompleteInput
  fetchOptions={fetchOptions}
  onSelect={(option) => {
    setFormData(prev => ({
      ...prev,
      seuCampo: option.id,
    }));
  }}
/>
```

## 🧪 Testando Localmente

1. Inicie o backend Java na porta 8080
2. Configure `.env.local`:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/api
   ```
3. Execute:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:3000`

## 🐛 Debugging

### Verificar Requisições

Abra DevTools (F12) e vá para a aba "Network" para ver as requisições para a API.

### Verificar Logs

```typescript
console.log('Debug:', valor);
```

### Verificar Estado

```typescript
// Adicione useEffect para debug
useEffect(() => {
  console.log('Dados atualizados:', dados);
}, [dados]);
```

## 🔐 Segurança

1. **Valide inputs** no frontend para UX
2. **Nunca confie** apenas em validação do frontend
3. **Use HTTPS** em produção
4. **Proteja variáveis** sensíveis com .env
5. **Sanitize** dados do usuário

## 📱 Responsividade

### Breakpoints Tailwind

```typescript
// Mobile-first (padrão)
<div className="w-full">

// Tablets e acima
<div className="md:w-1/2">

// Desktop e acima
<div className="lg:w-1/3">

// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

## 🚀 Build e Deploy

### Build local
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t raffi-frontend .
docker run -p 3000:3000 raffi-frontend
```

### Vercel
```bash
npm install -g vercel
vercel
```

## 📋 Checklist antes de Push

- [ ] Testei todas as páginas
- [ ] Testei responsividade (mobile/tablet/desktop)
- [ ] Testei conexão com backend
- [ ] Removi console.logs desnecessários
- [ ] Verifiquei TypeScript errors
- [ ] Atualizei documentação se necessário
- [ ] Commit message é clara

## 📞 Troubleshooting Common Issues

### "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### Build fails
```bash
npm run build -- --debug
```

### Port already in use
```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Backend não responde
- Verifique se backend está rodando
- Verifique URL em .env.local
- Verifique CORS no backend

## 📚 Recursos Úteis

- [React Hooks Documentation](https://react.dev/reference/react)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [Tailwind Component Library](https://tailwindui.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
