# 📚 Livraria Sabitiruc's - Frontend

Aplicação web desenvolvida em Vue 3 para gerenciamento do catálogo da Livraria Sabitiruc's, consumindo a API REST do projeto.

## Tecnologias

- Vue 3
- Pinia
- Vue Router
- Axios
- Tailwind CSS v4
- Lucide
- SweetAlert2
- Vue Sonner

---

## Instalação

### 1. Clone o repositório

```bash
git clone <url-do-frontend>
cd frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` copiando o `.env.example`.

Exemplo:

```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Execute

```bash
npm run dev
```

Aplicação disponível em

```
http://localhost:5173
```

---

# ✨ Funcionalidades

## Obrigatórias

- ✅ Cadastro de livros
- ✅ Edição de livros
- ✅ Inativação de livros
- ✅ Exclusão de livros
- ✅ Cadastro de autores
- ✅ Cadastro de categorias
- ✅ Pesquisa por título e ISBN
- ✅ Filtro por autor
- ✅ Filtro por categoria
- ✅ Persistência dos dados em PostgreSQL
- ✅ Validações de negócio

## Funcionalidades Extras

- 🌙 Dark Mode
- 📊 Dashboard com métricas
- 🔍 Filtro por status (Ativos/Inativos/Todos)
- ♻️ Reativação de livros
- 🎨 Interface responsiva
- 🔔 Toasts e confirmações com SweetAlert

---

## 🚧 Funcionalidades Não Concluídas

O escopo principal focado nas regras de negócio de acervo foi entregue na totalidade. No entanto, a seguinte funcionalidade ficou fora desta primeira *release*:

* **Autenticação e Autorização (Login/JWT):** A implementação de um sistema de usuários e rotas privadas não foi concluída. Em um cenário de gestão de tempo, optou-se por priorizar a entrega perfeita do CRUD (com validações de integridade no banco, *Soft Delete* e interface avançada) ao invés de entregar um sistema de login feito às pressas que pudesse bloquear o acesso do avaliador ao sistema principal.

---

## Estrutura

```
src
├── api
├── components
├── router
├── services
├── stores
├── views
└── App.vue
```
