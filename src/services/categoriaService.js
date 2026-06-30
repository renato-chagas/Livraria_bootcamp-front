import api from '../api/api';

export default {
  listar() {
    return api.get('/categorias');
  },
  salvar(dadosCategoria) {
    return api.post('/categorias', dadosCategoria);
  },
  excluir(id) {
    return api.delete(`/categorias/${id}`);
  }
};