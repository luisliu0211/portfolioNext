// pages/index.js
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@/component/layouts/layout';
import axios from 'axios';
import Link from 'next/link';
import UseMemo from '@/lib/trial/useMemo';
import ParentComponent from '@/lib/trial/useCallback';
import Test from '@/lib/trial/test';
import Test1 from '@/lib/trial/test1';
import Test2 from '@/lib/trial/test2';

import useAxios from '@/hook/useAxios';
import Test3 from '@/lib/trial/test3';

// import { loadPosts } from '@/lib/load-posts';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
const PostList = () => {
  const [data, setData] = useState(null);
  const [valueA, setValueA] = useState(10);
  const [valueB, setValueB] = useState(20);
  const [title, setTitle] = useState('我是標題');
  const { isLoading, error, sendRequest: fetchData } = useAxios();

  // 使用 useCallback 缓存回调函数，依赖项为 count
  const handleClick = useCallback(() => {
    console.log(`Button clicked! name: ${title}`);
  }, [title]);
  useEffect(() => {
    // 客戶端渲染的資料請求
    // const fetchData = async () => {
    //   try {
    //     let res = await axios.get(`${apiUrl}/api/posts`, {
    //       withCredentials: true,
    //     });
    //     const result = await res.data;
    //     setData(result);
    //     console.log('哈哈哈哈哈', result);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    // 執行資料請求
    // fetchData();
  }, []); // 空的依賴陣列表示僅在組件初次渲染時執行
  useEffect(() => {
    fetchData({ url: '/api/works' }, (res) => {
      console.log(res);
      setData(res);
    });
  }, []);
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  return (
    <Layout>
      <div>
        <h1>文章列表</h1>
        {/* {data ? (
          <ul>
            {data.map((item, id) => (
              <Link key={id} href={`/posts/${item.id}`}>
                <li>{item.title}</li>
              </Link>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )} */}
      </div>

      {/* <UseMemo valueA={valueA} valueB={valueB} />

      <h1>{title}</h1>
      <button onClick={() => setTitle('change title')}>change title</button>
      <Child name="luis" />
      <button onClick={handleClick}>Click me</button>
      <ParentComponent />

      <hr /> */}
      <button
        onClick={() => {
          setValueA(valueA + 1);
        }}
      >
        test
      </button>
      {/* <Test />
      <Test1 />
      <Test2 /> */}
      <Test3 />
    </Layout>
  );
};

export default PostList;

const Child = React.memo(function Child(props) {
  console.log('子組件rerender');
  return (
    <>
      <h1>{props.name}</h1>
    </>
  );
});
