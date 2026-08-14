'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CatchAllPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to employees for any unknown route
    router.push('/employees');
  }, [router]);

  return null;
}