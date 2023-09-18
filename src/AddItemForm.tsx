import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type PropsAddItemFormType = {
  addItem: (title: string) => void;
  
};
export default function AddItemForm(props: PropsAddItemFormType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Обработчик нажатия клавиши "Enter" в поле ввода новой задачи
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (newTaskTitle.trim()) {
        props.addItem(newTaskTitle);
        setNewTaskTitle('');
      } else {
        setError('Заполните поле');
      }
      setNewTaskTitle('');
    }
  };

  // Обработчик изменения значения поля ввода новой задачи
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
    setError(null);
  };
  // Обработчик добавления новой задачи при клике на кнопку "+"
  const addingNewTaskHandler = () => {
    if (newTaskTitle.trim()) {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('Заполните поле');
    }
    setNewTaskTitle('');
  };

  return (
    <div>
      <input value={newTaskTitle}
        onKeyDown={onKeyDownHandler}
        onChange={onNewTitleChangeHandler}
        className={error ? 'error' : ''} />
      <button onClick={addingNewTaskHandler}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
