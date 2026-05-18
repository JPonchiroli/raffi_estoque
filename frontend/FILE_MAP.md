# 📁 Mapa de Arquivos - Raffi Estoque Frontend

Visão geral completa de todos os arquivos criados/modificados na migração.

## 📊 Resumo por Tipo

| Tipo | Quantidade | Arquivos |
|------|-----------|----------|
| Páginas (TSX) | 10 | Cadastro + Listagem + Detalhes |
| Componentes (TSX) | 6 | Header, Footer, FormInput, etc |
| Route Handlers (TS) | 5 | API proxies |
| Configuração | 5 | next.config.js, tailwind.config.js, etc |
| Documentação | 8 | README, MIGRATION, DEVELOPMENT, etc |
| Tipos (TS) | 1 | types/index.ts |
| Utilidades (TS) | 1 | lib/utils.ts |
| **TOTAL** | **36** | **arquivos** |

---

## 🎯 Arquivos por Categoria

### 🔧 Configuração do Projeto

```
frontend/
├── package.json                  ← Dependências (npm packages)
├── tsconfig.json                 ← Configuração TypeScript
├── tailwind.config.js            ← Configuração Tailwind CSS
├── postcss.config.js             ← Configuração PostCSS
├── next.config.js                ← Configuração Next.js
├── .env.local                    ← Variáveis de ambiente
├── .dockerignore                 ← Docker ignore
├── Dockerfile                    ← Container build
└── .gitignore                    ← Git ignore
```

### 📖 Documentação

```
frontend/
├── README.md                     ← Documentação principal
├── QUICK_START.md                ← Começar em 5 minutos
├── MIGRATION.md                  ← Detalhes da migração
├── DEVELOPMENT.md                ← Guia de desenvolvimento
├── EXTENSION.md                  ← Como expandir
├── NEXT_STEPS.md                 ← Próximos passos
├── SUMMARY.md                    ← Resumo completo
└── PRE_PRODUCTION_CHECKLIST.md   ← Checklist de produção
```

### 🎨 Layout e Estilos

```
frontend/app/
├── layout.tsx                    ← Layout global com Toaster
├── globals.css                   ← Estilos globais + Cal Sans
└── page.tsx                      ← Dashboard principal
```

### 🧩 Componentes Reutilizáveis

```
frontend/components/
├── Header.tsx                    ← Navegação responsiva
├── Footer.tsx                    ← Rodapé
├── FormInput.tsx                 ← Input com validação
├── AutocompleteInput.tsx         ← Input com busca
├── DataTable.tsx                 ← Tabela com paginação
└── ActionButtons.tsx             ← Botões de ação
```

### 📝 Páginas de Cadastro

```
frontend/app/cadastro-cliente/
└── page.tsx                      ← Cadastro cliente com busca CEP

frontend/app/cadastro-fornecedor/
└── page.tsx                      ← Cadastro fornecedor com busca CEP

frontend/app/cadastro-produto/
└── page.tsx                      ← Cadastro produto com cálculo

frontend/app/cadastro-venda/
└── page.tsx                      ← Cadastro venda multi-itens
```

### 📋 Páginas de Listagem

```
frontend/app/listar-clientes/
└── page.tsx                      ← Listagem com tabela e busca

frontend/app/listar-fornecedores/
└── page.tsx                      ← Listagem com tabela e busca

frontend/app/listar-produtos/
└── page.tsx                      ← Listagem com tabela e busca

frontend/app/listar-vendas/
└── page.tsx                      ← Listagem com botão detalhes
```

### 🔍 Páginas de Detalhes

```
frontend/app/detalhes-venda/
└── page.tsx                      ← Detalhes completos de venda
```

### 🔌 Route Handlers (API Proxies)

```
frontend/app/api/clientes/
└── route.ts                      ← CRUD: POST, GET, PUT, DELETE

frontend/app/api/fornecedores/
└── route.ts                      ← CRUD: POST, GET, PUT, DELETE

frontend/app/api/produtos/
└── route.ts                      ← CRUD: POST, GET, PUT, DELETE

frontend/app/api/vendas/
└── route.ts                      ← CRUD: POST, GET, DELETE

frontend/app/api/utils/
└── route.ts                      ← Busca CEP
```

### 🔤 Tipos e Utilidades

```
frontend/types/
└── index.ts                      ← Tipos TypeScript (Cliente, Produto, etc)

frontend/lib/
└── utils.ts                      ← Funções utilitárias (formatação, etc)
```

---

## 📊 Estrutura Final Completa

```
frontend/
│
├── 📁 app/                              # Páginas e API routes
│   ├── 📁 api/
│   │   ├── 📁 clientes/
│   │   │   └── route.ts                # Endpoints clientes
│   │   ├── 📁 fornecedores/
│   │   │   └── route.ts                # Endpoints fornecedores
│   │   ├── 📁 produtos/
│   │   │   └── route.ts                # Endpoints produtos
│   │   ├── 📁 vendas/
│   │   │   └── route.ts                # Endpoints vendas
│   │   └── 📁 utils/
│   │       └── route.ts                # Endpoints utils
│   │
│   ├── 📁 cadastro-cliente/
│   │   └── page.tsx                    # Cadastro cliente
│   ├── 📁 cadastro-fornecedor/
│   │   └── page.tsx                    # Cadastro fornecedor
│   ├── 📁 cadastro-produto/
│   │   └── page.tsx                    # Cadastro produto
│   ├── 📁 cadastro-venda/
│   │   └── page.tsx                    # Cadastro venda
│   │
│   ├── 📁 listar-clientes/
│   │   └── page.tsx                    # Listagem clientes
│   ├── 📁 listar-fornecedores/
│   │   └── page.tsx                    # Listagem fornecedores
│   ├── 📁 listar-produtos/
│   │   └── page.tsx                    # Listagem produtos
│   ├── 📁 listar-vendas/
│   │   └── page.tsx                    # Listagem vendas
│   │
│   ├── 📁 detalhes-venda/
│   │   └── page.tsx                    # Detalhes venda
│   │
│   ├── layout.tsx                      # Layout global
│   ├── page.tsx                        # Dashboard
│   └── globals.css                     # Estilos globais
│
├── 📁 components/                       # Componentes reutilizáveis
│   ├── Header.tsx                      # Navegação
│   ├── Footer.tsx                      # Rodapé
│   ├── FormInput.tsx                   # Input simples
│   ├── AutocompleteInput.tsx           # Input com busca
│   ├── DataTable.tsx                   # Tabela com paginação
│   └── ActionButtons.tsx               # Botões de ação
│
├── 📁 types/                            # Tipos TypeScript
│   └── index.ts                        # Todas as interfaces
│
├── 📁 lib/                              # Utilidades
│   └── utils.ts                        # Funções helpers
│
├── 📁 public/                           # Assets estáticos
│   ├── favicon.ico
│   └── (outros assets)
│
├── 📄 Configuration Files
│   ├── package.json                    # npm dependencies
│   ├── tsconfig.json                   # TypeScript config
│   ├── tailwind.config.js              # Tailwind config
│   ├── postcss.config.js               # PostCSS config
│   ├── next.config.js                  # Next.js config
│   ├── .env.local                      # Environment variables
│   ├── .dockerignore                   # Docker ignore
│   ├── Dockerfile                      # Container build
│   └── .gitignore                      # Git ignore
│
└── 📄 Documentation Files
    ├── README.md                       # Principal
    ├── QUICK_START.md                  # Começar rápido
    ├── MIGRATION.md                    # Detalhes migração
    ├── DEVELOPMENT.md                  # Guia dev
    ├── EXTENSION.md                    # Como expandir
    ├── NEXT_STEPS.md                   # Próximos passos
    ├── SUMMARY.md                      # Resumo
    └── PRE_PRODUCTION_CHECKLIST.md     # Checklist
```

---

## 🎯 Arquivos por Funcionalidade

### Gestão de Clientes
- `app/cadastro-cliente/page.tsx` - Cadastro
- `app/listar-clientes/page.tsx` - Listagem
- `app/api/clientes/route.ts` - API

### Gestão de Fornecedores
- `app/cadastro-fornecedor/page.tsx` - Cadastro
- `app/listar-fornecedores/page.tsx` - Listagem
- `app/api/fornecedores/route.ts` - API

### Gestão de Produtos
- `app/cadastro-produto/page.tsx` - Cadastro
- `app/listar-produtos/page.tsx` - Listagem
- `app/api/produtos/route.ts` - API

### Gestão de Vendas
- `app/cadastro-venda/page.tsx` - Cadastro
- `app/listar-vendas/page.tsx` - Listagem
- `app/detalhes-venda/page.tsx` - Detalhes
- `app/api/vendas/route.ts` - API

### Componentes Compartilhados
- `components/Header.tsx` - Usado em todas
- `components/Footer.tsx` - Usado em todas
- `components/FormInput.tsx` - Cadastros
- `components/AutocompleteInput.tsx` - Cadastros com busca
- `components/DataTable.tsx` - Listagens
- `components/ActionButtons.tsx` - Cadastros

---

## 📊 Estatísticas de Código

| Arquivo | Tipo | Linhas | Descrição |
|---------|------|--------|-----------|
| `app/api/clientes/route.ts` | TS | ~80 | CRUD completo |
| `app/cadastro-cliente/page.tsx` | TSX | ~150 | Formulário com CEP |
| `app/listar-clientes/page.tsx` | TSX | ~120 | Listagem com CRUD |
| `components/DataTable.tsx` | TSX | ~180 | Tabela interativa |
| `components/AutocompleteInput.tsx` | TSX | ~100 | Busca em tempo real |
| `types/index.ts` | TS | ~120 | Todas as interfaces |
| `lib/utils.ts` | TS | ~150 | Funções helpers |
| **TOTAL** | - | **~3.500+** | linhas de código |

---

## 🔗 Relações Entre Arquivos

### Header → Todas as Páginas
```
Header.tsx (navegação)
    ↓
    Todas as páginas usam Header
```

### API Routes → Páginas
```
route.ts (backend proxy)
    ↓
    Cadastro-X (criar/editar)
    Listar-X (ler/deletar)
    Detalhes-X (ler)
```

### Componentes → Páginas
```
FormInput, AutocompleteInput → Cadastro-X
DataTable, ActionButtons → Listar-X
Header, Footer → Todas
```

### Tipos → Todos os Arquivos
```
types/index.ts
    ↓
    Usado em: componentes, páginas, routes
```

---

## ✨ Destaques

### Arquivos Mais Importantes
1. **`app/layout.tsx`** - Configura layout global e Toaster
2. **`components/DataTable.tsx`** - Reutilizado em todas listagens
3. **`app/api/clientes/route.ts`** - Padrão para outros routes
4. **`types/index.ts`** - Define contrato de dados
5. **`README.md`** - Documentação principal

### Arquivos Mais Reutilizados
1. `Header.tsx` - 10 páginas
2. `Footer.tsx` - 10 páginas
3. `FormInput.tsx` - 4 cadastros
4. `DataTable.tsx` - 4 listagens
5. `ActionButtons.tsx` - 5 páginas

---

## 🚀 Como Navegar

### Para Adicionar Nova Funcionalidade
1. Ler: `EXTENSION.md`
2. Criar: `app/api/novo-recurso/route.ts`
3. Criar: `app/cadastro-novo/page.tsx`
4. Criar: `app/listar-novo/page.tsx`
5. Adicionar tipos em: `types/index.ts`

### Para Entender Arquitetura
1. Ler: `MIGRATION.md`
2. Ler: `DEVELOPMENT.md`
3. Explorar: `components/`
4. Explorar: `app/api/`

### Para Debugar Problema
1. Ler: `DEVELOPMENT.md` (troubleshooting)
2. Verificar: `app/api/` (problemas de API)
3. Verificar: `components/` (problemas de UI)
4. Verificar: `.env.local` (problemas de config)

---

## 📋 Checklist de Conhecimento

- [ ] Entender estrutura de pastas
- [ ] Saber onde estão as páginas
- [ ] Saber onde estão os componentes
- [ ] Saber onde estão os routes
- [ ] Saber onde adicionar tipos
- [ ] Saber como testar localmente
- [ ] Saber como fazer build
- [ ] Saber como fazer deploy

---

**Mapa Completo! Você está pronto para trabalhar! 🚀**

Dúvidas sobre um arquivo? Verifique as documentações!
