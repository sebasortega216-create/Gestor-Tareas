import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useAuth } from '../context/AuthContext';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const tasksRef = collection(db, `users/${currentUser.uid}/tasks`);
    const q = query(tasksRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const addTask = async (task) => {
    const tasksRef = collection(db, `users/${currentUser.uid}/tasks`);
    await addDoc(tasksRef, {
      status: 'pending',
      timeSpent: 0,
      isRunning: false,
      startedAt: null,
      archived: false,
      ...task,
      createdAt: new Date()
    });
  };

  const updateTask = async (taskId, updatedData) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId);
    await updateDoc(taskRef, updatedData);
  };

  const deleteTask = async (taskId) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId);
    await deleteDoc(taskRef);
  };

  // Marca una tarea como completada o la reabre
  const toggleComplete = async (taskId, currentStatus) => {
    await updateTask(taskId, {
      status: currentStatus === 'completed' ? 'pending' : 'completed'
    });
  };

  // Inicia el cronómetro: guarda la marca de tiempo de arranque
  const startTimer = async (taskId) => {
    await updateTask(taskId, { isRunning: true, startedAt: Date.now() });
  };

  // Pausa el cronómetro: suma el tiempo transcurrido al acumulado y lo guarda
  const pauseTimer = async (taskId, currentTimeSpent, startedAt) => {
    const elapsed = startedAt ? Math.floor((Date.now() - startedAt) / 1000) : 0;
    await updateTask(taskId, {
      isRunning: false,
      startedAt: null,
      timeSpent: (currentTimeSpent || 0) + elapsed
    });
  };

  // Archiva una tarea (deja de mostrarse en la lista principal)
  const archiveTask = async (taskId) => {
    await updateTask(taskId, { archived: true });
  };

  // Restaura una tarea archivada
  const unarchiveTask = async (taskId) => {
    await updateTask(taskId, { archived: false });
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    startTimer,
    pauseTimer,
    archiveTask,
    unarchiveTask
  };
};