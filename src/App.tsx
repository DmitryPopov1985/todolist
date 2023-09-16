import React, { useState } from 'react';
import { TaskProps, Todolist } from './Todolist';
import './App.css';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';

export type FilterValuesType = 'all'| 'active' | 'completed'
type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {

  
  // Удаление задачи
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(task => task.id !== id)
    tasksObj[todolistId] = filteredTasks
    setTaskObj({...tasksObj})
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
  function addTask(title: string, todolistId: string) {
    const newTask = {id: v1(), title: title, isDone: false}
    let tasks = tasksObj[todolistId]
    let newTasks = [newTask, ...tasks]
    tasksObj[todolistId] = newTasks
    setTaskObj({...tasksObj})
  }
  // Изменение статуса
  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let task = tasksObj[todolistId].find(t => t.id === taskId)
    if(task) {
      task.isDone = isDone

      setTaskObj({...tasksObj})
    }
    
  }

  let todolistId1 = v1()
  let todolistId2 = v1()
  
  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    {id: todolistId1, title: 'Что изучить', filter: 'all'},
    {id: todolistId2, title: 'Что купить', filter: 'all'}
  ]) 

  function removeTodolist(todolistId: string) {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist)
    delete tasksObj[todolistId]
    setTaskObj({...tasksObj})
  }
  let [tasksObj, setTaskObj] = useState({
    [todolistId1]: [
      {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'React', isDone: true},
    {id: v1(), title: 'Redux', isDone: false},
  ],
    [todolistId2]: [
    {id: v1(), title: 'Молоко', isDone: true},
    {id: v1(), title: 'Хлеб', isDone: true},
    {id: v1(), title: 'Колбаса', isDone: false},
  ]
  })
  return (
    <div className="App">
      <AddItemForm addTask={function (title: string, todolistId: string): void {
        throw new Error('Function not implemented.');
      } } id={''}/>
      {
        todolists.map( tl => {
          // Фильтрация задач по выбранному фильтру
          let tasksForTodolist = tasksObj[tl.id]
          if (tl.filter === 'completed') {
          tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true)
          }
          if (tl.filter === 'active') {
          tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false)
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
                    removeTodolist={removeTodolist}
                    filter={tl.filter} />
        })
      }
      
      {/* Другие компоненты Todolist */}
    </div>
  );
}
export default App;