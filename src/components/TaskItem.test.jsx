import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

const TaskItem = ({ task }) => (
  <div>
    <h3>{task.title}</h3>
    <span>{task.status === 'pending' ? 'Pendiente' : 'Completada'}</span>
  </div>
);

describe('Pruebas en <TaskItem />', () => {

  const mockTask = {
    id: '123',
    title: 'Aprender Vitest',
    status: 'pending'
  };

  it('Debe renderizar el título de la tarea correctamente', () => {
    render(<TaskItem task={mockTask} />);
    const titleElement = screen.getByText('Aprender Vitest');
    expect(titleElement).toBeInTheDocument();
  });

  it('Debe mostrar el estado Pendiente correctamente', () => {
    render(<TaskItem task={mockTask} />);
    const statusElement = screen.getByText('Pendiente');
    expect(statusElement).toBeInTheDocument();
  });

});