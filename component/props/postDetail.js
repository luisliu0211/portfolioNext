import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './postDetail.module.css';
import MarkdownIt from 'markdown-it';
import { mdOpt } from '@/lib/markdownConfig';
import userDB from '@/userDB';
import MarkdownContent from '@/component/layouts/markdownContent';
import markdownItCheckbox from 'markdown-it-checkbox';
import { Avatar } from '@mui/material';
export default function PostDetail(props) {
  const { data } = props;
  if (!data || data.length === 0) {
    return <p>Data not available.</p>;
  }
  let itemDetail = data[0];
  const md = MarkdownIt(mdOpt)
    .use(markdownItCheckbox)
    .use(require('markdown-it-highlightjs'));
  const [markdownContent, setMarkdownContent] = useState('');
  useEffect(() => {
    setMarkdownContent(md.render(itemDetail.content));
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
          style={{ backgroundImage: `url(${itemDetail.coverImage})` }}
        >
          <div className={styles.title}>{itemDetail.title}</div>
          <div className={styles.subtitle}>{itemDetail.subtitle}</div>
          <div className={styles.date}>
            {itemDetail.create_date.split('T')[0]}
          </div>
          <Avatar
            className={styles.authur}
            alt={getSthById(itemDetail.authur, userDB)?.name}
          >
            {getSthById(itemDetail.authur, userDB)?.name}
          </Avatar>
        </div>

        <MarkdownContent data={markdownContent} />
      </div>
    </>
  );
}
