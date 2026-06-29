<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { BookOpen, SquarePen, Trash, Plus, Search, Archive } from '@lucide/vue';

import LivroModal from '../components/modal/LivroModal.vue';
import { useLivroStore } from '../stores/livroStore';
import { useAutorStore } from '../stores/autorStore';
import { useCategoriaStore } from '../stores/categoriaStore';

const livroStore = useLivroStore();
const autorStore = useAutorStore();
const categoriaStore = useCategoriaStore();

const { livros, filtros } = storeToRefs(livroStore);
const { buscarLivros, excluirLivro, inativarLivro, reativarLivro } = livroStore;
const { autores } = storeToRefs(autorStore);
const { categorias } = storeToRefs(categoriaStore);

const mostrarModal = ref(false);
const livroSelecionado = ref(null);


const abrirCadastro = () => {
  livroSelecionado.value = null;
  mostrarModal.value = true;
};

const abrirEdicao = (livro) => {
  livroSelecionado.value = livro;
  mostrarModal.value = true;
};

const deletar = async (id) => {
  if (window.confirm('Tem certeza de que deseja remover este livro do acervo?')) {
    await excluirLivro(id);
  }
};

const inativar = async (id) => {
  if (window.confirm('Tem certeza de que deseja inativar este livro?')) {
    await inativarLivro(id);
  }
};

const reativar = async (id) => {
  if (window.confirm('Tem certeza de que deseja reativar este livro?')) {
    await reativarLivro(id);
  }
};

const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
};

</script>

<template>
  <div class="w-full mx-auto animate-fade-in">
    <header class="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 gap-4">
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
          class="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm">
      </div>

      <div class="md:col-span-3">
        <select v-model="filtros.autor_id" @change="buscarLivros"
          class="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm cursor-pointer">
          <option value="">Todos os Autores</option>
          <option v-for="autor in autores" :key="autor.id" :value="autor.id">{{ autor.nome }}</option>
        </select>
      </div>

      <div class="md:col-span-3">
        <select v-model="filtros.categoria_id" @change="buscarLivros"
          class="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm cursor-pointer">
          <option value="">Todas as Categorias</option>
          <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nome }}
          </option>
        </select>
      </div>

      <div class="md:col-span-2">
        <label class="block text-xs font-bold text-slate-400 uppercase mb-1 ml-0.5">Status</label>
        <select v-model="filtros.status" @change="buscarLivros"
          class="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm cursor-pointer">
          <option value="ativo">Apenas Ativos</option>
          <option value="inativo">Apenas Inativos</option>
          <option value="todos">Todos os Livros</option>
        </select>
      </div>
    </section>

    <section class="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-200/60">
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Título & ISBN</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Autor</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Categoria</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Preço</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Estoque</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="livro in livros" :key="livro.id" class="hover:bg-slate-50/80 transition-colors group">
              <td class="px-6 py-4">
                <div class="font-medium text-slate-900">{{ livro.titulo }}</div>
                <div class="text-slate-500 text-xs mt-0.5">{{ livro.isbn }}</div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">{{ livro.autor }}</td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">{{
                    livro.categoria }}</span>
              </td>
              <td class="px-6 py-4 text-sm font-medium text-slate-900">{{ formatarMoeda(livro.preco) }}</td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">{{
                    livro.quantidade_estoque }} un</span>
              </td>
              <td class="px-6 py-4 text-right space-x-3">
                <button @click="abrirEdicao(livro)" class="text-indigo-600 hover:text-indigo-800 transition-colors"
                  title="Editar">
                  <SquarePen class="w-5 h-5" />
                </button>
                <button @click="deletar(livro.id)" class="text-rose-600 hover:text-rose-800 transition-colors"
                  title="Excluir">
                  <Trash class="w-5 h-5" />
                </button>
                <button @click="inativar(livro.id)" class="text-amber-600 hover:text-amber-800 transition-colors"
                  title="Inativar">
                  <Archive class="w-5 h-5" />
                </button>
                <button @click="reativar(livro.id)" class="text-emerald-600 hover:text-emerald-800 transition-colors"
                  title="Reativar">
                  <Plus class="w-5 h-5" />
                </button>
              </td>
            </tr>
            <tr v-if="livros.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-slate-500 text-sm">
                <div class="flex flex-col items-center justify-center">
                  <BookOpen class="w-10 h-10 text-slate-300 mb-3" />
                  <p>Nenhum livro encontrado.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <LivroModal v-if="mostrarModal" :itemParaEditar="livroSelecionado" @fechar="mostrarModal = false" />
  </div>
</template>