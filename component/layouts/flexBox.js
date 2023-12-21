import React from 'react';
import styles from './flexBox.module.css';
export default function FlexBox({ children }) {
  return <div className={styles.container}>{children}</div>;
}
