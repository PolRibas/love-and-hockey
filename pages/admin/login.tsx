// pages/login.tsx
import { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí puedes agregar la lógica para verificar el login.
    // Por ejemplo, puedes hacer una llamada a tu API para verificar las credenciales.
    // Si las credenciales son correctas, redirige a la página de administración.
    if (email === 'admin' && password === 'admin') {
      localStorage.setItem('admin', 'true')
      router.push('/admin/private');
    } else {
      alert('Invalid credentials');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('admin')) {
      router.push('/admin/private');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="p-6 max-w-sm w-full bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
