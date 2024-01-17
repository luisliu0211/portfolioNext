import Layout from '@/component/layouts/layout';
import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { getServerAuthSession } from '@/pages/api/auth/[...nextauth]';
import Cards from '@/component/props/cards';
import throttle from '@/lib/throttle';
import { resizeSet } from '@/utils/loadMoreData';
export default function PostRecap() {
  const { data, status } = useSession();
  const [isMobile, setIsMobile] = useState(false);
  const [postData, setPostData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(8);
  const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
  useEffect(() => {
    // console.log();
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/posts`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('資料庫抓的', result);

        setPostData({ dataName: 'posts', data: result });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
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
  }, []);

  return (
    <Layout>
      <Cards data={postData.data || []} isMobile={isMobile} editMode />
    </Layout>
  );
}

/**
 * @param {import('next').GetStaticPathsContext} ctx
 */

// // server side render (SSR) server 一開始處理抓取login 資料
export async function getServerSideProps(ctx) {
  const session = await getServerAuthSession(ctx.req, ctx.res);
  // const session = await getServerSession(ctx.req, ctx.res, authOptions);

  // 如果沒登入成功 返回首頁"/" 否則抓取user資料
  if (!session) {
    return {
      redirect: { destination: '/', permanent: false },
    };
  }
  return {
    props: {},
  };
}
