function Loader() {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-slate-500 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 animate-pulse rounded-full bg-cyan-500" />
        <p className="text-sm font-medium">Cargando incidencias...</p>
      </div>
    </div>
  );
}

export default Loader;
