import React from 'react';
import styles from './maintenanceCover.module.css';
export default function MaintenanceCover() {
  return (
    <div className={styles.container}>
      <div>
        <h3>網站維護中</h3>
        <h4>This website is in maintence, email me if anything!</h4>
        <p>如果想看 email我 </p>
        <div>Email: lu0211@hotmail.com</div>
      </div>
    </div>
  );
}
