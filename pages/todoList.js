import Layout from '@/component/layouts/layout';
import Breadcrumbs from '@/component/props/breadcrumbs';
import React, { useState, useReducer, useEffect } from 'react';
import Todos from '../component/props/todos';
import TodoForm from '../component/props/todoForm';
import { getFormattedDateTime } from '@/lib/getDate';
import Button from '@mui/material/Button';
import Grid from '@/component/layouts/grid';
import FloatingCard from '@/component/props/floatingCard';
import MyContext from '@/lib/context';
import { useRouter } from 'next/router';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
const reducer = (todos, action) => {
  console.log(todos, action);
  const { todoContent, id } = action.payload;
  switch (action.type) {
    case 'ADD':
      return [...todos, newTodo(todoContent)];
    case 'TOGGLE':
      return todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case 'DELETE':
      return todos.filter((todo) => todo.id !== id);
    case 'EDIT':
      return todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, todoContent: todoContent };
        }
        return todo;
      });
    default:
      return todos;
  }
};
const newTodo = (todoContent) => {
  return {
    id: Math.floor(Math.random() * 100),
    todoContent,
    complete: false,
    date: getFormattedDateTime(),
  };
};
export default function TodoList() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [todoData, setTodoData] = useState([]);
  const router = useRouter();
  const handleSavetoDB = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/todoList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todos }),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result, dispatch, 'w');
      alert('儲存成功');
      router.push('/');
    } catch (error) {
      console.error('Error saving data to the database:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/todoList`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        // console.log(result);
        setTodoData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const groupedData = todoData.reduce((result, item) => {
    const dateTimeObj = new Date(item.date);
    const year = dateTimeObj.getFullYear();
    const month = dateTimeObj.getMonth() + 1; // 月份是从 0 开始的，所以要加 1
    const day = dateTimeObj.getDate();

    const formattedDate = `${year}/${month}/${day}`;
    if (!result[formattedDate]) {
      result[formattedDate] = [];
    }
    result[formattedDate].push(item);
    return result;
  }, {});

  const groupedArray = Object.entries(groupedData);
  // groupedArray.map(([date, items]) => {
  //   // console.log(`Date: ${date}`);
  //   // console.log(items); // 在这里你可以进行映射等操作
  // });
  console.log(groupedArray);
  return (
    <Layout>
      <MyContext.Provider value={(todoData, setTodoData)}>
        <TodoForm dispatch={dispatch} todos={todos} />
        <Todos todos={todos} dispatch={dispatch} />
        <br />
        {todos.length != 0 && (
          <Button variant="contained" onClick={handleSavetoDB}>
            確認今天代辦清單
          </Button>
        )}
        <br />
        <br />
        <hr />
        <Grid>
          {groupedArray.map((date) => {
            return <FloatingCard data={date} />;
          })}
        </Grid>
      </MyContext.Provider>
    </Layout>
  );
}
