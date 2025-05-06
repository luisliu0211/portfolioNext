import styles from './featureCard.module.css';
import Link from 'next/link';
import LoadMoreBtn from './loadMoreBtn';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function FeatureCard(props) {
  let { data } = props;
  const [filter, setFilter] = useState(4);
  console.log('FeatureCard received data:', data); // 添加调试日志

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

  if (!data || !data.dataName) {
    return null;
  }

  return (
    <div>
      {data.dataName === 'skills' && (
        <div className={styles.container}>
          {Object.entries(data.data).map(([categoryName, skills]) => (
            <li key={categoryName} className={styles.cardsSkills}>
              <div className={styles.cardInfo}>
                <div className={styles.textTitle}>{categoryName}</div>
                <div className={styles.skillList}>
                  {Array.isArray(skills) &&
                    skills.map((skill) => (
                      <div key={skill.id} className={styles.skillItem}>
                        <div className={styles.skillName}>
                          {skill.name || '未命名技能'}
                        </div>
                        <div className={styles.skillLevel}>
                          {typeof skill.level === 'number'
                            ? `${skill.level}%`
                            : skill.level || '0%'}
                        </div>
                        {skill.description && (
                          <div className={styles.skillDescription}>
                            {skill.description}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </li>
          ))}
        </div>
      )}

      {data.dataName === 'work' && (
        <>
          <div className={styles.container}>
            {Array.isArray(data.data) &&
              data.data.slice(0, filter).map((item) => (
                <Link
                  key={item.id}
                  href={item.links || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li className={styles.cardsWorks}>
                    <div className={styles.workInfo}>
                      <div className={styles.typeTag}>
                        {item.workType || '未分類'}
                      </div>
                      <div className={styles.textTitle}>{item.title}</div>
                      {Array.isArray(item.usingSkills) && (
                        <ul className={styles.tags}>
                          {item.usingSkills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      )}
                      {item.relatedImg && (
                        <Image
                          width={200}
                          height={100}
                          alt={item.title || '作品圖片'}
                          src={`/image/works/${item.relatedImg}`}
                        />
                      )}
                    </div>
                  </li>
                </Link>
              ))}
          </div>
          <LoadMoreBtn key="workLoad" settings={loadMoreDataSetting} />
        </>
      )}
    </div>
  );
}
