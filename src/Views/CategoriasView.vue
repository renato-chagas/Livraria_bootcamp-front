<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCategoriaStore } from '../stores/categoriaStore';

import { Tags, Plus, SquarePen, Trash } from '@lucide/vue'; 
import { toast } from 'vue-sonner'
import Swal from 'sweetalert2';

import CategoriaModal from '../components/modal/CategoriaModal.vue';

//Stores

const store = useCategoriaStore();
const { categorias } = storeToRefs(store);

const mostrarModal = ref(false);

onMounted(async () => {
  await store.carregarCategorias();
});

// Função para excluir categoria com confirmação

const excluirCategoriaClick = async (categoriaId) => {
  const confirmacao =await Swal.fire({
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
</script>

<template>
  <div class="w-full mx-auto animate-fade-in">
    
    <header class="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 gap-4">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">Categorias</h1>
        <p class="text-slate-500 text-sm mt-1 font-medium">Gerencie os géneros literários disponíveis</p>
      </div>
      <button @click="mostrarModal = true"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow flex items-center justify-center gap-2">
        <Plus class="w-4 h-4" /> Nova Categoria
      </button>
    </header>

    <section class="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-200/60">
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-full">Nome do Género</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="categoria in categorias" :key="categoria.id" class="hover:bg-slate-50/80 transition-colors group">
              <td class="px-6 py-4 text-sm font-medium text-slate-500">#{{ categoria.id }}</td>
              <td class="px-6 py-4 text-sm font-bold text-slate-900">
                <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                  {{ categoria.nome }}
                </span>
              </td>
              <td class="px-6 py-4 text-right space-x-3 flex flex-row">
                <button class="text-rose-600 hover:text-rose-800" @click="excluirCategoriaClick(categoria.id)" title="Excluir">
                  <Trash class="w-5 h-5" />
                </button>
              </td>
            </tr>
            <tr v-if="categorias.length === 0">
              <td colspan="3" class="px-6 py-12 text-center text-slate-500 text-sm">
                <div class="flex flex-col items-center justify-center">
                  <Tags class="w-10 h-10 text-slate-300 mb-3" />
                  <p>Nenhuma categoria encontrada.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <CategoriaModal v-if="mostrarModal" @fechar="mostrarModal = false" />
  </div>
</template>