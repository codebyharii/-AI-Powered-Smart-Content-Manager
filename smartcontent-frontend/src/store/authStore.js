import { create } from 'zustand';
import authService from '../services/authService';

export const useAuthStore = create((set) => ({
  user: authService.getCurrentUser(),
  token: authService.getToken(),
  isAuthenticated: authService.isAuthenticated(),
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.login(credentials);
      set({
        user: response.data,
        token: response.data.token,
        isAuthenticated: true,
        loading: false,
      });
      return response;
    } catch (error) {
      set({ error: error.message || 'Login failed', loading: false });
      throw error;
    }
  },

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await authService.register(data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        set({
          user: response.data,
          token: response.data.token,
          isAuthenticated: true,
          loading: false,
        });
      }
      return response;
    } catch (error) {
      set({ error: error.message || 'Registration failed', loading: false });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
