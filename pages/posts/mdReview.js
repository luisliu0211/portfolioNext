import React from 'react';
import Layout from '@/component/layouts/layout';
import { text } from '@/lib/mdText';
import { mdOpt } from '@/lib/markdownConfig';
import MarkdownIt from 'markdown-it';
import MarkdownContent from '@/component/layouts/markdownContent';
import markdownItCheckbox from 'markdown-it-checkbox';

// 初始化 MarkdownIt，並啟用 highlight.js 支援
const md = MarkdownIt(mdOpt)
  .use(markdownItCheckbox)
  .use(require('markdown-it-highlightjs'));

const result = md.render(text);
export default function MdReview() {
  return (
    <Layout>
      <MarkdownContent data={result} />
    </Layout>
  );
}
