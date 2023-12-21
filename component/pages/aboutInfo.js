import styles from './aboutInfo.module.css';
import Breadcrumbs from '../props/breadcrumbs';
import { useRouter } from 'next/router';
export default function AboutInfo() {
  const router = useRouter();
  const nowPage = router.asPath;
  let title =
    nowPage.split('/').length == 2
      ? nowPage.split('/')[1].toUpperCase()
      : nowPage.split('/')[2].toUpperCase();

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <hr />
      <div className={styles.row}>
        <div className={styles.myImg}></div>
        <div className={styles.description}>
          <h3></h3>
          <p>
            Hi I&#39;m Luis from Taiwan, currently learning Front-End
            developement.<br></br> This is my portfolio website, recording all
            my work or practice material.<br></br> I know it&#39;s not easy to
            do, but will try my best.
          </p>
        </div>
      </div>
    </>
  );
}
