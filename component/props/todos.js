import React from 'react';
import styles from './todos.module.css';
import { useState } from 'react';
export default function Todos({ todos, dispatch }) {
  const reversedTodos = todos.slice().reverse();
  return (
    <>
      {reversedTodos.map((todo, index) => {
        return <Todo key={index} todo={todo} dispatch={dispatch} />;
      })}
    </>
  );
}

export function Todo({ todo, dispatch }) {
  // const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(todo.todoContent);
  const handleEdit = () => {
    console.log('EDIT', todo.id);
    setIsEditing(true);
  };
  const handleSave = () => {
    if (!editedContent == '') {
      dispatch({
        type: 'EDIT',
        payload: { id: todo.id, todoContent: editedContent },
      });
      setIsEditing(false);
    } else {
      alert('no blank');
      setIsEditing(false);
      return;
    }
  };
  const handleInputChange = (e) => {
    setEditedContent(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.todoContent}
        style={{ textDecoration: todo.complete ? 'line-through' : null }}
      >
        {isEditing ? (
          <input
            type="text"
            value={editedContent}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={styles.editInput}
          />
        ) : (
          <div className={styles.text}>{todo.todoContent}</div>
        )}
        <div className={styles.date}>{todo.date}</div>
      </div>
      <div className={styles.buttons}>
        <button
          className={todo.complete ? styles.cancel : styles.finished}
          onClick={() => dispatch({ type: 'TOGGLE', payload: { id: todo.id } })}
        >
          {todo.complete ? 'Cancel' : 'Finish'}
        </button>
        <button
          className={styles.delete}
          onClick={() => {
            dispatch({ type: 'DELETE', payload: { id: todo.id } });
          }}
        >
          Delete
        </button>

        {isEditing ? (
          <button className="save" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="edit" onClick={handleEdit}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
