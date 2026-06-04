import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import './ItemTask.css'; // Importación de sus estilos

export const ItemTask = ({ task, onToggle, onDelete }) => {
  return (
    <li className="task-item">
      <div className="task-content">
        <input 
          type="checkbox" 
          className="task-checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={`task-text ${task.completed ? 'completed' : ''}`}>
          {task.text}
        </span>
      </div>
      <button 
        className="btn-delete" 
        onClick={() => onDelete(task.id)}
        title="Eliminar tarea"
      >
        <FaTrashAlt size={16} />
      </button>
    </li>
  );
};