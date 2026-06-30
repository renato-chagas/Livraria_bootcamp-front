import { defineStore } from 'pinia';
import { ref } from 'vue';
import autorService from '../services/autorService';

export const useAutorStore = defineStore('autor', () => {
  const autores = ref([]);

  const carregarAutores = async () => {
    try {
      const res = await autorService.listar();
      autores.value = res.data;
    } catch (error) {
      console.error('Erro ao carregar autores:', error);
    }
  };

  const salvarAutor = async (dadosAutor) => {
    try {
      await autorService.salvar(dadosAutor);
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
      await autorService.excluir(id);
      await carregarAutores();
      return { sucesso: true };
    } catch (error) {
      return { 
        sucesso: false, 
        erro: error.response?.data?.erro || 'Erro ao excluir autor.' 
      };
    }
  };

  return {
    autores,
    carregarAutores, 
    salvarAutor, 
    excluirAutor
  };
});