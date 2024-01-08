import React, { useState } from 'react';
import Layout from '@/component/layouts/layout';
import { Button, TextField } from '@mui/material';
import Banner from '@/component/props/banner';
import { getFormattedDate } from '@/lib/getDate';

import UploadArea from '@/component/props/uploadArea';
export default function Uploadmd() {
  const [postDetail, setPostDetail] = useState({
    title: '尚未命名的資料',
    subTitle: '',
    coverImg: '',
    create_date: getFormattedDate(),
    category: '',
    tags: [],
    content: '',
    contentType: 'markdown',
  });
  return (
    <Layout>
      <UploadArea />
    </Layout>
  );
}
