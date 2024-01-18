import Link from 'next/link';
import styles from './breadcrumbs.module.css';
export default function Breadcrumbs({ nowPage }) {
  if (nowPage) {
    let layers = nowPage.split('/');

    if (nowPage != '/' && layers.length == 2) {
      const currentPath = layers[1];
      return (
        <div className={styles.breadcrumbs}>
          <Link href="/">Home</Link>/<span>{currentPath}</span>
        </div>
      );
    } else if (nowPage != '/' && layers.length == 3) {
      const parentPath = layers[1];
      let parentLink;
      if (parentPath == 'postRecap') {
        parentLink = '/member/postRecap';
      } else {
        parentLink = parentPath;
      }
      const currentPath = layers[2];
      return (
        <div className={styles.breadcrumbs}>
          <Link href="/">Home</Link>/
          <Link href={`/${parentLink}`}>{parentPath}</Link>/
          <span>{currentPath}</span>
        </div>
      );
    } else {
      return null;
    }
  }
}
