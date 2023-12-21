import React, { useEffect, useState, useContext } from 'react';
import styles from './floating.module.css';
import FlexBox from '@/component/layouts/flexBox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import MyContext from '@/lib/context';
export default function FloatingCard(props) {
  const context = useContext(MyContext);
  const { data } = props;
  let allCompleteCard = { backgroundColor: 'black' };
  const [actionID, setActionID] = useState(null);

  useEffect(() => {
    console.log('e');
  }, []);
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
        {' '}
        完成度:{data[1].filter((i) => i.complete).length}/{data[1].length}
      </p>
      {data[1].filter((i) => i.complete).length / data[1].length == 1 && (
        <p>厲害！</p>
      )}
      <br />
      <hr />
      <br />
      {data[1].map((item) => {
        let date = new Date(item.date).toLocaleString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        let finished = { textDecoration: 'line-through' };

        return (
          <>
            <div
              className={styles.todoLi}
              style={item.complete ? finished : {}}
            >
              <span className={styles.text}> {item.text}</span>
              <div className={styles.time}>
                <span> {date}</span>
                <IconButton aria-label="delete" size="small">
                  <DeleteIcon color="disabled" sx={{ fontSize: 25 }} />
                </IconButton>
                <IconButton aria-label="done" size="small">
                  <DoneIcon color="disabled" sx={{ fontSize: 25 }} />
                </IconButton>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
