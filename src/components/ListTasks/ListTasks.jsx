import React from 'react'
import { ItemTask } from '../ItemTask/ItemTask'


export const ListTasks = () => {
  return (
    <ul>
      <ItemTask task={{ id: 1, text: 'Task 1', completed: false }} onToggle={() => {}} onDelete={() => {}} />
      <ItemTask task={{ id: 2, text: 'Task 2', completed: true }} onToggle={() => {}} onDelete={() => {}} />
      <ItemTask task={{ id: 3, text: 'Task 3', completed: false }} onToggle={() => {}} onDelete={() => {}} /> 
    </ul>
  )
}
