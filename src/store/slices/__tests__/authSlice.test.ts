import authReducer, { login, logout, restoreAuth } from '../authSlice';

describe('Auth Slice', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    loading: true,
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle login', () => {
    const actual = authReducer(initialState, login({ email: 'admin@test.com' }));
    expect(actual.isAuthenticated).toBe(true);
    expect(actual.user).toEqual({ email: 'admin@test.com' });
    expect(actual.loading).toBe(false);
  });

  it('should handle logout', () => {
    const loggedInState = {
      isAuthenticated: true,
      user: { email: 'admin@test.com' },
      loading: false,
    };
    const actual = authReducer(loggedInState, logout());
    expect(actual.isAuthenticated).toBe(false);
    expect(actual.user).toBe(null);
  });

  it('should handle restoreAuth', () => {
    const actual = authReducer(initialState, restoreAuth());
    expect(actual.loading).toBe(false);
  });

  it('should persist auth state in localStorage on login', () => {
    const setItemSpy = jest.spyOn(localStorage, 'setItem');
    authReducer(initialState, login({ email: 'admin@test.com' }));
    expect(setItemSpy).toHaveBeenCalled();
  });

  it('should remove auth state from localStorage on logout', () => {
    const removeItemSpy = jest.spyOn(localStorage, 'removeItem');
    const loggedInState = {
      isAuthenticated: true,
      user: { email: 'admin@test.com' },
      loading: false,
    };
    authReducer(loggedInState, logout());
    expect(removeItemSpy).toHaveBeenCalled();
  });
});