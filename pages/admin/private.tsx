// pages/admin/private.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PrivatePage = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin');
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
        <p className="mb-4 text-center">Bienvenido a la página privada.</p>
        <div className="space-y-4">
          <button
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => router.push('/admin/2024')}
          >
            Ir a 2024
          </button>
          <button
            className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            onClick={() => {
              localStorage.removeItem('admin');
              router.push('/admin/login');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivatePage;
