import React, { useEffect, useState, useContext } from 'react';
import styles from './floating.module.css';
import FlexBox from '@/component/layouts/flexBox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
// import MyContext from '@/lib/context';
import { useRouter } from 'next/router';
export default function FloatingCard(props) {
  // const context = useContext(MyContext);
  const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
  const router = useRouter();
  const { data } = props;
  let allCompleteCard = { backgroundColor: 'black' };
  const handleComplete = async (item) => {
    if (item.complete == 1) {
      alert('already complete');
      return;
    }
    const { id } = item;
    console.log(id);
    try {
      // let t = 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/api/todoList/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ complete: true }),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // const result = await response.json();
      router.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={styles.container}
      style={
        data[1].filter((i) => i.complete).length / data[1].length == 1
          ? allCompleteCard
          : {}
      }
    >
      <h2>{data[0]}</h2>
      <p>
        完成度:{data[1].filter((i) => i.complete).length}/{data[1].length}
      </p>
      {data[1].filter((i) => i.complete).length / data[1].length == 1 && (
        <p>厲害！</p>
      )}
      <br />
      <hr />
      {data[1].map((item, index) => {
        let date = new Date(item.date).toLocaleString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        let finished = { textDecoration: 'line-through' };
        return (
          <React.Fragment key={index}>
            <div
              className={styles.todoLi}
              style={item.complete ? finished : {}}
              key={index}
              onClick={() => handleComplete(item)}
            >
              <span className={styles.text}> {item.text}</span>
              <div className={styles.time}>
                <span> {date}</span>
                {item.complete == 0 ? (
                  <IconButton aria-label="done" size="small">
                    <DoneIcon sx={{ fontSize: 25 }} />
                  </IconButton>
                ) : (
                  <IconButton aria-label="done" size="small">
                    <DoneIcon sx={{ fontSize: 25, color: 'green' }} />
                  </IconButton>
                )}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
