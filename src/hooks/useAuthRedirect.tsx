'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (!user || JSON.parse(user).length === 0 || Object.keys(JSON.parse(user)).length === 0) {
        router.push('/');
      }
    }
  }, [router]); 
};

export default useAuthRedirect;
