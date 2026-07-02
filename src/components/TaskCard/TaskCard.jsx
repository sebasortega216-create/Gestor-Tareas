import { useState, useEffect } from 'react';
import './TaskCard.css';

// Convierte segundos totales a formato HH:MM:SS
const formatTime = (totalSeconds) => {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds || 0));
  const h = Math.floor(safeSeconds / 3600);
  const m = Math.floor((safeSeconds % 3600) / 60);
  const s = safeSeconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
};

export const TaskCard = ({ task, onToggleComplete, onDelete, onStartTimer, onPauseTimer, onEdit, onArchive, onUnarchive }) => {
  const [now, setNow] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editEstimatedTime, setEditEstimatedTime] = useState(task.estimatedTime || 0);

  useEffect(() => {
    if (!task.isRunning) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    const initialTick = setTimeout(() => setNow(Date.now()), 0);
    return () => {
      clearInterval(interval);
      clearTimeout(initialTick);
    };
  }, [task.isRunning]);

  const liveSeconds = task.isRunning && now
    ? (task.timeSpent || 0) + Math.floor((now - task.startedAt) / 1000)
    : (task.timeSpent || 0);

  const isCompleted = task.status === 'completed';
  const estimatedSeconds = (task.estimatedTime || 0) * 60;
  const overEstimate = liveSeconds > estimatedSeconds && estimatedSeconds > 0;

  const handleStartEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditEstimatedTime(task.estimatedTime || 0);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;
    onEdit(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      estimatedTime: Number(editEstimatedTime) || 0
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="glass-container task-card">
        <input
          type="text"
          placeholder="Nombre de la tarea"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
        <input
          type="number"
          min="0"
          placeholder="Tiempo estimado (min)"
          value={editEstimatedTime}
          onChange={(e) => setEditEstimatedTime(e.target.value)}
        />
        <div className="task-card-actions">
          <button className="btn btn-primary" onClick={handleSaveEdit}>Guardar</button>
          <button className="btn" onClick={handleCancelEdit}>Cancelar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-container task-card">
      <div className="task-card-header">
        <div>
          <h3 className={isCompleted ? 'task-title-completed' : ''}>{task.title}</h3>
          {task.description && <p className="task-description">{task.description}</p>}
        </div>
        <span className={`badge ${isCompleted ? 'badge-completed' : 'badge-pending'}`}>
          {isCompleted ? 'Completada' : 'Pendiente'}
        </span>
      </div>

      <div className="task-card-info">
        <span>Tiempo estimado: {task.estimatedTime || 0} min</span>
        <span className={`timer-display ${overEstimate ? 'timer-over' : ''}`}>
          ⏱ {formatTime(liveSeconds)}
        </span>
      </div>

      <div className="task-card-actions">
        {!isCompleted && (
          task.isRunning ? (
            <button className="btn btn-primary" onClick={() => onPauseTimer(task)}>
              Pausar
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => onStartTimer(task.id)}>
              Iniciar
            </button>
          )
        )}
        <button className="btn btn-primary" onClick={() => onToggleComplete(task.id, task.status)}>
          {isCompleted ? 'Reabrir' : 'Completar tarea'}
        </button>
        <button className="btn" onClick={handleStartEdit}>
          Editar
        </button>
        {task.archived ? (
          <button className="btn" onClick={() => onUnarchive(task.id)}>
            Restaurar
          </button>
        ) : (
          <button className="btn" onClick={() => onArchive(task.id)}>
            Archivar
          </button>
        )}
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};