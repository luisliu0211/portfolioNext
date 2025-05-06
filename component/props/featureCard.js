import styles from './featureCard.module.css';
import Link from 'next/link';
import LoadMoreBtn from './loadMoreBtn';
import Image from 'next/image';
import { useEffect, useState } from 'react';
export default function FeatureCard(props) {
  let { data } = props;
  const [filter, setFilter] = useState(4);
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
          {Object.entries(data.data).map(([categoryName, skills]) => (
            <li key={categoryName} className={styles.cardsSkills}>
              <div className={styles.cardInfo}>
                <div className={styles.textTitle}>{categoryName}</div>
                <div className={styles.skillList}>
                  {skills.map((skill) => (
                    <div key={skill.id} className={styles.skillItem}>
                      <div className={styles.skillLevel}>{skill.name}</div>
                      <div className={styles.skillLevel}>{skill.level}</div>
                      <div className={styles.skillDescription}>
                        {skill.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </div>
      ) : null}

      {data.dataName == 'work' ? (
        <>
          <div className={styles.container}>
            {data.data.slice(0, filter).map((item) => {
              {
                /* let newArr = JSON.parse(item.usingSkills); */
              }
              return (
                <Link
                  key={item.id}
                  href={item.demo_url ? item.demo_url : ''}
                  target="_blank"
                >
                  <li
                    className={styles.cardsWorks}
                    style={{
                      backgroundImage: `url(/image/works/${item.cover_image})`,
                    }}
                  >
                    <div className={styles.workInfo}>
                      <div className={styles.typeTag}>{item.workType}</div>
                      <div>{item.title}</div>
                      <div>{item.subtitle}</div>
                      <div>{item.github_url}</div>
                      <div>{item.demo_url}</div>
                      <Image
                        width={200}
                        height={100}
                        alt={item.title}
                        src={item.cover_image}
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
