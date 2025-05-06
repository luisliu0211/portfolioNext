import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import { mdOpt } from '@/lib/markdownConfig';
import Layout from '@/component/layouts/layout';
import MarkdownContent from '@/component/layouts/markdownContent';
import markdownItCheckbox from 'markdown-it-checkbox';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
export default function Test() {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    const md = MarkdownIt(mdOpt)
      .use(markdownItCheckbox)
      .use(require('markdown-it-highlightjs'));

    // let t = 'http://localhost:8080';
    // 在这里发送请求获取 Markdown 内容，你可以使用 fetch 或其他请求库
    fetch(`${apiUrl}/api/posts/markdown`) // 根据你的后端路由来修改
      .then((response) => response.json())
      .then((data) => {
        // 使用 marked 将 Markdown 转换为 HTML
        console.log(data.markdownContent, 'dd');
        const result = md.render(data.markdownContent);
        setMarkdownContent(result);
      })
      .catch((error) => console.error('Error fetching Markdown:', error));
    // console.log(typeof markdownContent, 'mm');
  }, [markdownContent]);

  return (
    <Layout>
      {/* 将转换后的 HTML 内容渲染到页面 */}
      <MarkdownContent data={markdownContent} />
    </Layout>
  );
}
