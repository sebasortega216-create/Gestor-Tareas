import { ReportExport } from '../components/ReportExport';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import Swal from 'sweetalert2';

export const Dashboard = () => {
  const { tasks, addTask, deleteTask } = useTasks();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCreate = async () => {
    const { value: title } = await Swal.fire({
      title: 'Nueva Tarea',
      input: 'text',
      inputPlaceholder: 'Nombre de la tarea',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar'
    });

    if (title) {
      addTask({
        title,
        description: '',
        status: 'pending',
        timeSpent: 0
      });
    }
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

  return (
    <div style={{ padding: '2rem' }}>
      <div className="glass-container" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Mis Tareas</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)' }}>{currentUser?.email}</span>
          <button className="btn btn-primary" onClick={handleCreate}>+ Nueva Tarea</button>
          <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {tasks.length === 0 && (
          <div className="glass-container" style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>No tienes tareas aún. ¡Crea una!</p>
          </div>
        )}
        {tasks.map(task => (
          <div key={task.id} className="glass-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3>{task.title}</h3>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                Estado: {task.status === 'pending' ? 'Pendiente' : 'Completada'}
              </span>
            </div>
            <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
      <ReportExport tasks={tasks} />
    </div>
  );
};