import Head from 'next/head';
import Banner from '@/component/props/banner';
import Header from '@/component/layouts/header';
import Footer from '@/component/layouts/footer';
import Layout from '@/component/layouts/layout';
import Cards from '@/component/props/cards';
import { useState, useEffect } from 'react';
import { loadPosts } from '@/lib/load-posts';
import { signOut, signIn, useSession } from 'next-auth/react';
import ButtonUsage from '@/component/props/dialog';
import { resizeSet } from '@/utils/loadMoreData';
import MyContext from '@/lib/context';
import throttle from '@/lib/throttle';
import Column from '@/component/layouts/column';
export default function Home({ postData }) {
  const { data: session, status } = useSession();
  const [itemPerPage, setItemPerPage] = useState(6);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    resizeSet(setIsMobile, setItemPerPage);
    const handleResize = throttle(() => {
      resizeSet(setIsMobile, setItemPerPage);
    }, 200);
    // 添加窗口大小改变事件监听
    window.addEventListener('resize', handleResize);
    // 在组件卸载时移除事件监听
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  let filterData;
  if (postData) {
    filterData = postData.data.slice(0, itemPerPage);
  } else {
    filterData = [];
  }

  if (session) {
    // console.log(session, 'f');
    // 其他用户信息...
  } else {
    // console.log('No session available');
  }
  if (!postData) {
    return (
      <>
        <Head>
          <title>Home Page</title>
          <meta name="description" content="This is Luis' Portfolio Website" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon-1.ico" />
        </Head>
        <Layout>
          <div>Loading...</div>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-1.ico" />
      </Head>
      <Header />
      <Banner />
      {/* {session && (
        <div>
          <h1>Welcome, {session.user.name}!</h1>
          <p>Email: {session.user.email}</p>
        </div>
      )} */}
      {/* <button onClick={signOut}>登出</button> */}

      <div style={{ padding: '30px 20px' }}>
        <h1 style={{ display: 'block', textAlign: 'center' }}>Lastest Posts</h1>
        <hr />
        <MyContext.Provider value={{ isMobile }}>
          <Column>
            {' '}
            <Cards data={filterData || []} />
          </Column>
        </MyContext.Provider>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  try {
    const data = await loadPosts();
    console.log(data, 'ddd');
    return {
      props: {
        postData: { dataName: 'posts', data },
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        postData: null,
      },
    };
  }
}
