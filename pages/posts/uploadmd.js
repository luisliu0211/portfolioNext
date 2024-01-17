import React, { useState } from 'react';
import Layout from '@/component/layouts/layout';
import { Button, TextField } from '@mui/material';
import { getFormattedDate } from '@/lib/getDate';

import UploadArea from '@/component/props/uploadArea';
import { signOut, useSession } from 'next-auth/react';
import { getServerAuthSession } from '@/pages/api/auth/[...nextauth]';
export default function Uploadmd() {
  const { data, status } = useSession();
  // console.log(data);
  if (status === 'loading') {
    return <h3>loading...</h3>;
  }
  if (status === 'unauthenticated') {
    return <h3>{status}</h3>;
  }
  // const [postDetail, setPostDetail] = useState({
  //   title: '尚未命名的資料',
  //   subTitle: '',
  //   coverImg: '',
  //   create_date: getFormattedDate(),
  //   category: '',
  //   tags: [],
  //   content: '',
  //   contentType: 'markdown',
  // });
  return (
    <Layout>
      <UploadArea />
    </Layout>
  );
}

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
