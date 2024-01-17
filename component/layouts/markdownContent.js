import React, { useEffect, useRef } from 'react';
import styles from './markdownContent.module.css';
import parse from 'html-react-parser';
import 'highlight.js/styles/github-dark.css';
import hljs from 'highlight.js/lib/core';

export default function MarkdownContent({ data }) {
  const containerRef = useRef(null);
  // 將 highlight.js 設定為使用 html-react-parser 的 replace 選項
  hljs.configure({ useBR: true });
  // 這是一個自訂的函式，用於處理節點
  const handleNode = (node, options) => {
    // 如果節點是 <pre> 標籤
    if (node.name === 'pre') {
      // 在這裡修改 <pre> 的樣式，例如加入自訂的 CSS 類名
      node.attribs.style = 'border-radius: 10px; padding: 10px;';
      // node.attribs.className = 'line';
    }
    if (
      node.name === 'h1' ||
      node.name === 'h2' ||
      node.name === 'h3' ||
      node.name === 'h4' ||
      node.name === 'h5' ||
      node.name === 'h6'
    ) {
      node.attribs.className = 'line';
    }
    if (node.name === 'hr') {
      node.attribs.style = 'margin-block:10px';
    }
    // 如果節點是 <blockquote> 標籤
    if (node.name === 'blockquote') {
      // 在這裡修改 <blockquote> 的樣式，例如加入自訂的 CSS 類名
      node.attribs.className = 'line';
      node.attribs.style =
        'border-radius: 0px 10px 10px 0px; padding: 15px;background-color:lightgrey;border-left:5px solid black';
    }
    if (node.name === 'table') {
      // 在這裡修改 <blockquote> 的樣式，例如加入自訂的 CSS 類名
      node.attribs.style =
        'padding: 10px;border:1px solid black;border-collapse:collapse;margin-block:10px';
    }
    if (node.name === 'td' || node.name === 'th') {
      // 在這裡修改 <blockquote> 的樣式，例如加入自訂的 CSS 類名
      node.attribs.style = 'padding: 10px;border:1px solid black;';
    }
    // 如果節點是 <code> 標籤
    // if (node.name === 'code' && node.children && Array.isArray(node.children)) {
    //   // 在处理 <code> 的情况
    //   node.attribs.style = 'border-radius: 5px; padding: 15px;';
    //   // node.attribs.class = 'code-container'; // 添加一个容器 class
    //   node.children = node.children
    //     .map((child) => {
    //       if (child.type === 'text' && child.data) {
    //         // 将文本节点替换成包装好的 <span>
    //         const lines = child.data.trim().split('\n');
    //         return lines.map((line) => {
    //           if (line.trim() !== '') {
    //             return {
    //               type: 'tag',
    //               name: 'span',
    //               attribs: {
    //                 className: 'line',
    //                 // style: 'display:block;',
    //               },
    //               children: [{ type: 'text', data: line }],
    //             };
    //           } else {
    //             // 空行不做处理，直接返回原始文本节点
    //             return child;
    //           }
    //         });
    //       } else {
    //         return child;
    //       }
    //     })
    //     .flat();
    // }

    // 如果節點是 <p> 標籤並且包含換行符
    if (node.name === 'p' && node.children && Array.isArray(node.children)) {
      const inputLabelPair = node.children.filter(
        (child) => child.name === 'input' || child.name === 'label'
      );
      if (inputLabelPair.length === 2) {
        node.children = [
          {
            type: 'tag',
            name: 'span',
            attribs: { className: 'line' },
            children: inputLabelPair,
          },
          ...node.children.filter(
            (child) =>
              child !== inputLabelPair[0] && child !== inputLabelPair[1]
          ),
        ].map((child) => {
          if (child && child.type === 'text' && child.data) {
            return {
              type: 'tag',
              name: 'span',
              attribs: { className: 'line' },
              children: [{ type: 'text', data: child.data.trim() }],
            };
          } else {
            return child;
          }
        });
      } else {
        // 不包含 <input> 和 <label>，处理普通的 <p> 元素
        node.children = node.children.map((child) => {
          if (child && child.type === 'text' && child.data) {
            return {
              type: 'tag',
              name: 'span',
              attribs: { className: 'line' },
              children: [{ type: 'text', data: child.data.trim() }],
            };
          } else {
            return child;
          }
        });
      }
    }
    // 如果節點是 <p> 標籤並且包含換行符
    if (node.name === 'li' && node.children && Array.isArray(node.children)) {
      console.log('in');
      const inputLabelPair = node.children.filter(
        (child) => child.name === 'input' || child.name === 'label'
      );
      if (inputLabelPair.length === 2) {
        console.log('有input label');
        // 包含 <input> 和 <label>，将它们用 <span> 包裹起来，再为 <span> 增加 class
        node.children = [
          {
            type: 'tag',
            name: 'span',
            attribs: { className: 'line' },
            children: inputLabelPair,
          },
          ...node.children.filter(
            (child) =>
              child !== inputLabelPair[0] && child !== inputLabelPair[1]
          ),
        ];
      } else {
        // 不包含 <input> 和 <label>，处理普通的 <li> 元素
        node.children = node.children.map((child) => {
          if (child && child.type === 'text' && child.data) {
            return {
              type: 'tag',
              name: 'span',
              attribs: { className: 'line' },
              children: [{ type: 'text', data: child.data.trim() }],
            };
          } else {
            return child;
          }
        });
      }
    }
  };
  // 設定 html-react-parser 的選項，加入 replace 選項
  const parseOptions = {
    replace: (node) => handleNode(node, { lineStart: true }),
  };
  useEffect(() => {
    const liWithInput = document.querySelectorAll('li:has(input)');
    const highlight = document.querySelectorAll('.highlighted');
    const hljs_tag = document.querySelectorAll('.hljs-tag');
    liWithInput.forEach((li) => {
      // 如果找到了包含 input 的 li 元素
      if (li) {
        // 取得包含這個 li 的 ul 元素
        const ulContainingLi = li.closest('ul');
        ulContainingLi.style.paddingLeft = '10px';
      }
      li.style.listStyleType = 'none';
    });
    highlight.forEach((h) => {
      if (h) {
        // h.style.backgroundColor = 'yellow';
      }
    });
    if (hljs_tag.length !== 0) {
      hljs_tag.forEach((t) => (t.style.diplay = 'inline-block'));
    }

    // console.log(highlight);
  }, [data]);
  return (
    <div className={styles.container} ref={containerRef}>
      {parse(data, parseOptions)}
    </div>
  );
}
