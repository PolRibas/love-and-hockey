// pages/admin/2024.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Page2024 = () => {
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
        <h1 className="text-3xl font-bold mb-4 text-center">Año 2024</h1>
        <p className="mb-4 text-center">Esta es la página enfocada al año 2024.</p>
        <div className="space-y-4">
          <button
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => router.push('/admin/2024/equipos')}
          >
            Equipos
          </button>
          <button
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => router.push('/admin/2024/partidos-resultados')}
          >
            Partidos y Resultados
          </button>
          <button
            className="w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            onClick={() => router.push('/admin/private')}
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page2024;
