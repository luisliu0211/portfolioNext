import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './postDetail.module.css';
import MarkdownIt from 'markdown-it';
import { mdOpt } from '@/lib/markdownConfig';
import userDB from '@/userDB';
import MarkdownContent from '@/component/layouts/markdownContent';
import markdownItCheckbox from 'markdown-it-checkbox';
import { style } from '@mui/system';
import { Avatar } from '@mui/material';
export default function PostDetail(props) {
  const { data } = props;
  console.log(data);
  const md = MarkdownIt(mdOpt)
    .use(markdownItCheckbox)
    .use(require('markdown-it-highlightjs'));
  const [markdownContent, setMarkdownContent] = useState('');
  useEffect(() => {
    setMarkdownContent(md.render(data.content));
  }, [data]);
  const getSthById = (id, DB) => {
    const sthValue = DB.find((item) => item.id === id);
    return sthValue ? sthValue : undefined;
  };
  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.coverImg}
          style={{ backgroundImage: `url(${data.coverImage})` }}
        >
          <div className={styles.title}>{data.title}</div>
          <div className={styles.subtitle}>{data.subtitle}</div>
          <div className={styles.date}>{data.create_date.split('T')[0]}</div>
          {/* <div className={styles.authur}>{data.authur}</div> */}
          <Avatar className={styles.authur} alt={data.authur}>
            {getSthById(data.authur, userDB).name}
          </Avatar>
        </div>

        <MarkdownContent data={markdownContent} />
      </div>
    </>
  );
}
