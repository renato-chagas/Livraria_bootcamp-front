<script setup>
import { ref, onMounted } from 'vue';
import { Moon, Sun } from '@lucide/vue';

// Estado do tema (claro ou escuro)

const isDark = ref(false);

// Verifica o tema armazenado no localStorage ao montar o componente

onMounted(() => {
  if (localStorage.getItem('tema') === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
});

// Função para alternar entre os modos claro e escuro

const alternarTema = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('tema', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('tema', 'light');
  }
};
</script>

<template>
  <button 
    @click="alternarTema" 
    class="flex items-center gap-3 w-full p-3 rounded-lg font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
  >
    <Sun v-if="isDark" class="w-5 h-5 text-amber-500" />
    <Moon v-else class="w-5 h-5 text-indigo-500" />
    
    <span>{{ isDark ? 'Modo Claro' : 'Modo Escuro' }}</span>
  </button>
</template>