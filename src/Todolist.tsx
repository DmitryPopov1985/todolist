import React from 'react';
import { ChangeEvent} from 'react';
import { FilterValuesType } from './App';
import AddItemForm from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type Props = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  filter: FilterValuesType
}

export function Todolist(props: Props) {



const removeTodolistHandler = () => {
  props.removeTodolist(props.id)
}
const changeTodolistTitleHandler = (newTitle: string) => {
  props.changeTodolistTitle(props.id, newTitle)
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

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
  return (
    <div>
      <h3>
        <EditableSpan
          title={props.title}
          onChange={changeTodolistTitleHandler}
        />
        <IconButton aria-label="delete" size='small' onClick={removeTodolistHandler}>
                  <Delete fontSize='inherit' />
                </IconButton>
      </h3>
      <div>
        <AddItemForm addItem={addTask} />
        <ul>
          {props.tasks.map((task) => {
            const removeTaskHandler = () => {
              props.removeTask(task.id, props.id);
            };
            const onChangeStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              props.changeTaskStatus(
                task.id,
                e.currentTarget.checked,
                props.id
              );
            };
            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(task.id, newValue, props.id);
            };
            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <Checkbox
                  checked={task.isDone}
                  onChange={onChangeStatusHandler}
                />
                <EditableSpan
                  title={task.title}
                  onChange={onChangeTitleHandler}
                />
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={removeTaskHandler}
                >
                  <Delete fontSize="inherit" />
                </IconButton>
              </li>
            );
          })}
        </ul>

        <div>
          <Button
            variant={props.filter === "all" ? 'contained' : 'text'}
            onClick={onAllChangeFilter}
          >
            Все
          </Button>
          <Button
            color='secondary'
            variant={props.filter === "active" ? 'contained' : 'text'}
            onClick={onActiveChangeFilter}
          >
            Активные
          </Button>
          <Button
            color='success'
            variant={props.filter === "completed" ? 'contained' : 'text'}
            onClick={onCompletedChangeFilter}
          >
            Выполненные
          </Button>
        </div>
      </div>
    </div>
  );
}

