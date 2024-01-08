'use client';
import Layout from '@/component/layouts/layout';
import Breadcrumbs from '@/component/props/breadcrumbs';
import Cards from '@/component/props/cards';
import styles from './post.module.css';
import { useRouter } from 'next/router';
import FilterBar from '@/component/props/filterBar';
import axios from 'axios';
import { loadPosts } from '@/lib/load-posts';
import MyContext from '@/lib/context';
import { getFormattedDate } from '@/lib/getDate';
import { useEffect, useState } from 'react';
import Pagination from '@/component/pagination';
import { resizeSet } from '@/utils/loadMoreData';
import throttle from '@/lib/throttle';
import CircularProgress from '@mui/material/CircularProgress';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
const context = {
  order: 'ASC',
  dateRangeFrom: '2023-01-01',
  dateRangeTo: '2024-12-31',
  category: '',
  keywordSearch: '',
  tags: [],
};
export default function Posts() {
  const [postData, setPostData] = useState({});
  const [filter, setFilter] = useState(context);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [itemPerPage, setItemPerPage] = useState(6); // 每頁顯示筆數
  const router = useRouter();
  let nowPage = router.asPath;
  let title =
    nowPage.split('/').length == 2
      ? nowPage.split('/')[1].toUpperCase()
      : nowPage.split('/')[2].toUpperCase();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(filter).toString();
        console.log(queryParams, 'query');
        let t = 'http://localhost:8080';
        const response = await fetch(`${t}/api/posts?${queryParams}`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('資料庫抓的', result);
        const totalItems = result.length;
        // console.log(totalItems, '總數量');
        const totalPages = Math.ceil(totalItems / itemPerPage);
        // console.log(totalPage, '總頁數');
        // 計算要顯示的資料範圍
        // 計算起點
        const startIndex = (currentPage - 1) * itemPerPage;
        // 計算終點
        const endIndex = startIndex + itemPerPage;
        // 顯示的資料
        let displayedData;

        if (totalItems > itemPerPage) {
          displayedData = result.slice(startIndex, endIndex);
        } else {
          displayedData = result.slice(0, totalItems);
        }
        setPostData({ dataName: 'posts', data: displayedData });
        setTotalPage(totalPages); // 根據data總頁數
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    console.log(filter);
  }, [filter, currentPage, itemPerPage]);

  useEffect(() => {
    resizeSet(setIsMobile, setItemPerPage);
    const handleResize = throttle(() => {
      setCurrentPage(1);
      resizeSet(setIsMobile, setItemPerPage);
    }, 200);
    // 註冊resize事件
    window.addEventListener('resize', handleResize);
    // 移除reisze
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setCurrentPage]);

  return (
    <Layout>
      <div className={styles.container}>
        <h1>{title}</h1>
        <hr />
        <MyContext.Provider
          value={{
            filter,
            setFilter,
            currentPage,
            setCurrentPage,
            totalPage,
            isMobile,
          }}
        >
          <FilterBar />
          {postData.data ? (
            <>
              {' '}
              <Cards data={postData.data || []} />
              <Pagination />
            </>
          ) : (
            <CircularProgress />
          )}
        </MyContext.Provider>
      </div>
    </Layout>
  );
}
