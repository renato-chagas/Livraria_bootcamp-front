<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCategoriaStore } from '../stores/categoriaStore';

import { Tags, Plus, SquarePen, Trash } from '@lucide/vue';
import { toast } from 'vue-sonner'
import Swal from 'sweetalert2';

import CategoriaModal from '../components/modal/CategoriaModal.vue';
import DefaultTable from '../components/defaultTable.vue';

//Stores

const store = useCategoriaStore();
const { categorias } = storeToRefs(store);

// Estado para controlar a visibilidade do modal de categoria

const mostrarModal = ref(false);

// Carrega as categorias ao montar o componente

onMounted(async () => {
  await store.carregarCategorias();
});

// Função para excluir categoria com confirmação

const excluirCategoriaClick = async (categoriaId) => {
  const confirmacao = await Swal.fire({
    title: 'Excluir categoria?',
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
  if (!confirmacao.isConfirmed) return;
  const res = await store.excluirCategoria(categoriaId);
  if (res.sucesso) {
    toast.success('Categoria excluída com sucesso!');
  } else {
    toast.error(res.erro);
  }
};

// Coluna Tabela

const colunasCategorias = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome do Gênero' },
  { key: 'acoes', label: 'Ações', align: 'right' }
];

</script>

<template>
  <div class="w-full mx-auto animate-fade-in">

    <header class="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 gap-4">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Categorias</h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Gerencie os gêneros literários
          disponíveis</p>
      </div>
      <button @click="mostrarModal = true"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow flex items-center justify-center gap-2">
        <Plus class="w-4 h-4" /> Nova Categoria
      </button>
    </header>

    <DefaultTable :colunas="colunasCategorias" :itens="categorias" mensagemVazia="Nenhuma categoria encontrada.">

      <template #empty-icon>
        <Tags class="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
      </template>

      <template #id="{ item }">
        <span class="text-sm font-medium text-slate-500 dark:text-slate-400">#{{ item.id }}</span>
      </template>

      <template #nome="{ item }">
        <span
          class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
          {{ item.nome }}
        </span>
      </template>

      <template #acoes="{ item }">
        <div class="flex justify-end">
          <button class="text-rose-600 hover:text-rose-800 dark:hover:text-rose-400 transition-colors"
            @click="excluirCategoriaClick(item.id)" title="Excluir">
            <Trash class="w-5 h-5" />
          </button>
        </div>
      </template>

    </DefaultTable>

    <CategoriaModal v-if="mostrarModal" @fechar="mostrarModal = false" />
  </div>
</template>