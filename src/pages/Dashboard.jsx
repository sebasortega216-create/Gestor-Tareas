import { useState } from 'react';
import { ReportExport } from '../components/ReportExport';
import { TaskCard } from '../components/TaskCard/TaskCard';
import { DashboardHeader } from '../components/DashboardHeader/DashboardHeader';
import { StatsBar } from '../components/StatsBar/StatsBar';
import { TaskForm } from '../components/TaskForm/TaskForm';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import Swal from 'sweetalert2';

export const Dashboard = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    startTimer,
    pauseTimer,
    archiveTask,
    unarchiveTask
  } = useTasks();
  const { currentUser } = useAuth();
  const [showArchived, setShowArchived] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) deleteTask(id);
    });
  };

  const handlePauseTimer = (task) => {
    pauseTimer(task.id, task.timeSpent, task.startedAt);
  };

  const activeTasks = tasks.filter((t) => !t.archived);
  const archivedTasks = tasks.filter((t) => t.archived);

  return (
    <div style={{ padding: '2rem' }}>
      <DashboardHeader userEmail={currentUser?.email} onLogout={handleLogout} />
      <StatsBar tasks={activeTasks} />
      <TaskForm onCreate={addTask} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {activeTasks.length === 0 && (
          <div className="glass-container" style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>No tienes tareas aún. ¡Crea una!</p>
          </div>
        )}
        {activeTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={toggleComplete}
            onDelete={handleDelete}
            onStartTimer={startTimer}
            onPauseTimer={handlePauseTimer}
            onEdit={updateTask}
            onArchive={archiveTask}
            onUnarchive={unarchiveTask}
          />
        ))}
      </div>

      {archivedTasks.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <button
            className="btn"
            style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
            onClick={() => setShowArchived(!showArchived)}
          >
            {showArchived ? 'Ocultar' : 'Ver'} archivadas ({archivedTasks.length})
          </button>

          {showArchived && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {archivedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleComplete}
                  onDelete={handleDelete}
                  onStartTimer={startTimer}
                  onPauseTimer={handlePauseTimer}
                  onEdit={updateTask}
                  onArchive={archiveTask}
                  onUnarchive={unarchiveTask}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <ReportExport tasks={activeTasks} />
    </div>
  );
};