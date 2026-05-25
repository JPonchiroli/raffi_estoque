# Raffi Estoque - Frontend Next.js

Frontend do sistema Raffi Estoque migrado de Node.js + Express para Next.js com App Router.

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js 18+ instalado
- Backend Java Spring Boot rodando na porta 8080

### Instalação

1. Instale as dependências:

```bash
npm install
```

2. Configure o arquivo `.env.local` com a URL do backend:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/api
# Ou para Docker:
NEXT_PUBLIC_BACKEND_URL=http://backend:8080/api
```

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`

### Build para Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
/app
  ├── /api                 # Route handlers (proxy para backend)
  │   ├── /clientes
  │   ├── /fornecedores
  │   ├── /produtos
  │   ├── /vendas
  │   └── /utils
  ├── /cadastro-cliente       # Cadastro de clientes
  ├── /cadastro-fornecedor    # Cadastro de fornecedores
  ├── /cadastro-produto       # Cadastro de produtos
  ├── /cadastro-venda         # Cadastro de vendas
  ├── /listar-clientes        # Listagem de clientes
  ├── /listar-fornecedores    # Listagem de fornecedores
  ├── /listar-produtos        # Listagem de produtos
  ├── /listar-vendas          # Listagem de vendas
  ├── /detalhes-venda         # Detalhes de uma venda
  ├── layout.tsx              # Layout global
  ├── page.tsx                # Dashboard/Home
  └── globals.css             # Estilos globais

/components
  ├── Header.tsx              # Cabeçalho com navegação
  ├── Footer.tsx              # Rodapé
  ├── FormInput.tsx           # Componente de input de formulário
  ├── AutocompleteInput.tsx   # Input com autocomplete
  ├── DataTable.tsx           # Tabela com busca e paginação
  └── ActionButtons.tsx       # Botões de ação rápida
```

## ✨ Funcionalidades

### Componentes Reutilizáveis

- **FormInput**: Input com label, validação e mensagem de erro
- **AutocompleteInput**: Input com busca e autocomplete em tempo real
- **DataTable**: Tabela com busca, paginação e ações (editar/deletar)
- **ActionButtons**: Botões de navegação rápida
- **Header/Footer**: Navegação e rodapé

### Páginas

- **Dashboard (/)**: Página inicial com ações rápidas
- **Cadastro de Clientes**: Formulário com busca de endereço por CEP
- **Cadastro de Fornecedores**: Formulário com busca de endereço por CEP
- **Cadastro de Produtos**: Cálculo automático de valor de venda, suporte a código de barras
- **Cadastro de Vendas**: Múltiplos itens, autocomplete de cliente/produto
- **Listagem de Clientes**: Tabela com busca e paginação
- **Listagem de Fornecedores**: Tabela com busca e paginação
- **Listagem de Produtos**: Tabela com busca e paginação
- **Listagem de Vendas**: Tabela com botão de detalhes
- **Detalhes da Venda**: Informações completas da venda e seus itens

### Recursos

- 🎨 Estilização com Tailwind CSS
- 🔔 Notificações com react-hot-toast
- 🔍 Busca em tempo real com autocomplete
- 📱 Responsivo (mobile-first)
- 🧮 Cálculo automático de valores
- 🏠 Busca de endereço por CEP (integrada com ViaCEP via backend)
- 📊 Paginação nativa com React
- ♿ Acessibilidade

## 🔗 Endpoints da API

Os endpoints fazem proxy para o backend Java Spring Boot:

### Clientes
- `POST /api/clientes` - Criar cliente
- `GET /api/clientes?action=list` - Listar clientes
- `GET /api/clientes?id=:id` - Buscar cliente por ID
- `GET /api/clientes?nome=:nome` - Buscar cliente por nome
- `PUT /api/clientes?id=:id` - Atualizar cliente
- `DELETE /api/clientes?id=:id` - Deletar cliente

### Fornecedores
- `POST /api/fornecedores` - Criar fornecedor
- `GET /api/fornecedores?action=list` - Listar fornecedores
- `GET /api/fornecedores?id=:id` - Buscar fornecedor por ID
- `GET /api/fornecedores?nome=:nome` - Buscar fornecedor por nome
- `PUT /api/fornecedores?id=:id` - Atualizar fornecedor
- `DELETE /api/fornecedores?id=:id` - Deletar fornecedor

### Produtos
- `POST /api/produtos` - Criar produto
- `GET /api/produtos?action=list` - Listar produtos
- `GET /api/produtos?codigo=:codigo` - Buscar por código de barras
- `PUT /api/produtos?id=:id` - Atualizar produto
- `DELETE /api/produtos?id=:id` - Deletar produto

### Vendas
- `POST /api/vendas` - Criar venda
- `GET /api/vendas?action=list` - Listar vendas
- `GET /api/vendas?id=:id&action=items` - Listar itens de uma venda
- `DELETE /api/vendas?id=:id` - Deletar venda

### Utils
- `GET /api/utils?cep=:cep` - Buscar endereço por CEP

## 🎨 Customização de Cores

As cores padrão estão definidas em `tailwind.config.js`:

```javascript
colors: {
  primary: '#2c3e50',      // Header
  secondary: '#34495e',    // Botões
  light: '#f4f4f4',        // Fundo
}
```

## 🐳 Com Docker

Para rodar com Docker, atualize o `docker-compose.yml`:

```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_BACKEND_URL=http://backend:8080/api
    depends_on:
      - backend
```

## 📝 Variáveis de Ambiente

- `NEXT_PUBLIC_BACKEND_URL`: URL base do backend (padrão: http://backend:8080/api)

## 🚨 Troubleshooting

### Erro de conexão com backend
- Verifique se o backend está rodando na porta 8080
- Certifique-se de que o CORS está configurado no backend
- Verifique a variável `NEXT_PUBLIC_BACKEND_URL` em `.env.local`

### Autocomplete não funciona
- Verifique os endpoints de busca no backend
- Verifique a resposta da API (deve ser um array de objetos com `id` e `label`)

### Código de barras não é lido
- Certifique-se de que o campo está focado quando você começa a digitar
- O campo deve estar configurado como autofoco ou com focus

## 📚 Tecnologias

- **Next.js 14**: React framework
- **React 18**: UI library
- **Tailwind CSS**: Utility-first CSS
- **TypeScript**: Type safety
- **React Hot Toast**: Notificações
- **Lucide React**: Ícones
- **Axios**: HTTP client

## 📄 Licença

ISC

## 👥 Autor

Sistema Raffi Estoque
