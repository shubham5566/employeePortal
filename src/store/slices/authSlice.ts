import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true, // Add loading state to prevent flash of login page
};

// Helper function to load auth state from localStorage
const loadAuthState = (): AuthState => {
  if (typeof window === 'undefined') {
    return initialState;
  }
  
  try {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsed = JSON.parse(authData);
      return {
        isAuthenticated: parsed.isAuthenticated || false,
        user: parsed.user || null,
        loading: false,
      };
    }
  } catch (error) {
    console.error('Failed to load auth state:', error);
  }
  
  return { ...initialState, loading: false };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthState(),
  reducers: {
    login: (state, action: PayloadAction<{ email: string }>) => {
      state.isAuthenticated = true;
      state.user = { email: action.payload.email };
      state.loading = false;
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth', JSON.stringify({
          isAuthenticated: true,
          user: { email: action.payload.email }
        }));
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      
      // Remove from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
      }
    },
    restoreAuth: (state) => {
      const loadedState = loadAuthState();
      state.isAuthenticated = loadedState.isAuthenticated;
      state.user = loadedState.user;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, restoreAuth, setLoading } = authSlice.actions;
export default authSlice.reducer;