import Layout from '@/component/layouts/layout';
import Content from '@/component/layouts/content';
import { useEffect, useState } from 'react';
const apiUrl = process.env.REACT_APP_API_URL;
export default function Works({ workData }) {
  // console.log(workData);
  if (!workData) {
    return (
      <>
        <Layout>
          {' '}
          <div>Loading...</div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Layout>
        <Content data={workData} />
      </Layout>
    </>
  );
}

//抓取靜態資料（來自資料庫）
export async function getStaticProps() {
  try {
    let workDataUrl = `${apiUrl}/api/works`;
    const response = await fetch(workDataUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return {
      props: {
        workData: { dataName: 'work', data },
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        workData: null,
      },
    };
  }
}
