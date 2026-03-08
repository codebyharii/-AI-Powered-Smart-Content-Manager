import api from './api';

export const aiService = {
  generateSummary: async (content) => {
    const response = await api.post('/ai/summarize', { content });
    return response;
  },

  generateTags: async (title, content) => {
    const response = await api.post('/ai/generate-tags', { title, content });
    return response;
  },

  calculateSeoScore: async (title, content) => {
    const response = await api.post('/ai/seo-score', { title, content });
    return response;
  },
};

export default aiService;
