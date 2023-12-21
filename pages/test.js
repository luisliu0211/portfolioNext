// pages/index.js

import { useState, useEffect } from 'react';
import Layout from '@/component/layouts/layout';
import axios from 'axios';
// import { loadPosts } from '@/lib/load-posts';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
const Test = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 客戶端渲染的資料請求
    const fetchData = async () => {
      try {
        let res = await axios.get(`${apiUrl}/api/posts`, {
          withCredentials: true,
        });
        const result = await res.data;
        setData(result);
        console.log('哈哈哈哈哈', result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // 執行資料請求
    fetchData();
  }, []); // 空的依賴陣列表示僅在組件初次渲染時執行

  return (
    <Layout>
      <div>
        <h1>Client-Side Rendering Example</h1>
        {data ? (
          <ul>
            {data.map((item, id) => (
              <li key={id}>{item.title}</li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
};

export default Test;
