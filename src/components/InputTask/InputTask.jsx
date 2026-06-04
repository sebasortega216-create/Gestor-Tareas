import React from 'react'
import './InputTask.css'

export const InputTask = () => {
  return (
    <form className="task-form"> 
        <input type="text" className="task-input" placeholder="Nueva tarea..." />
        <button type="submit" className="btn-add">Agregar</button>
    </form>
  )
}
