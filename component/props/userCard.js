import styles from './userCard.module.css';
import Link from 'next/link';
import Image from 'next/image';
export default function UserCard(props) {
  const { data } = props;
  return (
    <>
      <ul className={styles.container}>
        {data.length != 0 &&
          data.map((item, id) => {
            const bgImg = {
              backgroundImage: `${item.picture.large}`,
            };
            let name =
              item.name.title + ' ' + item.name.first + ' ' + item.name.last;
            return (
              <li key={id} className={styles.cards} style={bgImg}>
                <div className={styles.coverImg}>
                  <Image
                    src={item.picture.large}
                    alt=""
                    width={100}
                    height={100}
                  ></Image>
                </div>
                <div className={styles.postInfo}>
                  <div className={styles.textTitle}>{name}</div>
                  <div className={styles.description}>{item.email}</div>
                  <div className={styles.description}>{item.phone}</div>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}
