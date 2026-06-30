import { defineStore } from "pinia";
import { ref } from "vue";
import categoriaService from "../services/categoriaService";

export const useCategoriaStore = defineStore("categoria", () => {
  const categorias = ref([]);

  const carregarCategorias = async () => {
    try {
      const res = await categoriaService.listar();
      categorias.value = res.data;
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  const salvarCategoria = async (dadosCategoria) => {
    try {
      await categoriaService.salvar(dadosCategoria);
      await carregarCategorias();
      return { sucesso: true };
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      return {
        sucesso: false,
        erro: error.response?.data?.erro || "Erro ao salvar a categoria.",
      };
    }
  };

  const excluirCategoria = async (id) => {
    try {
      await categoriaService.excluir(id);
      await carregarCategorias();
      return { sucesso: true };
    } catch (error) {
      return {
        sucesso: false,
        erro: error.response?.data?.erro || "Erro ao excluir categoria.",
      };
    }
  };

  return {
    categorias,
    carregarCategorias,
    salvarCategoria,
    excluirCategoria,
  };
});