import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useAuth } from '../useAuth';
import { login, logout } from '@/store/slices/authSlice';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('useAuth Hook', () => {
  beforeEach(() => {
    store.dispatch(logout());
  });

  it('should return isAuthenticated false initially', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should return isAuthenticated true after login', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    act(() => {
      store.dispatch(login({ email: 'admin@test.com' }));
    });
    
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should restore auth state from localStorage', () => {
    localStorage.setItem('auth', JSON.stringify({
      isAuthenticated: true,
      user: { email: 'admin@test.com' },
    }));

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.isAuthenticated).toBe(true);
  });
});