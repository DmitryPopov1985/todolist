import React, { useState } from 'react';
import { TaskProps, Todolist } from './Todolist';
import './App.css';
import { v1 } from 'uuid';



// let tasks2 = [
//   {id:1, title: 'XXX', isDone: true},
//   {id:2, title: 'Три мушкетёра', isDone: false},
//   {id:3, title: 'Ликвидация', isDone: true},
//   {id:4, title: 'Бригада', isDone: true}
// ]
// let tasks3 = [
//   {id:1, title: 'Тучи', isDone: true},
//   {id:2, title: 'Три мушкетёра', isDone: false},
// ]
export type FilterValuesType = 'all'| 'active' | 'completed'

function App() {
  

  let [tasks, setTasks] = useState<Array<TaskProps>>([
    {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'React', isDone: true},
    {id: v1(), title: 'Redux', isDone: false},
  ])
  let [filter, setFilter] = useState<FilterValuesType>('all')
  
  function removeTask(id: string) {
    let filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }
  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }
  function addTask(title: string) {
    const newTask = {id: v1(), title: title, isDone: false}
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }
  
  let tasksForTodolist = tasks
  if (filter === 'completed') {
   tasksForTodolist = tasks.filter(task => task.isDone === true)
  }
  if (filter === 'active') {
   tasksForTodolist = tasks.filter(task => task.isDone === false)
  }

  return (
    <div className="App">
  <Todolist title = {'What to learn'} tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask} />
  {/* <Todolist title = {'Movies'} tasks={tasks2}/>
  <Todolist title = {'Songs'} tasks={tasks3}/> */}
    </div>
  );
}
export default App;
