import api from './api';

export const articleService = {
  getAll: async (params = {}) => {
    const { page = 0, size = 10, sortBy = 'createdAt', sortDir = 'DESC' } = params;
    const response = await api.get('/articles', {
      params: { page, size, sortBy, sortDir },
    });
    return response;
  },

  getById: async (id) => {
    const response = await api.get(`/articles/${id}`);
    return response;
  },

  create: async (data) => {
    const response = await api.post('/articles', data);
    return response;
  },

  update: async (id, data) => {
    const response = await api.put(`/articles/${id}`, data);
    return response;
  },

  delete: async (id) => {
    const response = await api.delete(`/articles/${id}`);
    return response;
  },

  search: async (title, params = {}) => {
    const { page = 0, size = 10 } = params;
    const response = await api.get('/articles/search', {
      params: { title, page, size },
    });
    return response;
  },

  filterByTags: async (tags, params = {}) => {
    const { page = 0, size = 10 } = params;
    const response = await api.get('/articles/filter/tags', {
      params: { tags: tags.join(','), page, size },
    });
    return response;
  },

  filterByStatus: async (status, params = {}) => {
    const { page = 0, size = 10 } = params;
    const response = await api.get('/articles/filter/status', {
      params: { status, page, size },
    });
    return response;
  },

  getMyArticles: async (params = {}) => {
    const { page = 0, size = 10 } = params;
    const response = await api.get('/articles/my-articles', {
      params: { page, size },
    });
    return response;
  },
};

export default articleService;
