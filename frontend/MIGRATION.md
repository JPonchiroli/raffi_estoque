# Migração de Express para Next.js

Este documento detalha a migração do frontend Raffi Estoque de Node.js + Express para Next.js com App Router.

## 📊 Resumo das Mudanças

| Aspecto | Express | Next.js |
|--------|---------|---------|
| Framework | Express.js | Next.js 14 |
| Router | Express Router | App Router (file-based) |
| Views | EJS | React Components (TSX) |
| Styling | CSS Puro | Tailwind CSS |
| API Proxy | Express Middleware | Route Handlers (`/app/api`) |
| Estado | Não há (lado servidor) | useState, useContext (Cliente) |
| Notificações | alert() | react-hot-toast |
| Tabelas | DataTables.js | Componente React customizado |
| Linguagem | JavaScript | TypeScript |

## 🔄 Mapeamento de Rotas

### Express → Next.js Pages

```
Express                          Next.js
/                         →      /app/page.tsx
/cadastro-cliente         →      /app/cadastro-cliente/page.tsx
/cadastro-fornecedor      →      /app/cadastro-fornecedor/page.tsx
/cadastro-produto         →      /app/cadastro-produto/page.tsx
/cadastro-venda           →      /app/cadastro-venda/page.tsx
/listar-clientes          →      /app/listar-clientes/page.tsx
/listar-fornecedores      →      /app/listar-fornecedores/page.tsx
/listar-produtos          →      /app/listar-produtos/page.tsx
/listar-vendas            →      /app/listar-vendas/page.tsx
/detalhes-venda           →      /app/detalhes-venda/page.tsx
```

### Express API Routes → Next.js Route Handlers

```
Express                           Next.js
/clientes (POST/GET/PUT/DELETE)   /app/api/clientes/route.ts
/fornecedores (...)               /app/api/fornecedores/route.ts
/produtos (...)                   /app/api/produtos/route.ts
/vendas (...)                     /app/api/vendas/route.ts
/utils (GET)                      /app/api/utils/route.ts
```

## 📝 Mudanças de Código

### 1. Estrutura de Projeto

**Antes (Express):**
```
frontend/
├── server/
│   └── server.js          # Express app
├── routes/
│   ├── clientes.js
│   ├── fornecedores.js
│   ├── produtos.js
│   ├── vendas.js
│   └── utils.js
├── views/
│   ├── index.ejs
│   └── ...
└── public/
    └── styles/
```

**Depois (Next.js):**
```
frontend/
├── app/
│   ├── api/               # Route handlers (proxies)
│   ├── layout.tsx         # Layout global
│   ├── page.tsx           # Home
│   ├── cadastro-*         # Páginas de cadastro
│   ├── listar-*           # Páginas de listagem
│   └── globals.css
├── components/            # Componentes React reutilizáveis
└── public/               # Assets estáticos
```

### 2. Exemplo de Transformação: Clientes

**Express (server.js):**
```javascript
const express = require('express');
const router = express.Router();
const axios = require('axios');

const BACKEND_URL = 'http://backend:8080/api';

router.post('/cadastrar-cliente-backend', async (req, res) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/clientes/create-cliente`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

module.exports = router;
```

**Next.js (app/api/clientes/route.ts):**
```typescript
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8080/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(`${BACKEND_URL}/clientes/create-cliente`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar cliente' },
      { status: 500 }
    );
  }
}
```

### 3. Exemplo de Transformação: View

**Express (EJS):**
```html
<div class="container">
  <h1>Clientes</h1>
  <table id="clientesTable">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <% clientes.forEach(cliente => { %>
        <tr>
          <td><%= cliente.nome %></td>
          <td><%= cliente.email %></td>
        </tr>
      <% }); %>
    </tbody>
  </table>
</div>
<script>
  $(document).ready(function() {
    $('#clientesTable').DataTable();
  });
</script>
```

**Next.js (React TSX):**
```typescript
'use client';

import { useEffect, useState } from 'react';
import DataTable from '@/components/DataTable';

interface Cliente {
  id: string;
  nome: string;
  email: string;
}

export default function ListarClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    fetch('/api/clientes?action=list')
      .then(res => res.json())
      .then(data => setClientes(data));
  }, []);

  const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'email', label: 'Email' },
  ];

  return (
    <div>
      <h1>Clientes</h1>
      <DataTable columns={columns} data={clientes} />
    </div>
  );
}
```

## 🔧 Mudanças de Funcionalidades

### 1. Busca de Endereço por CEP

**Antes:**
```javascript
$('#cep').blur(function() {
  const cep = $(this).val().replace(/\D/g, '');
  $.ajax({
    url: `/utils/buscar-endereco-backend/${cep}`,
    success: function(data) {
      $('#endereco').val(data.endereco.logradouro);
      $('#cidade').val(data.endereco.localidade);
    }
  });
});
```

**Depois:**
```typescript
const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
  const cep = e.target.value.replace(/\D/g, '');
  if (cep.length === 8) {
    const response = await fetch(`/api/utils?cep=${cep}`);
    const data = await response.json();
    setFormData(prev => ({
      ...prev,
      endereco: data.endereco.logradouro,
      cidade: data.endereco.localidade,
    }));
  }
};
```

### 2. Notificações

**Antes:**
```javascript
alert('Cliente cadastrado com sucesso!');
```

**Depois:**
```typescript
import toast from 'react-hot-toast';

toast.success('Cliente cadastrado com sucesso!');
```

### 3. Tabelas com Busca

**Antes:**
```javascript
$('#clientesTable').DataTable({
  serverSide: true,
  // ...
});
```

**Depois:**
```typescript
<DataTable
  columns={columns}
  data={clientes}
  searchKeys={['nome', 'email']}
  pageSize={10}
/>
```

### 4. Cálculo de Valor de Venda

**Antes:**
```javascript
$('#valorCusto, #porcentagemLucro').change(function() {
  const custo = parseFloat($('#valorCusto').val());
  const lucro = parseFloat($('#porcentagemLucro').val());
  const venda = custo * (1 + lucro / 100);
  $('#valorVenda').val(venda.toFixed(2));
});
```

**Depois:**
```typescript
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));

  if (name === 'valorCusto' || name === 'porcentagemLucro') {
    const custo = parseFloat(name === 'valorCusto' ? value : formData.valorCusto);
    const lucro = parseFloat(name === 'porcentagemLucro' ? value : formData.porcentagemLucro);
    if (custo && lucro) {
      const venda = custo * (1 + lucro / 100);
      setFormData(prev => ({ ...prev, valorVenda: venda.toFixed(2) }));
    }
  }
};
```

## 🎨 Mudanças de Estilo

### Cores Mantidas

```css
/* Express (CSS puro) */
body { background-color: #f4f4f4; }
header { background-color: #2c3e50; }
.btn-primary { background-color: #34495e; }
font-family: 'Cal Sans', sans-serif;

/* Next.js (Tailwind CSS) */
<body className="bg-light">
<header className="bg-primary">
<button className="bg-secondary">
/* Tailwind config define as cores */
```

### Fonte Cal Sans

**Antes:**
```html
<link href="..." rel="stylesheet">
```

**Depois:**
```typescript
// layout.tsx
<head>
  <link href="https://fonts.googleapis.com/css2?family=Cal+Sans&display=swap" rel="stylesheet" />
</head>

// tailwind.config.js
extend: {
  fontFamily: {
    sans: ['Cal Sans', 'ui-sans-serif', ...],
  },
}
```

## 🚀 Vantagens da Migração

1. **Performance**: Next.js oferece otimizações automáticas (Image, Code Splitting)
2. **DX Melhorado**: TypeScript, React Hooks, Hot Reload mais rápido
3. **SEO**: Suporte a metadados e SSG (Server-Side Generation)
4. **Componentes**: Reutilização de componentes React é mais natural
5. **API Routes**: Endpoints sem necessidade de servidor Express separado
6. **Deployment**: Deploy simplificado em plataformas como Vercel
7. **Tailwind CSS**: CSS-in-JS mais limpo e performático

## 📦 Dependências Removidas

- `express`: Não necessário (Next.js integrado)
- `cors`: Gerenciado pelo Next.js
- `ejs`: Substituído por React/TSX
- `nodemon`: Next.js dev server integrado
- `jquery`: JavaScript vanilla + React
- `datatables.js`: Componente React customizado

## 📦 Dependências Adicionadas

- `react`: Necessário para componentes
- `next`: Framework
- `tailwindcss`: Estilização
- `react-hot-toast`: Notificações
- `lucide-react`: Ícones
- `typescript`: Type safety

## 🔒 Variáveis de Ambiente

**Express:**
```
PORT=3000
BACKEND_URL=http://backend:8080/api
```

**Next.js:**
```
NEXT_PUBLIC_BACKEND_URL=http://backend:8080/api
```

Nota: Prefixar com `NEXT_PUBLIC_` torna a variável acessível no cliente.

## 📋 Checklist de Migração

- [x] Criar estrutura de pastas Next.js
- [x] Configurar TypeScript
- [x] Configurar Tailwind CSS
- [x] Criar componentes reutilizáveis
- [x] Converter rotas Express em Route Handlers
- [x] Converter EJS em React Components
- [x] Implementar toast notifications
- [x] Implementar DataTable customizada
- [x] Manter funcionalidades de busca por CEP
- [x] Manter cálculo automático de valor
- [x] Manter suporte a código de barras
- [x] Implementar responsividade
- [x] Atualizar Dockerfile para Next.js
- [x] Criar documentação

## 🐛 Possíveis Problemas e Soluções

### CORS

Se receber erro de CORS, certifique-se de que o backend tem CORS configurado para aceitar requisições de `http://localhost:3000`.

### Variáveis de Ambiente

Certifique-se de que `.env.local` está configurado corretamente e que o servidor foi reiniciado após a mudança.

### Build Fails

Se o build falha, limpe o cache:
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📚 Referências

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [App Router Guide](https://nextjs.org/docs/app)
