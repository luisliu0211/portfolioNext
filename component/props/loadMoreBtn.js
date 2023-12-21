import Link from 'next/link';
import styles from './loadMoreBtn.module.css';
import { useEffect } from 'react';
import { loadMoreData } from '../../utils/loadMoreData';
export default function LoadMoreBtn({ settings }) {
  let {
    loadNum,
    maxItem,
    filter,
    setFilter,
    ifOverMaxShow,
    showName,
    newRoute,
    LoadTitle,
  } = settings;
  useEffect(() => {
    if (ifOverMaxShow) {
      document.querySelector('.seeMore').style.display = 'none';
    }

    // loadMoreData(loadNum, maxItem, filter, setFilter, ifOverMaxShow);
  }, []);
  return (
    <>
      <div
        className={`${styles.loadMore} loadMore`}
        onClick={() =>
          loadMoreData(loadNum, maxItem, filter, setFilter, ifOverMaxShow)
        }
      >
        {LoadTitle}
      </div>
      {ifOverMaxShow ? (
        <div className={`${styles.loadMore} seeMore`}>
          <Link href={newRoute}>{showName}</Link>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
