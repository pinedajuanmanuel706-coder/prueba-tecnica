function IssueCard({ issue, onEdit, onDelete }) {
  const badgeMap = {
    Pendiente: 'bg-yellow-100 text-yellow-700',
    'En Progreso': 'bg-sky-100 text-sky-700',
    Resuelto: 'bg-emerald-100 text-emerald-700',
  };

  const priorityMap = {
    Baja: 'bg-slate-100 text-slate-700',
    Media: 'bg-amber-100 text-amber-700',
    Alta: 'bg-rose-100 text-rose-700',
  };

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{issue.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{issue.description}</p>
        </div>
        <div className="space-y-2 text-right">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${badgeMap[issue.status]}`}>
            {issue.status}
          </span>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${priorityMap[issue.priority]}`}>
            {issue.priority}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onEdit(issue)}
          className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => onDelete(issue)}
          className="rounded-2xl border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default IssueCard;
