import React, { useState } from "react";
import { TaskType, Todolist } from "./Todolist";
import "./App.css";
import { v1 } from "uuid";
import AddItemForm from "./AddItemForm";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  // Удаление задачи
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((task) => task.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTaskObj({ ...tasksObj });
  }
  // Изменение фильтра
  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }
  // Добавление задачи
  function addTask(title: string, todolistId: string) {
    const newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTaskObj({ ...tasksObj });
  }
  // Изменение статуса
  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let task = tasksObj[todolistId].find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;

      setTaskObj({ ...tasksObj });
    }
  }
  // Изменение заголовка статуса
  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    let task = tasksObj[todolistId].find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
      setTaskObj({ ...tasksObj });
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "Что изучить", filter: "all" },
    { id: todolistId2, title: "Что купить", filter: "all" },
  ]);

  function removeTodolist(todolistId: string) {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId];
    setTaskObj({ ...tasksObj });
  }
  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  }
  let [tasksObj, setTaskObj] = useState<TaskStateType>({
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: true },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Молоко", isDone: true },
      { id: v1(), title: "Хлеб", isDone: true },
      { id: v1(), title: "Колбаса", isDone: false },
    ],
  });

  function addTodolist(title: string) {
    let todolist: TodoListType = {
      id: v1(),
      title: title,
      filter: "all",
    };
    setTodolists([todolist, ...todolists]);
    setTaskObj({
      [todolist.id]: [],
      ...tasksObj,
    });
  }
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
        <Grid container sx={{padding: '30px 10px', margin: '0 auto', maxWidth: '320px'}}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container  spacing={5}>
          {todolists.map((tl) => {
            // Фильтрация задач по выбранному фильтру
            let tasksForTodolist = tasksObj[tl.id];
            if (tl.filter === "completed") {
              tasksForTodolist = tasksForTodolist.filter(
                (task) => task.isDone === true
              );
            }
            if (tl.filter === "active") {
              tasksForTodolist = tasksForTodolist.filter(
                (task) => task.isDone === false
              );
            }

            return (
              <Grid item>
               <Paper elevation={3} sx={{padding: '10px'}}>
              <Todolist
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                changeTaskTitle={changeTaskTitle}
                removeTodolist={removeTodolist}
                changeTodolistTitle={changeTodolistTitle}
                filter={tl.filter}
              />
              </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      {/* Другие компоненты Todolist */}
    </div>
  );
}
export default App;
