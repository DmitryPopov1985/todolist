import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';
import AddItemForm from './AddItemForm';

export type TaskProps = {
  id: string
  title: string
  isDone: boolean
}

type Props = {
  id: string
  title: string
  tasks: Array<TaskProps>
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  filter: FilterValuesType
}

export function Todolist(props: Props) {



const removeTodolistHandler = () => {
  props.removeTodolist(props.id)
}
  // Обработчик изменения фильтра на "All"
  const onAllChangeFilter = () => {
    props.changeFilter('all', props.id)
  }

  // Обработчик изменения фильтра на "Active"
  const onActiveChangeFilter = () => {
    props.changeFilter('active', props.id)
  }

  // Обработчик изменения фильтра на "Completed"
  const onCompletedChangeFilter = () => {
    props.changeFilter('completed', props.id)
  }

  return (
    <div>
      <h3>{props.title} <button onClick={removeTodolistHandler} >+</button> </h3>
      <div>
        <AddItemForm addTask={props.addTask } id={props.id}/>
        <ul>
          {props.tasks.map((task) => {

            const removeTaskHandler = () => {props.removeTask(task.id, props.id)}
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
            }
            return (
              <li key={task.id}
                  className={task.isDone ? 'is-done' : ''} >
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={onChangeHandler}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
              </li>
            )
          })}
        </ul>
        
        <div>
          <button className={props.filter === 'all' ? 'active-filter' : '' } onClick={onAllChangeFilter}>Все</button>
          <button className={props.filter === 'active' ? 'active-filter' : '' } onClick={onActiveChangeFilter}>Активные</button>
          <button className={props.filter === 'completed' ? 'active-filter' : '' } onClick={onCompletedChangeFilter}>Выполненные</button>
        </div>
      </div>
    </div>
  );
}



