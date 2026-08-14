'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { restoreAuth } from '@/store/slices/authSlice';
import Header from '@/components/layout/Header';

const publicPaths = ['/login'];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Restore auth state on mount
    dispatch(restoreAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!isMounted || loading) return;

    const isPublicPath = publicPaths.includes(pathname || '');
    
    if (!isAuthenticated && !isPublicPath) {
      router.push('/login');
    } else if (isAuthenticated && isPublicPath) {
      router.push('/employees');
    }
  }, [isAuthenticated, loading, pathname, router, isMounted]);

  // Show loading state while checking authentication
  if (loading || !isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render layout for public pages
  if (publicPaths.includes(pathname || '')) {
    return <>{children}</>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}