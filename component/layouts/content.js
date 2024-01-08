import styles from './content.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Breadcrumbs from '../props/breadcrumbs';
import FeatureCard from '../props/featureCard';

export default function Content(props) {
  let { data } = props;
  const router = useRouter();
  //抓取網址後面
  const nowPage = router.asPath;
  let title =
    nowPage.split('/').length == 2
      ? nowPage.split('/')[1].toUpperCase()
      : nowPage.split('/')[2].toUpperCase();

  useEffect(() => {}, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>{title}</h1>
          <hr />
          <div className={styles.contents}>
            {data && <FeatureCard data={data} />}
          </div>
        </div>
      </div>
    </>
  );
}
