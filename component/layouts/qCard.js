import React from 'react';
import styles from './qCard.module.css';
export default function QCard({ children }) {
  return <div className={styles.container}>{children}</div>;
}
