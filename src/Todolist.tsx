import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

export type TaskProps = {
  id: string
  title: string
  isDone: boolean
}

type Props = {
  title: string
  tasks: Array<TaskProps>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export function Todolist(props: Props) {

  const [newTaskTitle, setNewTaskTitle] = useState('')

  // Обработчик изменения значения поля ввода новой задачи
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }

  // Обработчик нажатия клавиши "Enter" в поле ввода новой задачи
  const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (newTaskTitle.trim()) {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
      }
      setNewTaskTitle('')
    }
  }

  // Обработчик добавления новой задачи при клике на кнопку "+"
  const addingNewTaskHandler = () => {
    if (newTaskTitle.trim()) {
      props.addTask(newTaskTitle)
      setNewTaskTitle('')
    }
    setNewTaskTitle('')
  }

  // Обработчик изменения фильтра на "All"
  const onAllChangeFilter = () => {
    props.changeFilter('all')
  }

  // Обработчик изменения фильтра на "Active"
  const onActiveChangeFilter = () => {
    props.changeFilter('active')
  }

  // Обработчик изменения фильтра на "Completed"
  const onCompletedChangeFilter = () => {
    props.changeFilter('completed')
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle} onKeyDown={onKeyDownHandler} onChange={onNewTitleChangeHandler} />
        <button onClick={addingNewTaskHandler}>+</button>
        
        <ul>
          {props.tasks.map((task) => {

            const removeTaskHandler = () => {props.removeTask(task.id)}
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(task.id, e.currentTarget.checked)
            }
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
              </li>
            )
          })}
        </ul>
        
        <div>
          <button onClick={onAllChangeFilter}>All</button>
          <button onClick={onActiveChangeFilter}>Active</button>
          <button onClick={onCompletedChangeFilter}>Completed</button>
        </div>
      </div>
    </div>
  );
}