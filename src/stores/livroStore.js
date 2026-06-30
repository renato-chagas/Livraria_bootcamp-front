import { defineStore } from "pinia";
import { ref } from "vue";
import livroService from "../services/livroService";

export const useLivroStore = defineStore("livro", () => {
  const livros = ref([]);

  const filtros = ref({
    pesquisa: "",
    autor_id: "",
    categoria_id: "",
    status: "ativo",
  });

  const buscarLivros = async () => {
    try {
      const params = {};
      if (filtros.value.pesquisa) params.pesquisa = filtros.value.pesquisa;
      if (filtros.value.autor_id) params.autor_id = filtros.value.autor_id;
      if (filtros.value.categoria_id) params.categoria_id = filtros.value.categoria_id;
      if (filtros.value.status) params.status = filtros.value.status; 

      const res = await livroService.listar(params);
      livros.value = res.data;
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  const salvarLivro = async (dadosLivro) => {
    try {
      await livroService.salvar(dadosLivro);
      await buscarLivros();
      return { sucesso: true };
    } catch (error) {
      return {
        sucesso: false,
        erro: error.response?.data?.erro || "Erro ao salvar o livro.",
      };
    }
  };

  const atualizarLivro = async (id, dadosLivro) => {
    try {
      if (!dadosLivro || !id) return;
      await livroService.atualizar(id, dadosLivro);
      await buscarLivros();
      return { sucesso: true };
    } catch (error) {
      return {
        sucesso: false,
        erro: error.response?.data?.erro || "Erro ao atualizar livro.",
      };
    }
  };

  const excluirLivro = async (id) => {
    try {
      await livroService.excluir(id);
      await buscarLivros();
      return { sucesso: true };
    } catch (error) {
      return {
        sucesso: false,
        erro: error.response?.data?.erro || "Erro ao excluir livro.",
      };
    }
  };

  const inativarLivro = async (id) => {
    try {
      await livroService.inativar(id);
      await buscarLivros();
      return { sucesso: true };
    } catch (error) {
      console.error("Erro ao inativar livro:", error);
      return {
        sucesso: false,
        erro: error.response?.data?.erro || "Erro ao inativar o livro.",
      };
    }
  };

  const reativarLivro = async (id) => {
    try {
      await livroService.reativar(id); 
      await buscarLivros(); 
      return { sucesso: true };
    } catch (error) {
      console.error('Erro ao reativar livro:', error);
      return { 
        sucesso: false, 
        erro: error.response?.data?.erro || 'Erro ao reativar o livro.' 
      };
    }
  };

  return {
    livros,
    filtros,
    buscarLivros,
    salvarLivro,
    atualizarLivro,
    excluirLivro,
    inativarLivro,
    reativarLivro,
  };
});