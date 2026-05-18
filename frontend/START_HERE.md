# 🚀 COMECE AQUI - Raffi Estoque Next.js

## ⚡ Os Próximos 5 Minutos

### 1. Instale as dependências
```bash
cd frontend
npm install
```

### 2. Configure o arquivo .env.local
Na pasta `frontend`, crie ou edite `.env.local`:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/api
```

### 3. Certifique-se de que o backend Java está rodando
```bash
cd backend
./mvnw spring-boot:run
```
⏱️ Aguarde até ver: `"Started RaffiEstoqueApplication"`

### 4. Inicie o frontend
```bash
cd frontend
npm run dev
```

### 5. Abra no navegador
```
http://localhost:3000
```

✅ Pronto! O sistema deve estar funcionando!

---

## 🧪 Teste Rápido

1. **Dashboard** - Você deve ver 4 cards (Clientes, Fornecedores, Produtos, Vendas)
2. **Criar Cliente** - Clique em "Novo Cliente" e teste o formulário
3. **Buscar CEP** - Digite `01310100` e pressione Tab (deve preencher endereço)
4. **Salvar** - Clique em "Salvar Cliente" (deve aparecer toast verde)
5. **Listar** - Clique em "Listar" e veja o cliente na tabela

Se tudo funcionou = **sucesso!** 🎉

---

## ❓ Problema?

### "npm: command not found"
→ Instale Node.js de https://nodejs.org

### "Cannot connect to backend"
→ Verifique se backend está rodando em http://localhost:8080

### "Port 3000 already in use"
```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Mais problemas?
→ Leia `QUICK_START.md`

---

## 📚 Documentação

| Arquivo | Tempo | Para quem |
|---------|-------|-----------|
| [QUICK_START.md](QUICK_START.md) | 5 min | Começar logo |
| [README.md](README.md) | 20 min | Entender tudo |
| [DEVELOPMENT.md](DEVELOPMENT.md) | 30 min | Desenvolver |
| [EXTENSION.md](EXTENSION.md) | 25 min | Adicionar features |
| [INDEX.md](INDEX.md) | 10 min | Navegar documentação |

---

## 🎯 O Que Você Tem

✅ Dashboard principal  
✅ Gestão de Clientes (CRUD + busca CEP)  
✅ Gestão de Fornecedores (CRUD + busca CEP)  
✅ Gestão de Produtos (CRUD + cálculo automático)  
✅ Gestão de Vendas (CRUD + múltiplos itens)  
✅ Tabelas com busca e paginação  
✅ Autocomplete  
✅ Notificações toast  
✅ Responsividade mobile  
✅ TypeScript  
✅ Tailwind CSS  

---

## 💻 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Iniciar servidor local

# Build
npm run build           # Compilar para produção
npm start               # Executar build

# Validação
npm run lint            # Verificar erros TypeScript
```

---

## 🏗️ Estrutura Rápida

```
frontend/
├── app/
│   ├── api/            → Endpoints
│   ├── cadastro-*/     → Formulários
│   ├── listar-*/       → Listagens
│   ├── layout.tsx      → Layout global
│   └── page.tsx        → Dashboard
├── components/         → Componentes React
├── types/              → Interfaces TypeScript
├── lib/                → Funções helpers
└── public/             → Assets estáticos
```

---

## 🎨 Cores do Projeto

```
Header:   #2c3e50 (azul escuro)
Botões:   #34495e (cinza azulado)
Fundo:    #f4f4f4 (branco off)
```

---

## ✅ Próximo?

1. **Explorar o dashboard** - Conheça a interface
2. **Testar criar cliente** - Teste o fluxo completo
3. **Ler README.md** - Entenda melhor o projeto
4. **Ler DEVELOPMENT.md** - Se for desenvolver

---

## 🎓 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 🔐 Importante

⚠️ **Arquivo .env.local não deve ser commitado**  
⚠️ **Backend DEVE estar na porta 8080**  
⚠️ **CORS DEVE estar configurado no backend**  

---

## 🎉 Parabéns!

Você agora tem um sistema moderno de gerenciamento de estoque.

**Bom desenvolvimento! 🚀**

---

Dúvidas? Leia `INDEX.md` para navegar pela documentação!
