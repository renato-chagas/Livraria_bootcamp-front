<script setup>
import { computed } from 'vue';
import { Book, CheckCircle, CircleDollarSign } from '@lucide/vue';

const props = defineProps({
    totalLivros: { type: Number, required: true },
    livrosAtivos: { type: Number, required: true },
    valorEmEstoque: { type: String, required: true }
});

// array dinâmico 

const cards = computed(() => [
    {
        titulo: 'Total no Acervo',
        valor: props.totalLivros,
        icone: Book,
        corFundo: 'bg-indigo-50',
        corIcone: 'text-indigo-600',
        textColor: 'text-indigo-600'
    },
    {
        titulo: 'Livros Ativos',
        valor: props.livrosAtivos,
        icone: CheckCircle,
        corFundo: 'bg-emerald-50',
        corIcone: 'text-emerald-600',
        textColor: 'text-amber-600'
    },
    {
        titulo: 'Valor em Estoque',
        valor: props.valorEmEstoque,
        icone: CircleDollarSign,
        corFundo: 'bg-amber-50',
        corIcone: 'text-amber-600',
        textColor: 'text-emerald-600'

    }
]);
</script>

<template>
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div v-for="(card, index) in cards" :key="index"
            class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md gap-4">
            <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-slate-500 mb-1 truncate">{{ card.titulo }}</p>
                <h3 :class="[
                    'text-xl sm:text-2xl font-bold truncate',
                    card.textColor
                ]" :title="card.valor">
                    {{ card.valor }}
                </h3>
            </div>

            <div :class="['p-3 rounded-lg shrink-0', card.corFundo, card.corIcone]">
                <component :is="card.icone" class="w-6 h-6" />
            </div>
        </div>

    </section>
</template>