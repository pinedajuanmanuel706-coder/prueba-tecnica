import { useAuth } from '../contexts/AuthContext.jsx';

function Header({ onNewIssue }) {
  const { user, logout } = useAuth();

  return (
    <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">Bienvenido, {user?.name}</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Gestión de incidencias</h1>
        <p className="text-sm text-slate-500">Rol: {user?.role}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onNewIssue}
          className="rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
        >
          Nueva incidencia
        </button>
        <button
          type="button"
          onClick={logout}
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Header;