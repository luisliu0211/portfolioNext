import styles from './buttonActive.module.css';
export default function ButtonActive({ settings }) {
  const { title, active } = settings;
  // console.log(settings);
  return (
    <>
      <button className={styles.button} onClick={active}>
        {title}
      </button>
    </>
  );
}
