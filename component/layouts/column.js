import React from 'react';
import styles from './column.module.css';
export default function column({ children }) {
  return <div className={styles.container}>{children}</div>;
}
