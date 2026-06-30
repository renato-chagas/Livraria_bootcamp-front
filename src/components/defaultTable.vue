<script setup>
import { BookOpen } from '@lucide/vue'; 

// Props recebidos

defineProps({
  colunas: {
    type: Array,
    required: true,
  },
  itens: {
    type: Array,
    required: true,
  },
  mensagemVazia: {
    type: String,
    default: 'Nenhum registro encontrado.'
  }
});
</script>

<template>
  <section class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-700 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-700">
            <th v-for="col in colunas" :key="col.key" 
                class="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                :class="col.align === 'right' ? 'text-right' : ''">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-700/50">
          
          <tr v-for="item in itens" :key="item.id" class="hover:bg-slate-50/80 dark:hover:bg-slate-700/50 transition-colors group">
            <td v-for="col in colunas" :key="col.key" class="px-6 py-4" :class="col.align === 'right' ? 'text-right space-x-3' : ''">
              
              <slot :name="col.key" :item="item">
                <span class="text-sm text-slate-600 dark:text-slate-300">
                  {{ item[col.key] }}
                </span>
              </slot>

            </td>
          </tr>

          <tr v-if="itens.length === 0">
            <td :colspan="colunas.length" class="px-6 py-12 text-center text-slate-500 dark:text-slate-400 text-sm">
              <div class="flex flex-col items-center justify-center">
                <slot name="empty-icon">
                  <BookOpen class="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
                </slot>
                <p>{{ mensagemVazia }}</p>
              </div>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </section>
</template>