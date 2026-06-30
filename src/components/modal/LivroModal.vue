<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useLivroStore } from '../../stores/livroStore';
import { useAutorStore } from '../../stores/autorStore';
import { useCategoriaStore } from '../../stores/categoriaStore';

import { X } from '@lucide/vue';
import { toast } from 'vue-sonner'

// Props e eventos emitidos

const emit = defineEmits(['fechar']);

// Props recebidos

const props = defineProps({
  itemParaEditar: {
    type: Object,
    default: null
  }
});

// Stores

const store = useLivroStore();
const autorStore = useAutorStore();
const categoriaStore = useCategoriaStore();

// Referências reativas para autores e categorias

const { categorias } = storeToRefs(categoriaStore);
const { autores } = storeToRefs(autorStore);

// Estado do formulário e mensagens de erro/carregamento

const erroMensagem = ref('');
const carregando = ref(false);

// Estado do formulário para o livro

const form = ref({
  titulo: '', 
  isbn: '', 
  preco: '', 
  quantidade_estoque: '', 
  autor_id: '', 
  categoria_id: ''
});

// Carregar autores e categorias ao montar o componente

onMounted(() => {
  if (props.itemParaEditar) {
    form.value = { ...props.itemParaEditar };
  }
});

// Função para enviar o formulário

const submit = async () => {
  erroMensagem.value = '';
  carregando.value = true;
  
  const payload = {
    ...form.value,
    preco: parseFloat(form.value.preco),
    quantidade_estoque: parseInt(form.value.quantidade_estoque, 10)
  };

  let res;
  if (props.itemParaEditar) {
    res = await store.atualizarLivro(props.itemParaEditar.id, payload);
  } else {
    res = await store.salvarLivro(payload);
  }
  
  if (res.sucesso) {
    emit('fechar');
    toast.success('Livro salvo com sucesso!');
  } else {
    erroMensagem.value = res.erro;
    toast.error(res.erro || 'Ocorreu um erro ao salvar o livro.');
  }
  
  carregando.value = false;
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-10 animate-fade-in">
    
    <div class="bg-white dark:bg-slate-800 m-10 rounded-2xl shadow-2xl w-full max-w-[700px] overflow-hidden flex flex-col border border-transparent dark:border-slate-700">
      
      <div class="flex justify-between items-start px-8 py-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
        <div>
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Adicionar Livro</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Preencha os detalhes do catálogo abaixo.</p>
        </div>
        <button @click="$emit('fechar')" class="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-all">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="submit" class="flex flex-col px-8 py-6 overflow-y-auto gap-6">
        
        <div v-if="erroMensagem" class="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-700 dark:text-rose-400 rounded-xl text-sm font-medium">
          {{ erroMensagem }}
        </div>
        
        <div class="flex flex-col sm:flex-row gap-5">
          <div class="flex-[2]">
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Título do Livro</label>
            <input v-model="form.titulo" type="text" required placeholder="Ex: O Senhor dos Anéis" 
                   class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500">
          </div>
          <div class="flex-[1]">
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">ISBN</label>
            <input v-model="form.isbn" type="text" required placeholder="978-..." 
                   class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500">
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-5">
          <div class="flex-1">
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Autor</label>
            <select v-model="form.autor_id" required 
                    class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-800 dark:text-slate-100 cursor-pointer">
              <option value="" disabled>Selecione o autor...</option>
              <option v-for="autor in autores" :key="autor.id" :value="autor.id">{{ autor.nome }}</option>
            </select>
          </div>
          <div class="flex-1">
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Categoria</label>
            <select v-model="form.categoria_id" required 
                    class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-800 dark:text-slate-100 cursor-pointer">
              <option value="" disabled>Selecione a categoria...</option>
              <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nome }}</option>
            </select>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-5">
          <div class="flex-1">
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Preço</label>
            <div class="relative flex items-center">
              <span class="absolute left-4 text-slate-400 dark:text-slate-500 font-medium text-sm">R$</span>
              <input v-model="form.preco" type="number" step="0.01" min="0.01" required placeholder="0,00" 
                     class="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500">
            </div>
          </div>
          <div class="flex-1">
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Estoque Inicial</label>
            <input v-model="form.quantidade_estoque" type="number" min="0" required placeholder="0 un" 
                   class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500">
          </div>
        </div>

        <div class="pt-6 mt-2 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
          <button type="button" @click="$emit('fechar')" 
                  class="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all shadow-sm">
            Cancelar
          </button>
          
          <button type="submit" :disabled="carregando" 
                  class="px-6 py-2.5 text-sm font-bold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2">
            <span v-if="carregando" class="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            {{ carregando ? 'Salvando...' : 'Salvar Livro' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>