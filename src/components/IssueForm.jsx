import { useEffect, useState } from 'react';

const STATUS_OPTIONS = ['Pendiente', 'En Progreso', 'Resuelto'];
const PRIORITY_OPTIONS = ['Baja', 'Media', 'Alta'];

function IssueForm({ issue, onSave, onCancel, loading }) {
  const [title, setTitle] = useState(issue?.title || '');
  const [description, setDescription] = useState(issue?.description || '');
  const [status, setStatus] = useState(issue?.status || 'Pending');
  const [priority, setPriority] = useState(issue?.priority || 'Medium');

  useEffect(() => {
    setTitle(issue?.title || '');
    setDescription(issue?.description || '');
    setStatus(issue?.status || 'Pending');
    setPriority(issue?.priority || 'Medium');
  }, [issue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      id: issue?.id,
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
    });
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/70 px-4 py-10">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl shadow-slate-900/15">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {issue ? 'Editar incidencia' : 'Nueva incidencia'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Usa el formulario para registrar o actualizar la incidencia.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-200"
          >
            Cerrar
          </button>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500"
              placeholder="Resumen corto de la incidencia"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 h-32 w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500"
              placeholder="Descripción detallada del problema"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Estado</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Prioridad</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-cyan-500"
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-cyan-300"
            >
              {loading ? 'Guardando...' : issue ? 'Actualizar incidencia' : 'Crear incidencia'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IssueForm;
