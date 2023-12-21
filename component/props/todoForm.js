import React, { useState } from 'react';
import styles from './todoForm.module.css';
export default function TodoForm({ dispatch, todos }) {
  const [todoContent, setTodoContent] = useState('');
  let finishedItem = todos.filter((todo) => todo.complete);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoContent == '') {
      dispatch({ type: 'ADD', payload: { todoContent: todoContent } });
      setTodoContent('');
    } else {
      return;
    }
  };
  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={todoContent}
            onChange={(e) => setTodoContent(e.target.value)}
            placeholder="type something"
          />
        </form>
        <div className={styles.recap}>
          完成度：
          {finishedItem.length == 0 ? 0 : finishedItem.length} /
          {todos.length == 0 ? 0 : todos.length}
        </div>
      </div>
    </>
  );
}
