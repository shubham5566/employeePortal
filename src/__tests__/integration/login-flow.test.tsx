import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import LoginPage from '@/app/(auth)/login/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const renderLoginPage = () => {
  return render(
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
};

describe('Login Flow Integration', () => {
  it('should show validation errors for empty fields', async () => {
    renderLoginPage();
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('should show error for invalid credentials', async () => {
    renderLoginPage();
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.change(emailInput, { target: { value: 'wrong@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'WrongPass' } });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });
  });

  it('should handle successful login', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));

    renderLoginPage();
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    
    fireEvent.change(emailInput, { target: { value: 'admin@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Admin@123' } });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(store.getState().auth.isAuthenticated).toBe(true);
      expect(mockPush).toHaveBeenCalledWith('/employees');
    });
  });
});