# ⚡ Quick Start - Raffi Estoque Frontend

Começar em 5 minutos!

## 1️⃣ Instalar (30 segundos)

```bash
cd frontend
npm install
```

## 2️⃣ Configurar (10 segundos)

Criar/atualizar `.env.local`:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/api
```

Para Docker:
```env
NEXT_PUBLIC_BACKEND_URL=http://backend:8080/api
```

## 3️⃣ Iniciar Backend (1 minuto)

```bash
cd backend
./mvnw spring-boot:run
# Aguarde mensagem: "Started RaffiEstoqueApplication"
```

## 4️⃣ Iniciar Frontend (1 minuto)

```bash
cd frontend
npm run dev
```

Abra http://localhost:3000 no navegador! 🎉

## 📋 O que Fazer Primeiro

1. **Explore o Dashboard**
   - Clique nos botões de ação rápida
   - Conheça a interface

2. **Teste Criar um Cliente**
   - Vá para "Clientes" → "Novo Cliente"
   - Preencha nome, email, telefone
   - Teste busca de CEP (ex: 01310100)
   - Clique "Salvar Cliente"
   - Vá para "Listar" para ver o cliente criado

3. **Teste Criar um Produto**
   - Vá para "Produtos" → "Novo Produto"
   - Preencha nome e valor de custo
   - Digite margem de lucro (ex: 30)
   - Veja valor de venda calcular automaticamente
   - Clique "Salvar Produto"

4. **Teste Criar uma Venda**
   - Vá para "Vendas" → "Nova Venda"
   - Busque cliente (comece a digitar nome)
   - Selecione um cliente
   - Busque produto
   - Digite quantidade e preço
   - Clique "Salvar Venda"
   - Clique em "Detalhes" para ver informações

## 🐳 Com Docker

```bash
# Build
docker build -t raffi-frontend ./frontend

# Run
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_BACKEND_URL=http://backend:8080/api \
  raffi-frontend
```

Com docker-compose (na raiz do projeto):
```bash
docker-compose up
```

Acesse http://localhost:3000

## 🆘 Problemas?

### Erro "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### Erro de conexão com backend
```bash
# Verificar se backend está rodando
# Verificar .env.local tem URL correta
# Verificar CORS no backend
```

### Porta 3000 em uso
```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📚 Ler Depois

1. **README.md** - Documentação completa
2. **DEVELOPMENT.md** - Guia de desenvolvimento
3. **MIGRATION.md** - Detalhes técnicos
4. **EXTENSION.md** - Como adicionar funcionalidades

## 🚀 Build para Produção

```bash
npm run build
npm start
```

Pronto! O site estará em http://localhost:3000

## 🎨 Estrutura de Pastas

```
frontend/
├── app/                    # Páginas e API routes
│   ├── api/               # Endpoints (proxy)
│   ├── cadastro-*         # Páginas de cadastro
│   ├── listar-*           # Páginas de listagem
│   ├── detalhes-venda/    # Detalhes
│   ├── layout.tsx         # Layout global
│   └── page.tsx           # Dashboard
├── components/            # Componentes React
├── lib/                   # Utilidades
├── types/                 # Tipos TypeScript
├── public/                # Assets estáticos
└── [configuração]         # next.config.js, etc
```

## 🎯 Dicas Rápidas

- **Editar cores**: `tailwind.config.js`
- **Adicionar páginas**: Criar pasta em `/app` com `page.tsx`
- **Adicionar endpoints**: Criar arquivo em `/app/api`
- **Componentes**: Criar em `/components`
- **Tipos**: Definir em `/types/index.ts`

## 🔑 Comandos Principais

```bash
npm run dev          # Desenvolvimento
npm run build        # Build
npm start            # Produção
npm run lint         # Verificar erros
```

## ✨ Próximos 30 Minutos

- [ ] Instalar dependências
- [ ] Configurar .env.local
- [ ] Iniciar backend
- [ ] Iniciar frontend
- [ ] Explorar dashboard
- [ ] Criar um cliente
- [ ] Criar um produto
- [ ] Criar uma venda
- [ ] Testar edição
- [ ] Testar deleção

## 📊 Cores do Projeto

```
#2c3e50  → Header, Textos principais
#34495e  → Botões, Links
#f4f4f4  → Fundo geral
```

## 🎓 Conceitos Principais

- **Next.js App Router**: Roteamento baseado em arquivos
- **React Components**: Componentes reutilizáveis em TSX
- **TypeScript**: Type safety sem overhead
- **Tailwind CSS**: Classes CSS utility-first
- **Route Handlers**: API endpoints sem Express

## 🚨 Importante

⚠️ **Backend deve estar rodando na porta 8080**
⚠️ **Variáveis .env.local não commitadas**
⚠️ **Usar `'use client'` em componentes com estado**

## 🎉 Pronto!

Você agora tem um sistema moderno de gerenciamento de estoque! 🚀

**Dúvidas?** Leia os documentos ou consulte DEVELOPMENT.md

---

Versão: 1.0.0 | Data: 16/05/2026
