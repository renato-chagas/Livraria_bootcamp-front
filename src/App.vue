<script setup>
import { onMounted } from 'vue';
import { Toaster } from 'vue-sonner'

import { useLivroStore } from './stores/livroStore';
import { useAutorStore } from './stores/autorStore';
import { useCategoriaStore } from './stores/categoriaStore';

import Sidebar from './components/Sidebar.vue';

const store = useLivroStore();
const autorStore = useAutorStore();
const categoriaStore = useCategoriaStore();

onMounted(async () => {
  await store.buscarLivros();
  await autorStore.carregarAutores();
  await categoriaStore.carregarCategorias()
});
</script>

<template>
  <div class="flex w-full h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 ">
    
    <Sidebar />
    <Toaster
    position="top-right"
    rich-colors
    closeButton
    expand/>

    <main class="flex-1 overflow-y-auto p-8">
      <router-view />
    </main>
  </div>
</template>

<style>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>