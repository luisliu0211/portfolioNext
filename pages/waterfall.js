import Layout from '@/component/layouts/layout';
import CardwithWaterfall from '@/component/pages/cardwithWaterfall';
import React, { useState, useEffect } from 'react';

export default function Waterfall() {
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    const limit = 10; // 這裡設定為需要的條數
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`,
          {
            credentials: 'include',
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setCardData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <CardwithWaterfall data={cardData} />
    </Layout>
  );
}
