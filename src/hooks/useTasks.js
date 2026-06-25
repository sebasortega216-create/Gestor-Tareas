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
    await addDoc(tasksRef, { ...task, createdAt: new Date() });
  };

  const updateTask = async (taskId, updatedData) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId);
    await updateDoc(taskRef, updatedData);
  };

  const deleteTask = async (taskId) => {
    const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId);
    await deleteDoc(taskRef);
  };

  return { tasks, addTask, updateTask, deleteTask };
};