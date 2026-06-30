<script setup>
import { ref } from 'vue';
import { useCategoriaStore } from '../../stores/categoriaStore';

import { X } from '@lucide/vue'; 
import { toast } from 'vue-sonner'

// Props e eventos emitidos

const emit = defineEmits(['fechar']);

// Stores

const store = useCategoriaStore();

// Estado do formulário e mensagens de erro/carregamento

const form = ref({ nome: '' });
const erroMensagem = ref('');
const carregando = ref(false);

// Função para enviar o formulário

const submit = async () => {
  erroMensagem.value = '';
  carregando.value = true;

  const res = await store.salvarCategoria(form.value);
  
  if (res.sucesso) {
    emit('fechar');
    toast.success('Categoria salva com sucesso!');
  } else {
    erroMensagem.value = res.erro;
    toast.error('Erro ao salvar a categoria.');
  }
  
  carregando.value = false;
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col border border-transparent dark:border-slate-700">
      
      <div class="flex justify-between items-start px-8 py-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
        <div>
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Adicionar Categoria</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Cadastre um novo gênero literário no sistema.</p>
        </div>
        <button @click="$emit('fechar')" class="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-all">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="submit" class="flex flex-col px-8 py-6 overflow-y-auto gap-6">
        
        <div v-if="erroMensagem" class="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-700 dark:text-rose-400 rounded-xl text-sm font-medium">
          {{ erroMensagem }}
        </div>
        
        <div>
          <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Nome da Categoria</label>
          <input v-model="form.nome" type="text" required placeholder="Ex: Ficção Científica, Romance..." 
                 class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500">
        </div>

        <div class="pt-6 mt-2 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
          <button type="button" @click="$emit('fechar')" 
                  class="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all shadow-sm">
            Cancelar
          </button>
          
          <button type="submit" :disabled="carregando" 
                  class="px-6 py-2.5 text-sm font-bold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2">
            <span v-if="carregando" class="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            {{ carregando ? 'Salvando...' : 'Salvar Categoria' }}
          </button>
        </div>
      </form>
      
    </div>
  </div>
</template>