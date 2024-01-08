import React, { useEffect } from 'react';
import styles from './markdownContent.module.css';
import parse from 'html-react-parser';
import 'highlight.js/styles/github-dark.css';
import hljs from 'highlight.js/lib/core';

export default function MarkdownContent({ data }) {
  // 將 highlight.js 設定為使用 html-react-parser 的 replace 選項
  hljs.configure({ useBR: true });
  // 這是一個自訂的函式，用於處理節點
  const handleNode = (node) => {
    // 如果節點是 <pre> 標籤
    if (node.name === 'pre') {
      // 在這裡修改 <pre> 的樣式，例如加入自訂的 CSS 類名
      node.attribs.style = 'border-radius: 10px; padding: 10px;';
    }
    if (node.name === 'hr') {
      node.attribs.style = 'margin-block:10px';
    }
    // 如果節點是 <blockquote> 標籤
    if (node.name === 'blockquote') {
      // 在這裡修改 <blockquote> 的樣式，例如加入自訂的 CSS 類名
      node.attribs.style =
        'border-radius: 0px 10px 10px 0px; padding: 15px;background-color:lightgrey;border-left:5px solid black';
    }
    if (node.name === 'table') {
      // 在這裡修改 <blockquote> 的樣式，例如加入自訂的 CSS 類名
      node.attribs.style =
        'padding: 10px;border:1px solid black;border-collapse:collapse;margin-block:10px';
    }
    if (node.name === 'td') {
      // 在這裡修改 <blockquote> 的樣式，例如加入自訂的 CSS 類名
      node.attribs.style = 'padding: 10px;border:1px solid black;';
    }
    if (node.name === 'th') {
      // 在這裡修改 <blockquote> 的樣式，例如加入自訂的 CSS 類名
      node.attribs.style = 'padding: 10px;border:1px solid black;';
    }
    // 如果節點是 <code> 標籤
    if (node.name === 'code') {
      // 在這裡修改 <code> 的樣式，例如加入自訂的 CSS 類名
      node.attribs.style = 'border-radius: 5px; padding: 15px;';
    }
  };
  // 設定 html-react-parser 的選項，加入 replace 選項
  const parseOptions = {
    replace: handleNode,
  };
  useEffect(() => {
    const liWithInput = document.querySelectorAll('li:has(input)');
    liWithInput.forEach((li) => {
      // 如果找到了包含 input 的 li 元素
      if (li) {
        // 取得包含這個 li 的 ul 元素
        const ulContainingLi = li.closest('ul');
        ulContainingLi.style.paddingLeft = '10px';
      }
      li.style.listStyleType = 'none';
    });
  }, [data]);
  return <div className={styles.container}>{parse(data, parseOptions)}</div>;
}
