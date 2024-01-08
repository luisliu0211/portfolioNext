import styles from './cards.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import MyContext from '@/lib/context';
export default function Cards(props) {
  const { data } = props;
  console.log(data, 't');
  const context = useContext(MyContext);
  let categoryList = [
    { id: 0, name: 'All' },
    { id: 1, name: 'FrontEnd' },
    { id: 2, name: 'BackEnd' },
    { id: 3, name: 'Database' },
    { id: 4, name: 'Other' },
  ];
  return (
    <>
      <ul className={styles.container}>
        {data.length !== 0 &&
          data.map((item) => {
            const bgImg = {
              backgroundImage: context.isMobile
                ? `url(${item.coverImage})`
                : 'none',
            };
            return (
              <li key={item.id} className={`${styles.cards}`} style={bgImg}>
                <Link href={`/posts/${item.id}`}>
                  <div className={styles.coverImg}>
                    <Image
                      src={item.coverImage}
                      alt=""
                      width={100}
                      height={100}
                    ></Image>
                  </div>
                  <div className={styles.postInfo}>
                    <div className={styles.textTitle}>{item.title}</div>
                    <div className={styles.description}>{item.subtitle}</div>
                    <ul className={styles.tags}>
                      {item.tags.map((tag, index) => {
                        return <li key={index}>{tag}</li>;
                      })}
                    </ul>
                    <div className={styles.category}>
                      {
                        categoryList.find((category) => {
                          return item.category == category.id;
                        }).name
                      }
                    </div>
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
