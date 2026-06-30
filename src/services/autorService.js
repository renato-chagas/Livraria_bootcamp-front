import api from '../api/api';

export default {
  listar() {
    return api.get('/autores');
  },
  salvar(dadosAutor) {
    return api.post('/autores', dadosAutor);
  },
  excluir(id) {
    return api.delete(`/autores/${id}`);
  }
};