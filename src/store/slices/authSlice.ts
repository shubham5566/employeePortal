import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string }>) => {
      state.isAuthenticated = true;
      state.user = { email: action.payload.email };
      localStorage.setItem('auth', JSON.stringify({ 
        isAuthenticated: true, 
        user: { email: action.payload.email } 
      }));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('auth');
    },
    restoreAuth: (state) => {
      const authData = localStorage.getItem('auth');
      if (authData) {
        const parsed = JSON.parse(authData);
        state.isAuthenticated = parsed.isAuthenticated;
        state.user = parsed.user;
      }
    },
  },
});

export const { login, logout, restoreAuth } = authSlice.actions;
export default authSlice.reducer;