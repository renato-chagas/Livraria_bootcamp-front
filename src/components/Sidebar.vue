<script setup>
import { BookOpen, Users, Tags } from '@lucide/vue';
</script>

<template>
  <aside class="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-10 flex-shrink-0">
    <div class="p-6">
      <h2 class="text-2xl font-bold text-white tracking-tight">Sabitiruc's</h2>
      <p class="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Gestão de Catálogo</p>
    </div>

    <nav class="flex-1 px-4 space-y-2 mt-4">
      <router-link 
        to="/livros" 
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium hover:bg-slate-800 hover:text-white"
        active-class="bg-indigo-600 text-white hover:bg-indigo-600"
      >
        <BookOpen class="w-5 h-5" /> Livros
      </router-link>

      <router-link 
        to="/autores" 
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium hover:bg-slate-800 hover:text-white"
        active-class="bg-indigo-600 text-white hover:bg-indigo-600"
      >
        <Users class="w-5 h-5" /> Autores
      </router-link>

      <router-link 
        to="/categorias" 
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium hover:bg-slate-800 hover:text-white"
        active-class="bg-indigo-600 text-white hover:bg-indigo-600"
      >
        <Tags class="w-5 h-5" /> Categorias
      </router-link>
    </nav>
  </aside>
</template>