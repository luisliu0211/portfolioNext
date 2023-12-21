import styles from './cards.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import MyContext from '@/lib/context';
export default function Cards(props) {
  const { data } = props;
  const context = useContext(MyContext);
  return (
    <>
      <ul className={styles.container}>
        {data.length !== 0 &&
          data.map((item) => {
            const bgImg = {
              backgroundImage: context.isMobile
                ? `url(/image/posts/${item.coverImage})`
                : 'none',
            };
            let tagsArr = item.tags.split(',');
            return (
              <li key={item.id} className={`${styles.cards}`} style={bgImg}>
                <Link href={`/posts/${item.id}`}>
                  <div className={styles.coverImg}>
                    <Image
                      src={`/image/posts/${item.coverImage}`}
                      alt=""
                      width={100}
                      height={100}
                    ></Image>
                  </div>
                  <div className={styles.postInfo}>
                    <div className={styles.textTitle}>{item.title}</div>
                    <div className={styles.description}>{item.excerpt}</div>
                    <ul className={styles.tags}>
                      {' '}
                      {tagsArr.map((tag, index) => {
                        return <li key={index}>{tag}</li>;
                      })}
                    </ul>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
      {data.length == 0 && (
        <div className={styles.noData}>
          <h3>No Articles</h3>
        </div>
      )}
    </>
  );
}
