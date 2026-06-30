import api from '../api/api';

export default {
  listar(params) {
    return api.get('/livros', { params });
  },
  salvar(dadosLivro) {
    return api.post('/livros', dadosLivro);
  },
  atualizar(id, dadosLivro) {
    return api.put(`/livros/${id}`, dadosLivro);
  },
  excluir(id) {
    return api.delete(`/livros/${id}`);
  },
  inativar(id) {
    return api.put(`/livros/${id}/inativar`);
  },
  reativar(id) {
    return api.patch(`/livros/${id}/reativar`);
  }
};