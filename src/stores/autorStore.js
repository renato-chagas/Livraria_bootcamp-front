import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const useAutorStore = defineStore('autor', () => {
  const autores = ref([]);

  const carregarAutores = async () => {
    try {
      const res = await api.get('/autores');
      autores.value = res.data;
    } catch (error) {
      console.error('Erro ao carregar autores:', error);
    }
  };

  const salvarAutor = async (dadosAutor) => {
    try {
      await api.post('/autores', dadosAutor);
      await carregarAutores(); 
      return { sucesso: true };
    } catch (error) {
      console.error('Erro ao salvar autor:', error);
      return { 
        sucesso: false, 
        erro: error.response?.data?.erro || 'Erro ao salvar o autor.' 
      };
    }
  };

const excluirAutor = async (id) => {
  try {
    await api.delete(`/autores/${id}`);
    await carregarAutores();
    return { sucesso: true };
  } catch (error) {
    return { sucesso: false, erro: error.response?.data?.erro || 'Erro ao excluir autor.' };
  }
};

  return {
    autores,
    carregarAutores, salvarAutor, excluirAutor
  };
});