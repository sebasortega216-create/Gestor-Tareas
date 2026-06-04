import React from 'react'
import { ItemTask } from '../ItemTask/ItemTask'
const tasks = [
  { id: 1, text: 'Comprar leche', completed: false },
  { id: 2, text: 'Lavar el coche', completed: true },
  { id: 3, text: 'Estudiar React', completed: false },
]


export const ListTasks = () => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <ItemTask key={task.id} task={task} />
      ))}
    </ul>
  )
}
