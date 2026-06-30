<script setup>
import { ref } from "vue";
import { BookOpen, Users, Tags, Menu, X } from "@lucide/vue";

import DarkModeButton from "./darkModeButton.vue";

const menuAberto = ref(false);
</script>

<template>
  <div>
    <button @click="menuAberto = true"
      class="fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-900 text-white md:hidden opacity-70">
      <Menu class="w-6 h-6" />
    </button>

    <div v-if="menuAberto" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
      @click="menuAberto = false"></div>

    <aside :class="[
      'fixed top-0 left-0 h-screen w-64 bg-slate-900 dark:bg-slate-950 dark:border-r dark:border-slate-800 text-slate-300 flex flex-col shadow-xl z-50 transform transition-transform duration-300 ease-in-out',
      menuAberto ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0 md:static'
    ]">
      <div class="flex justify-between items-center p-6">
        <div>
          <h2 class="text-2xl font-bold text-white tracking-tight">
            Sabitiruc's
          </h2>

          <p class="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
            Gestão de Catálogo
          </p>
        </div>

        <button @click="menuAberto = true"
          class="fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white md:hidden opacity-70">
          <X class="w-6 h-6" />
        </button>
      </div>

      <nav class="flex-1 px-4 space-y-2 mt-4">
        <router-link to="/livros" @click="menuAberto = false"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white"
          active-class="bg-indigo-600 text-white">
          <BookOpen class="w-5 h-5" /> Livros
        </router-link>

        <router-link to="/autores" @click="menuAberto = false"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white"
          active-class="bg-indigo-600 text-white">
          <Users class="w-5 h-5" /> Autores
        </router-link>

        <router-link to="/categorias" @click="menuAberto = false"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white"
          active-class="bg-indigo-600 text-white">
          <Tags class="w-5 h-5" /> Categorias
        </router-link>
      </nav>

      <div class="p-4 mt-auto border-t border-slate-800">
        <DarkModeButton />
      </div>

    </aside>
  </div>
</template>