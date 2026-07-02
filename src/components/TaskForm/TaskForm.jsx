import { useState } from 'react';
import Swal from 'sweetalert2';

// Formulario para crear una nueva tarea: nombre, descripción y tiempo estimado
export const TaskForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      Swal.fire('Error', 'El nombre de la tarea es obligatorio', 'error');
      return;
    }

    await onCreate({
      title: title.trim(),
      description: description.trim(),
      estimatedTime: Number(estimatedTime) || 0
    });

    setTitle('');
    setDescription('');
    setEstimatedTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="glass-container" style={{ marginBottom: '1.5rem' }}>
      <input
        type="text"
        placeholder="Nombre de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        min="0"
        placeholder="Tiempo estimado (min)"
        value={estimatedTime}
        onChange={(e) => setEstimatedTime(e.target.value)}
      />
      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
        Crear Tarea
      </button>
    </form>
  );
};