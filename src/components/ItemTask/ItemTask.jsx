import React from 'react';
import { FaTrashAlt } from "react-icons/fa";

export const ItemTask = ({ task, onToggle, onDelete }) => {
    return (
        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', listStyle: 'none' }}>
            <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => onToggle(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
            </span>
            <button onClick={() => onDelete(task.id)} style={{ cursor: 'pointer' }}>
                <FaTrashAlt />
            </button>
        </li>
    );
};