import React from 'react';

import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { TaskList } from './components/Tasks/TaskList';

const LOCAL_STORAGE_KEY = "todo:savedTasks"

function App() {
  const [tasks, setTasks] = useState([]);

  const loadSavedTasks = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(saved) {
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, [])

  const setTasksAndSave = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  const taskId = tasks.length
      ? tasks[tasks.length - 1].id + 1
      : 1;

  const addTask = (taskTitle) => {
    if(taskTitle.length > 0) {
      setTasksAndSave([
        ...tasks,
        {
          id: taskId,
          title: taskTitle.trim(),
          isCompleted: false,
          date: new Date().toLocaleString(),
        }
      ])
    }
  }

  const deleteTaskById = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  const toggleTaskCompetedById = (taskId) => {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        }
      }

      return task;
    });

    setTasksAndSave(newTasks);
  }

  return (
    <>
      <Header onAddTask={addTask}/>
      <TaskList 
        tasks={tasks} 
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompetedById}
        setTasksAndSave={setTasksAndSave}
      />
    </>
  );
}

export default App;
