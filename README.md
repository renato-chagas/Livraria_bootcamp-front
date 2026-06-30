# 📚 Livraria Sabitiruc's - Frontend

Frontend da aplicação de gerenciamento de livros desenvolvido em **Vue 3**, responsável pela interface de cadastro, consulta, edição e remoção de livros.

## 🚀 Tecnologias

* Vue 3
* JavaScript
* Vite
* Vue Router
* Axios

## ✨ Funcionalidades

* Listagem de livros
* Cadastro de livros
* Edição de livros
* Remoção de livros
* Pesquisa por título e ISBN
* Filtro por autor
* Filtro por categoria
* Validação dos campos
* Interface responsiva

## 📋 Requisitos

* Node.js 20+
* npm

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

## ▶️ Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
cd frontend
```

Instale as dependências:

```bash
npm install
```

## 💻 Executando

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

## 📦 Build para produção

```bash
npm run build
```

## 📁 Estrutura

```text
src/
├── assets/
├── components/
├── router/
├── views/
├── App.vue
└── main.js
```

## 🔗 Comunicação com a API

O frontend consome a API REST desenvolvida no projeto backend por meio do Axios. A URL da API pode ser configurada através da variável `VITE_API_URL`.

## 👨‍💻 Autor

**Renato Chagas de Moraes**
