<script setup>
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { BookOpen, SquarePen, Trash, Plus, Search, Archive } from '@lucide/vue';
import { toast } from 'vue-sonner'
import Swal from 'sweetalert2';


import LivroModal from '../components/modal/LivroModal.vue';
import DashBoard from '../components/dashBoard.vue';
import DefaultTable from '../components/defaultTable.vue';

import { useLivroStore } from '../stores/livroStore';
import { useAutorStore } from '../stores/autorStore';
import { useCategoriaStore } from '../stores/categoriaStore';

// Stores

const livroStore = useLivroStore();
const autorStore = useAutorStore();
const categoriaStore = useCategoriaStore();

// Estado do modal e livro selecionado

const { livros, filtros } = storeToRefs(livroStore);
const { buscarLivros, excluirLivro, inativarLivro, reativarLivro } = livroStore;
const { autores } = storeToRefs(autorStore);
const { categorias } = storeToRefs(categoriaStore);

const mostrarModal = ref(false);
const livroSelecionado = ref(null);

// Edição, Cadastro de Livros e Fechamento do Modal

const abrirCadastro = () => {
  livroSelecionado.value = null;
  mostrarModal.value = true;
};

const abrirEdicao = (livro) => {
  livroSelecionado.value = livro;
  mostrarModal.value = true;
};

const fecharModal = () => {
  mostrarModal.value = false;
  livroSelecionado.value = null;
};

// Deletar, Inativar e Reativar Livros

const deletar = async (id) => {
  const result = await Swal.fire({
    title: 'Excluir livro?',
    text: 'Esta ação não poderá ser desfeita.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#64748b',
    reverseButtons: true,
    focusCancel: true,
  });

  if (!result.isConfirmed) return;

  const res = await excluirLivro(id);

  if (res.sucesso) {
    toast.success('Livro removido com sucesso!');
  } else {
    toast.error(res.erro);
  }
};

const inativar = async (id) => {
  const result = await Swal.fire({
    title: 'Inativar livro?',
    text: 'O livro será inativado e não aparecerá no catálogo.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Inativar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#64748b',
    reverseButtons: true,
    focusCancel: true,
  });

  if (!result.isConfirmed) return;

  const res = await inativarLivro(id);

  if (res.sucesso) {
    toast.success('Livro inativado com sucesso!');
  } else {
    toast.error(res.erro);
  }
};

const reativar = async (id) => {
  const result = await Swal.fire({
    title: 'Reativar livro?',
    text: 'O livro será reativado e aparecerá no catálogo.',
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Reativar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#10b981',
    cancelButtonColor: '#64748b',
    reverseButtons: true,
    focusCancel: true,
  });

  if (!result.isConfirmed) return;

  const res = await reativarLivro(id);

  if (res.sucesso) {
    toast.success('Livro reativado com sucesso!');
  } else {
    toast.error(res.erro);
  }
};

// Dasboard

const totalLivros = computed(() => livros.value.length);

const livrosAtivos = computed(() => livros.value.filter(livro => livro.ativo).length);

const valorEmEstoque = computed(() => {
  const total = livros.value.reduce((acc, livro) => {
    if (livro.ativo) {
      return acc + (Number(livro.preco) * Number(livro.quantidade_estoque));
    }
    return acc;
  }, 0);
  
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);
});

// Colunas Tabela

const colunasLivros = [
  { key: 'titulo', label: 'Título & ISBN' },
  { key: 'autor', label: 'Autor' },
  { key: 'categoria', label: 'Categoria' },
  { key: 'preco', label: 'Preço' },
  { key: 'estoque', label: 'Estoque' },
  { key: 'acoes', label: 'Ações', align: 'right' }
];

</script>

<template>
  <div class="mx-auto animate-fade-in">

    <DashBoard :totalLivros="totalLivros" :livrosAtivos="livrosAtivos" :valorEmEstoque="valorEmEstoque" />

    <header class="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 gap-4 ">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">Livros</h1>
        <p class="text-slate-500 text-sm mt-1 font-medium">Gerencie o acervo da livraria</p>
      </div>
      <button @click="abrirCadastro"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow flex items-center justify-center gap-2">
        <Plus class="w-4 h-4" /> Novo Livro
      </button>
    </header>

    <section class="mb-8 grid grid-cols-1 md:grid-cols-12 gap-4">
      <div class="md:col-span-6 relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="w-4 h-4 text-slate-400" />
        </div>
        <input v-model="filtros.pesquisa" @input="buscarLivros" type="text" placeholder="Buscar por Título ou ISBN..."
          class="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm">
      </div>

      <div class="md:col-span-3">
        <select v-model="filtros.autor_id" @change="buscarLivros"
          class="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm cursor-pointer">
          <option value="">Todos os Autores</option>
          <option v-for="autor in autores" :key="autor.id" :value="autor.id">{{ autor.nome }}</option>
        </select>
      </div>

      <div class="md:col-span-3">
        <select v-model="filtros.categoria_id" @change="buscarLivros"
          class="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm cursor-pointer">
          <option value="">Todas as Categorias</option>
          <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nome }}
          </option>
        </select>
      </div>

      <div class="md:col-span-2">
        <label class="block text-xs font-bold text-slate-400 uppercase mb-1 ml-0.5">Status</label>
        <select v-model="filtros.status" @change="buscarLivros"
          class="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm cursor-pointer">
          <option value="ativo">Apenas Ativos</option>
          <option value="inativo">Apenas Inativos</option>
          <option value="todos">Todos os Livros</option>
        </select>
      </div>
    </section>

    <DefaultTable :colunas="colunasLivros" :itens="livros" mensagemVazia="Nenhum livro encontrado no catálogo.">
      
      <template #empty-icon>
        <BookOpen class="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
      </template>

      <template #titulo="{ item }">
        <div class="font-medium text-slate-900 dark:text-slate-100">{{ item.titulo }}</div>
        <div class="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{{ item.isbn }}</div>
      </template>

      <template #categoria="{ item }">
        <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
          {{ item.categoria }}
        </span>
      </template>

      <template #preco="{ item }">
        <span class="text-sm font-medium text-slate-900 dark:text-slate-100">R$ {{ item.preco }}</span>
      </template>

      <template #estoque="{ item }">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-500/20">
          {{ item.quantidade_estoque }} un
        </span>
      </template>

      <template #acoes="{ item }">
        <div class="flex justify-end gap-3">
          <button @click="abrirEdicao(item)" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors" title="Editar">
            <SquarePen class="w-5 h-5" />
          </button>
          
          <button @click="deletar(item.id)" class="text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 transition-colors" title="Excluir">
            <Trash class="w-5 h-5" />
          </button>
          
          <button @click="inativar(item.id)" :disabled="!item.ativo" :class="[
            'transition-colors',
            !item.ativo ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed' : 'text-amber-600 dark:text-amber-500 hover:text-amber-800 dark:hover:text-amber-400'
          ]" title="Inativar">
            <Archive class="w-5 h-5" />
          </button>
          
          <button @click="reativar(item.id)" :disabled="item.ativo" :class="[
            'transition-colors',
            item.ativo ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed' : 'text-emerald-600 dark:text-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-400'
          ]" title="Reativar">
            <Plus class="w-5 h-5" />
          </button>
        </div>
      </template>
      
    </DefaultTable>

    <LivroModal v-if="mostrarModal" :itemParaEditar="livroSelecionado" @fechar="fecharModal" />
  </div>
</template>