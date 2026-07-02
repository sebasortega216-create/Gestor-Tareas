import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskCard } from './TaskCard';

describe('Pruebas en <TaskCard />', () => {
  const mockTask = {
    id: '123',
    title: 'Aprender Vitest',
    description: 'Practicar pruebas unitarias',
    status: 'pending',
    estimatedTime: 30,
    timeSpent: 0,
    isRunning: false,
    startedAt: null
  };

  const noop = vi.fn();

  it('Debe renderizar el título de la tarea correctamente', () => {
    render(
      <TaskCard
        task={mockTask}
        onToggleComplete={noop}
        onDelete={noop}
        onStartTimer={noop}
        onPauseTimer={noop}
        onEdit={noop}
        onArchive={noop}
        onUnarchive={noop}
      />
    );
    expect(screen.getByText('Aprender Vitest')).toBeInTheDocument();
  });

  it('Debe mostrar el estado Pendiente correctamente', () => {
    render(
      <TaskCard
        task={mockTask}
        onToggleComplete={noop}
        onDelete={noop}
        onStartTimer={noop}
        onPauseTimer={noop}
        onEdit={noop}
        onArchive={noop}
        onUnarchive={noop}
      />
    );
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
  });
});