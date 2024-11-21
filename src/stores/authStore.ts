import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    // Mock API call
    if (email === 'teste@gmail.com' && password === '123') {
      set({
        isAuthenticated: true,
        user: {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
        },
      });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));