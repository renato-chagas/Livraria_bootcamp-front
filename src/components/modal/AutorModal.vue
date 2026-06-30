<script setup>
import { ref } from 'vue';
import { useAutorStore } from '../../stores/autorStore';

import { X } from '@lucide/vue'; 
import { toast } from 'vue-sonner'

const emit = defineEmits(['fechar']);

const store = useAutorStore();

const form = ref({ nome: '' });
const erroMensagem = ref('');
const carregando = ref(false);

const submit = async () => {
  erroMensagem.value = '';
  carregando.value = true;

  const res = await store.salvarAutor(form.value);
  
  if (res.sucesso) {
    emit('fechar');
    toast.success('Autor salvo com sucesso!');
  } else {
    erroMensagem.value = res.erro;
    toast.error('Erro ao salvar o autor.');
  }
  
  carregando.value = false;
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
      
      <div class="flex justify-between items-start px-8 py-6 border-b border-slate-100 bg-slate-50/50">
        <div>
          <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Adicionar Autor</h2>
          <p class="text-xs text-slate-500 mt-1 font-medium">Cadastre um novo autor no sistema.</p>
        </div>
        <button @click="$emit('fechar')" class="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-all">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="submit" class="flex flex-col px-8 py-6 overflow-y-auto gap-6">
        <div v-if="erroMensagem" class="p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-sm font-medium">
          {{ erroMensagem }}
        </div>
        
        <div>
          <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Nome do Autor</label>
          <input v-model="form.nome" type="text" required placeholder="Ex: J.R.R. Tolkien" 
                 class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-800 placeholder-slate-400">
        </div>

        <div class="pt-6 mt-2 border-t border-slate-100 flex justify-end gap-3">
          <button type="button" @click="$emit('fechar')" 
                  class="px-6 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all shadow-sm">
            Cancelar
          </button>
          
          <button type="submit" :disabled="carregando" 
                  class="px-6 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-indigo-600 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2">
            <span v-if="carregando" class="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            {{ carregando ? 'Salvando...' : 'Salvar Autor' }}
          </button>
        </div>
      </form>
      
    </div>
  </div>
</template>