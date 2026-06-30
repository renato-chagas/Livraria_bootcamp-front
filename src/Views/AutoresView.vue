<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { Users, Plus, Trash } from '@lucide/vue'; 

import { useAutorStore } from '../stores/autorStore'; 

import Swal from 'sweetalert2';
import { toast } from 'vue-sonner'

import AutorModal from '../components/modal/AutorModal.vue';
import DefaultTable from '../components/defaultTable.vue';

// Stores
const autorStore = useAutorStore();
const { autores } = storeToRefs(autorStore);

const mostrarModal = ref(false);

// Colunas da Tabela
const colunasAutores = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'acoes', label: 'Ações', align: 'right' }
];

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
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Autores</h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Gerencie os escritores do catálogo</p>
      </div>
      <button @click="mostrarModal = true"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow flex items-center justify-center gap-2">
        <Plus class="w-4 h-4" /> Novo Autor
      </button>
    </header>

    <DefaultTable :colunas="colunasAutores" :itens="autores" mensagemVazia="Nenhum autor encontrado.">
      
      <template #empty-icon>
        <Users class="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
      </template>

      <template #id="{ item }">
        <span class="text-sm font-medium text-slate-500 dark:text-slate-400">#{{ item.id }}</span>
      </template>

      <template #nome="{ item }">
        <span class="text-sm font-bold text-slate-900 dark:text-slate-100">{{ item.nome }}</span>
      </template>

      <template #acoes="{ item }">
        <div class="flex justify-end">
          <button class="text-rose-600 hover:text-rose-800 dark:hover:text-rose-400 transition-colors" @click="excluirAutorClick(item.id)" title="Excluir">
            <Trash class="w-5 h-5" />
          </button>
        </div>
      </template>

    </DefaultTable>

    <AutorModal v-if="mostrarModal" @fechar="mostrarModal = false" />
  </div>
</template>