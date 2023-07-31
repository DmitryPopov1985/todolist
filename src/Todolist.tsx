
import React, { ChangeEvent,  KeyboardEvent,   useState } from 'react';
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
}
export function Todolist(props: Props) {

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setNewTaskTitle(e.currentTarget.value)}
  const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
    if (newTaskTitle.trim()) {
      props.addTask(newTaskTitle)
      setNewTaskTitle('')
    }
      setNewTaskTitle('')
  }}
  const addingNewTaskHandler = () => {if (newTaskTitle.trim()) {
    props.addTask(newTaskTitle)
    setNewTaskTitle('')
  }
    setNewTaskTitle('')}
  const onAllChangeFilter = () => {props.changeFilter('all')}
  const onActiveChangeFilter = () => {props.changeFilter('active')}
  const onCompletedChangeFilter = () => {props.changeFilter('completed')}
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle} onKeyDown={ onKeyDownHandler } onChange={onNewTitleChangeHandler} />
        <button onClick={ addingNewTaskHandler}>+</button>
        <ul>
          {props.tasks.map((task) => {

            const removeTaskHandler = () => {props.removeTask(task.id)}
            return (
              <li key={task.id} >
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler} >x</button>
              </li>
            )
          })}
        </ul>
        <div>
          <button onClick={ onAllChangeFilter }>All</button>
          <button onClick={onActiveChangeFilter }>Active</button>
          <button onClick={onCompletedChangeFilter }>Completed</button>
        </div>
      </div>
    </div>
  );
}
