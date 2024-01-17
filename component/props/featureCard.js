import styles from './featureCard.module.css';
import Link from 'next/link';
import LoadMoreBtn from './loadMoreBtn';
import Image from 'next/image';
import { useEffect, useState } from 'react';
export default function FeatureCard(props) {
  let { data } = props;
  const [filter, setFilter] = useState(4);
  let dataCopy = [...data.data].slice(0, filter);
  let loadMoreDataSetting = {
    ifOverMaxShow: false,
    showName: '',
    newRoute: '',
    loadNum: 2,
    maxItem: 8,
    filter,
    setFilter,
    LoadTitle: '載入作品',
  };

  return (
    <div>
      {data.dataName == 'skills' ? (
        <div className={styles.container}>
          {data.data.map((item) => {
            return (
              <li key={item.id} className={styles.cardsSkills}>
                <div className={styles.cardInfo}>
                  <div className={styles.textTitle}>{item.title}</div>
                  <div className={styles.skillList}>
                    {item.skills.map((i, index) => {
                      return (
                        <div key={index} className={styles.skillItem}>
                          <div className={styles.skillName}>{i.name}</div>
                          <div className={styles.skillLevel}>{i.level}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </li>
            );
          })}
        </div>
      ) : null}

      {data.dataName == 'work' ? (
        <>
          <div className={styles.container}>
            {dataCopy.map((item) => {
              let newArr = JSON.parse(item.usingSkills);
              return (
                <Link
                  key={item.id}
                  href={item.links ? item.links : ''}
                  target="_blank"
                >
                  <li
                    className={styles.cardsWorks}
                    // style={{
                    //   backgroundImage: `url(/image/works/${item.relatedImg})`,
                    // }}
                  >
                    <div className={styles.workInfo}>
                      <div className={styles.typeTag}>{item.workType}</div>
                      <div className={styles.textTitle}>{item.title}</div>

                      <ul className={styles.tags}>
                        {newArr.map((i, index) => {
                          return <li key={index}>{i}</li>;
                        })}
                      </ul>
                      <Image
                        width={200}
                        height={100}
                        alt={item.title}
                        src={`/image/works/${item.relatedImg}`}
                      />
                    </div>
                  </li>
                </Link>
              );
            })}
          </div>
          <LoadMoreBtn key="workLoad" settings={loadMoreDataSetting} />
        </>
      ) : null}
    </div>
  );
}
