<script setup>
import { onMounted } from 'vue';

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
  <div class="flex h-screen w-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
    
    <Sidebar />

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