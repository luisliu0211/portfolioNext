import React from 'react';
import styles from './cardwithWaterfall.module.css';
export default function CardwithWaterfall(props) {
  const { data } = props;
  console.log(data, 'd');
  return (
    <div className={styles.container}>
      {data.map((data, index) => {
        return (
          <div className={styles.card} key={index}>
            <h3>{data.title}</h3>
            <div>{data.body}</div>
          </div>
        );
      })}
    </div>
  );
}
