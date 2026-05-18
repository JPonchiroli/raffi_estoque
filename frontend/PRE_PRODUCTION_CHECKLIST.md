# ✅ Checklist de Pré-Produção

Este documento descreve o que deve ser verificado antes de usar o projeto em produção.

## 🔍 Verificações Técnicas

### Configuração
- [ ] `.env.local` está configurado com `BACKEND_URL` correto
- [ ] Backend Java está rodando na porta 8080
- [ ] Todas as dependências foram instaladas (`npm install`)
- [ ] Não há erros de TypeScript (`npm run build`)

### API
- [ ] Todos os endpoints do backend respondendo
- [ ] CORS configurado no backend
- [ ] Endpoints de CRUD funcionando (GET, POST, PUT, DELETE)
- [ ] Erro 404 para endpoints inexistentes
- [ ] Erro 500 sendo tratado corretamente

### Funcionalidades Core
- [ ] Dashboard carregando com ações rápidas
- [ ] Navegação entre todas as páginas funcionando
- [ ] Mobile menu respondendo corretamente

### Clientes
- [ ] Cadastro de cliente criando registro
- [ ] Busca de CEP preenchendo endereço automaticamente
- [ ] Listagem exibindo todos os clientes
- [ ] Busca na listagem filtrando clientes
- [ ] Paginação funcionando corretamente
- [ ] Editar cliente atualizando dados
- [ ] Deletar cliente removendo registro

### Fornecedores
- [ ] Cadastro de fornecedor criando registro
- [ ] Busca de CEP preenchendo endereço automaticamente
- [ ] Listagem exibindo todos os fornecedores
- [ ] Busca na listagem filtrando fornecedores
- [ ] Paginação funcionando corretamente
- [ ] Editar fornecedor atualizando dados
- [ ] Deletar fornecedor removendo registro

### Produtos
- [ ] Cadastro de produto criando registro
- [ ] Valor de venda calculando automaticamente
- [ ] Código de barras sendo registrado
- [ ] Autocomplete de fornecedor funcionando
- [ ] Listagem exibindo todos os produtos
- [ ] Busca na listagem filtrando produtos
- [ ] Editar produto atualizando dados
- [ ] Deletar produto removendo registro

### Vendas
- [ ] Cadastro de venda criando registro
- [ ] Autocomplete de cliente funcionando
- [ ] Autocomplete de produto funcionando
- [ ] Adicionar múltiplos itens na venda
- [ ] Remover itens da venda
- [ ] Listagem exibindo todas as vendas
- [ ] Visualizar detalhes de venda completos
- [ ] Deletar venda removendo registro

### Notificações
- [ ] Toast de sucesso aparecendo
- [ ] Toast de erro aparecendo
- [ ] Toast desaparecendo após tempo
- [ ] Posicionamento correto no canto direito

### Componentes
- [ ] FormInput validando campos obrigatórios
- [ ] AutocompleteInput mostrando opções
- [ ] DataTable paginando corretamente
- [ ] DataTable buscando corretamente
- [ ] DataTable botões de ação funcionando
- [ ] Header navegando para páginas corretas
- [ ] Footer exibindo informações

### Responsividade
- [ ] Layout mobile (< 768px) empilhando cards
- [ ] Layout tablet (768px - 1024px) com 2 colunas
- [ ] Layout desktop (> 1024px) com 3+ colunas
- [ ] Menu mobile abrindo e fechando
- [ ] Tabelas rolando horizontalmente em mobile
- [ ] Botões clicáveis em mobile
- [ ] Inputs acessíveis em mobile

### Performance
- [ ] Página inicial carregando em < 2s
- [ ] Listagens carregando em < 3s
- [ ] Busca respondendo em < 1s
- [ ] Sem erros no console
- [ ] Sem warnings de React

### Segurança
- [ ] HTTPS configurado em produção
- [ ] Variáveis sensíveis em environment
- [ ] Tokens não expostos no código
- [ ] CORS restrito a domínios confiáveis
- [ ] Validação de inputs (frontend e backend)

## 📱 Testes de Usabilidade

### Fluxo de Cadastro de Cliente
1. Abrir página de cadastro
2. Preencher nome, email, telefone
3. Digitar CEP válido e pressionar Tab/Enter
4. Verificar se endereço foi preenchido
5. Preencher número e bairro
6. Clicar em "Salvar Cliente"
7. Verificar se toast de sucesso apareceu
8. Verificar se foi redirecionado para listagem
9. Verificar se cliente aparece na listagem

### Fluxo de Cadastro de Produto
1. Abrir página de cadastro
2. Preencher nome e descrição
3. Escanear código de barras ou digitar
4. Preencher valor de custo
5. Preencher porcentagem de lucro
6. Verificar se valor de venda calculou automaticamente
7. Buscar fornecedor por autocomplete
8. Clicar em "Salvar Produto"
9. Verificar se produto aparece na listagem

### Fluxo de Cadastro de Venda
1. Abrir página de cadastro
2. Buscar cliente por autocomplete
3. Selecionar cliente
4. Buscar produto por autocomplete
5. Digitar quantidade e preço
6. Clicar em "+ Adicionar Item"
7. Adicionar mais itens
8. Remover um item
9. Clicar em "Salvar Venda"
10. Visualizar detalhes da venda

### Fluxo de Edição
1. Abrir listagem
2. Clicar em "Editar"
3. Modificar um campo
4. Clicar em "Salvar"
5. Verificar se mudança foi aplicada

### Fluxo de Deleção
1. Abrir listagem
2. Clicar em "Deletar"
3. Confirmar na caixa de diálogo
4. Verificar se registro foi removido

## 🌐 Testes em Diferentes Navegadores

- [ ] Chrome (Windows/Mac/Linux)
- [ ] Firefox (Windows/Mac/Linux)
- [ ] Safari (Mac/iOS)
- [ ] Edge (Windows)
- [ ] Mobile Chrome
- [ ] Mobile Safari

## 🐳 Testes com Docker

- [ ] Build da imagem sem erros
- [ ] Container iniciando sem erros
- [ ] Frontend acessível em http://localhost:3000
- [ ] Frontend conectando corretamente ao backend
- [ ] Funcionalidades CRUD funcionando
- [ ] Remover container sem deixar volumes órfãos

## 📊 Testes de Carga

- [ ] Sistema com 100+ clientes
- [ ] Sistema com 500+ produtos
- [ ] Sistema com 1000+ vendas
- [ ] Listagens carregando sem lag
- [ ] Busca mantendo performance

## 🔧 Testes de Erro

### Cenários de Erro
- [ ] Backend indisponível → Mostrar erro amigável
- [ ] Conexão perdida → Mostrar erro de rede
- [ ] Campo obrigatório vazio → Validar no frontend
- [ ] Formato inválido → Mostrar mensagem de erro
- [ ] Recurso não encontrado → Mostrar 404

### Recuperação de Erro
- [ ] Usuário consegue tentar novamente
- [ ] Usuário não perde dados preenchidos
- [ ] Mensagens de erro são claras
- [ ] Erros aparecem em português

## 📝 Testes de Dados

### Dados de Teste Recomendados

**Clientes:**
- Cliente com endereço completo
- Cliente com complemento (apto, sala)
- Cliente com especial characters (é, ã, ç)
- Cliente sem alguns campos opcionais

**Produtos:**
- Produto com margem de lucro de 50%
- Produto com código de barras válido
- Produto com descrição longa
- Produto com valor de custo com decimais

**Vendas:**
- Venda com 1 item
- Venda com 10+ itens
- Venda com valores altos (R$ 10.000+)
- Venda com datas antigas

## 🚀 Deploy Checklist

### Antes de Fazer Deploy
- [ ] Todos os testes passando
- [ ] Sem console errors
- [ ] Sem warnings de React
- [ ] Build succeeds sem warnings
- [ ] `.env.prod` configurado
- [ ] Backend URL atualizado
- [ ] HTTPS habilitado
- [ ] Certificado SSL válido

### Após Deploy
- [ ] Site acessível via URL
- [ ] Todas as funcionalidades funcionando
- [ ] Logs sem erros
- [ ] Performance aceitável
- [ ] SEO configurado (se necessário)
- [ ] Backup configurado

## 📞 Contatos de Suporte

### Em Caso de Problemas
1. Verificar logs do backend
2. Verificar logs do frontend (DevTools)
3. Verificar conexão de rede
4. Verificar variáveis de ambiente
5. Revisar documentação em `MIGRATION.md`
6. Consultar `DEVELOPMENT.md` para troubleshooting

## 📋 Documentação

- [ ] README.md revisado e atualizado
- [ ] MIGRATION.md revisado
- [ ] DEVELOPMENT.md revisado
- [ ] EXTENSION.md revisado
- [ ] Código comentado onde necessário
- [ ] APIs documentadas
- [ ] Componentes documentados

## 🎓 Treinamento da Equipe

- [ ] Equipe entende a arquitetura
- [ ] Equipe consegue adicionar novas funcionalidades
- [ ] Equipe consegue debugar problemas
- [ ] Equipe conhece padrões do projeto
- [ ] Documentação foi revisada por pelo menos 2 pessoas

## 📊 Métricas de Qualidade

- [ ] Coverage de testes > 80% (recomendado)
- [ ] Lighthouse score > 80 (recomendado)
- [ ] Tempo de build < 30s
- [ ] Bundle size < 500KB (gzipped)
- [ ] Sem JavaScript errors
- [ ] Sem TypeScript errors

## ✨ Extras (Opcional)

- [ ] Implementar autenticação
- [ ] Implementar dark mode
- [ ] Implementar temas customizáveis
- [ ] Implementar export para Excel/PDF
- [ ] Implementar relatórios
- [ ] Implementar webhooks
- [ ] Implementar busca avançada
- [ ] Implementar filtros salvos

## 📝 Notas e Observações

```
Escreva aqui qualquer nota importante ou observação específica do seu ambiente
```

## 🎉 Sign-off

- [ ] Desenvolvedor: _________________________ Data: _______
- [ ] QA: _________________________ Data: _______
- [ ] Gerente: _________________________ Data: _______
- [ ] Ops: _________________________ Data: _______

---

**Projeto aprovado para produção! ✅**

Data de deploy planejado: _______________
Versão: 1.0.0
