import React, { useState } from 'react';
import { TaskProps, Todolist } from './Todolist';
import './App.css';
import { v1 } from 'uuid';

export type FilterValuesType = 'all'| 'active' | 'completed'
type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {
  // Состояние задач
  let [tasks, setTasks] = useState<Array<TaskProps>>([
    {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'React', isDone: true},
    {id: v1(), title: 'Redux', isDone: false},
  ])
  
  // Удаление задачи
  function removeTask(id: string) {
    let filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }
  // Изменение фильтра
  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
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

  
  
  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    {id: v1(), title: 'Что изучить', filter: 'all'},
    {id: v1(), title: 'Что купить', filter: 'active'}
  ]) 

  return (
    <div className="App">
      {
        todolists.map( tl => {
          // Фильтрация задач по выбранному фильтру
          let tasksForTodolist = tasks
          if (tl.filter === 'completed') {
          tasksForTodolist = tasks.filter(task => task.isDone === true)
          }
          if (tl.filter === 'active') {
          tasksForTodolist = tasks.filter(task => task.isDone === false)
          }
          
          return <Todolist 
                    key={tl.id}
                    id={tl.id}
                    title = {tl.title}
                    tasks={tasksForTodolist} 
                    removeTask={removeTask} 
                    changeFilter={changeFilter} 
                    addTask={addTask} 
                    changeTaskStatus={changeStatus}
                    filter={tl.filter} />
        })
      }
      
      {/* Другие компоненты Todolist */}
    </div>
  );
}
export default App;