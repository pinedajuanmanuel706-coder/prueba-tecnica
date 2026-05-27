import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Swal from 'sweetalert2';

function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [role, setRole] = useState('Administrador');

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) {
      Swal.fire({ icon: 'warning', title: 'Faltan datos', text: 'Ingresa tu nombre antes de continuar.' });
      return;
    }

    login({ name, role });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 px-4 py-12 text-white">
      <div className="mx-auto max-w-lg overflow-hidden rounded-3xl bg-slate-950/90 p-8 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl">
        <h1 className="text-4xl font-semibold">Issue Tracker</h1>
        <p className="mt-3 text-slate-300">
          Ingresa tu nombre y elige tu rol para comenzar a gestionar incidencias.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-200">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 shadow-inner shadow-black/20 focus:border-cyan-400"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200">Rol</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 shadow-inner shadow-black/20 focus:border-cyan-400"
            >
              <option>Administrador</option>
              <option>Soporte Técnico</option>
              <option>Analista</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
