import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { restoreAuth } from '@/store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  const requireAuth = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return false;
    }
    return true;
  };

  return { isAuthenticated, requireAuth };
};