<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { Users, Plus, SquarePen, Trash } from '@lucide/vue';

import { useAutorStore } from '../stores/autorStore'; 

import Swal from 'sweetalert2';
import { toast } from 'vue-sonner'

import AutorModal from '../components/modal/AutorModal.vue';

// Stores

const autorStore = useAutorStore();
const { autores } = storeToRefs(autorStore);

const mostrarModal = ref(false);

// Função para Excluir Autor com confirmação

const excluirAutorClick = async (autorId) => {
  const confirmacao = await Swal.fire({
    title: 'Excluir autor?',
    text: 'Tem certeza de que deseja remover este autor do catálogo?',
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
  const res = await autorStore.excluirAutor(autorId);
  if (res.sucesso) {
    toast.success('Autor excluído com sucesso!');
  } else {
    toast.error(res.erro);
  }
};
</script>

<template>
  <div class="w-full mx-auto animate-fade-in">
    
    <header class="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 gap-4">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">Autores</h1>
        <p class="text-slate-500 text-sm mt-1 font-medium">Gerencie os escritores do catálogo</p>
      </div>
      <button @click="mostrarModal = true"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow flex items-center justify-center gap-2">
        <Plus class="w-4 h-4" /> Novo Autor
      </button>
    </header>

    <section class="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-200/60">
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-full">Nome</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="autor in autores" :key="autor.id" class="hover:bg-slate-50/80 ">
              <td class="px-6 py-4 text-sm font-medium text-slate-500">#{{ autor.id }}</td>
              <td class="px-6 py-4 text-sm font-bold text-slate-900">{{ autor.nome }}</td>
              <td class="flex flex-row px-6 py-4  space-x-3">

                <button class="text-rose-600 hover:text-rose-900 pointer-fine:" @click="excluirAutorClick(autor.id)" title="Excluir">
                  <Trash class="w-5 h-5" />
                </button>
              </td>
            </tr>
            <tr v-if="autores.length === 0">
              <td colspan="3" class="px-6 py-12 text-center text-slate-500 text-sm">
                <div class="flex flex-col items-center justify-center">
                  <Users class="w-10 h-10 text-slate-300 mb-3" />
                  <p>Nenhum autor encontrado.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <AutorModal v-if="mostrarModal" @fechar="mostrarModal = false" />
  </div>
</template>