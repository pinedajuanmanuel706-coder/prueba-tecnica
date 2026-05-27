import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Header from '../components/Header.jsx';
import IssueCard from '../components/IssueCard.jsx';
import IssueForm from '../components/IssueForm.jsx';
import Loader from '../components/Loader.jsx';
import { deleteIssue, fetchIssues, createIssue, updateIssue } from '../services/api.js';

function DashboardPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [currentIssue, setCurrentIssue] = useState(null);
  const [formSaving, setFormSaving] = useState(false);

  const loadIssues = async () => {
    setLoading(true);
    try {
      const response = await fetchIssues();
      setIssues(response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar incidencias',
        text: 'No se pudo obtener la lista de incidencias. Intenta de nuevo más tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const handleNewIssue = () => {
    setCurrentIssue(null);
    setFormVisible(true);
  };

  const handleEditIssue = (issue) => {
    setCurrentIssue(issue);
    setFormVisible(true);
  };

  const handleDeleteIssue = async (issue) => {
    const result = await Swal.fire({
      title: '¿Eliminar incidencia?',
      text: 'Esta acción no se puede revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await deleteIssue(issue.id);
      Swal.fire({ icon: 'success', title: 'Incidencia eliminada' });
      await loadIssues();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar',
        text: 'No fue posible eliminar la incidencia. Intenta nuevamente.',
      });
    }
  };

  const handleSaveIssue = async (issueData) => {
    if (!issueData.title || !issueData.description) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'El título y la descripción son obligatorios.',
      });
      return;
    }

    setFormSaving(true);
    try {
      if (issueData.id) {
        await updateIssue(issueData.id, {
          title: issueData.title,
          description: issueData.description,
          status: issueData.status,
          priority: issueData.priority,
        });
        Swal.fire({ icon: 'success', title: 'Incidencia actualizada' });
      } else {
        await createIssue({
          title: issueData.title,
          description: issueData.description,
          status: issueData.status,
          priority: issueData.priority,
        });
        Swal.fire({ icon: 'success', title: 'Incidencia creada' });
      }
      setFormVisible(false);
      setCurrentIssue(null);
      await loadIssues();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la operación',
        text: 'No se pudo guardar la incidencia. Intenta de nuevo.',
      });
    } finally {
      setFormSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Header onNewIssue={handleNewIssue} />

        <section className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Incidencias recientes</h2>
              <p className="mt-2 text-sm text-slate-600">
                Administra las incidencias creadas por el equipo y actualiza su estado según el avance.
              </p>
            </div>

            {loading ? (
              <Loader />
            ) : issues.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm">
                No hay incidencias registradas. Crea una nueva para comenzar.
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                {issues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    onEdit={handleEditIssue}
                    onDelete={handleDeleteIssue}
                  />
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Resumen rápido</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>Total de incidencias: <strong className="text-slate-900">{issues.length}</strong></p>
                <p>Estados disponibles: Pendiente, En Progreso, Resuelto.</p>
                <p>Recuerda usar el botón de eliminar con cuidado.</p>
              </div>
            </div>
          </aside>
        </section>
      </div>

      {formVisible && (
        <IssueForm
          issue={currentIssue}
          onSave={handleSaveIssue}
          onCancel={() => {
            setFormVisible(false);
            setCurrentIssue(null);
          }}
          loading={formSaving}
        />
      )}
    </div>
  );
}

export default DashboardPage;
