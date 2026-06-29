import { createRouter, createWebHistory } from 'vue-router';
import LivrosView from '../views/LivrosView.vue';
import AutoresView from '../views/AutoresView.vue';
import CategoriasView from '../views/CategoriasView.vue';

const routes = [
  { path: '/', redirect: '/livros' },
  { path: '/livros', name: 'Livros', component: LivrosView },
  { path: '/autores', name: 'Autores', component: AutoresView },
  { path: '/categorias', name: 'Categorias', component: CategoriasView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;