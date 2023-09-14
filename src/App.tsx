import React, { useState } from 'react';
import { TaskProps, Todolist } from './Todolist';
import './App.css';
import { v1 } from 'uuid';

export type FilterValuesType = 'all'| 'active' | 'completed'

function App() {
  // Состояние задач
  let [tasks, setTasks] = useState<Array<TaskProps>>([
    {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'React', isDone: true},
    {id: v1(), title: 'Redux', isDone: false},
  ])
  // Состояние фильтра
  let [filter, setFilter] = useState<FilterValuesType>('all')
  
  // Удаление задачи
  function removeTask(id: string) {
    let filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }
  // Изменение фильтра
  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }
  // Добавление задачи
  function addTask(title: string) {
    const newTask = {id: v1(), title: title, isDone: false}
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }
  // Изменение статуса
  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId)
    if(task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
  }

  
  // Фильтрация задач по выбранному фильтру
  let tasksForTodolist = tasks
  if (filter === 'completed') {
   tasksForTodolist = tasks.filter(task => task.isDone === true)
  }
  if (filter === 'active') {
   tasksForTodolist = tasks.filter(task => task.isDone === false)
  }

  return (
    <div className="App">
      {/* Компонент Todolist */}
      <Todolist title = {'What to learn'}
                tasks={tasksForTodolist} 
                removeTask={removeTask} 
                changeFilter={changeFilter} 
                addTask={addTask} 
                changeTaskStatus={changeStatus}
                filter={filter} />
      {/* Другие компоненты Todolist */}
    </div>
  );
}
export default App;