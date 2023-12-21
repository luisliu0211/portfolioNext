import styles from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import NavBar_sub from '../props/navBar_sub';
import Social from '../social';
import { useEffect, useRef } from 'react';

export default function Footer() {
  // TODO: 偵測動態body高度
  function getTotalHeightWithMargin(element) {
    const computedStyle = window.getComputedStyle(element);
    const height = element.offsetHeight;
    const marginTop = parseFloat(computedStyle.marginTop);
    const marginBottom = parseFloat(computedStyle.marginBottom);

    // 計算總高度，包括 margin
    const totalHeight = height + marginTop + marginBottom;
    // console.log('計算出來的高度', totalHeight);
    return totalHeight;
  }
  function adjustFooter() {
    const bodyTop = window.offsetHeight;
    let footer = document.querySelector('footer');
    let browserHeight = window.innerHeight;
    let bodyHeight = getTotalHeightWithMargin(document.body);
    const footerHeight = footer.offsetHeight;
    if (bodyHeight + footerHeight <= browserHeight) {
      // footer.style.bottom = '0px';
      // footer.style.position = 'fixed'; // 设置为 fixed，以保持在底部
    } else {
      footer.style.position = 'relative';
    }
  }

  return (
    <>
      <footer className={styles.container}>
        <div className={styles.column}>
          <NavBar_sub />
        </div>
        <div className={styles.column}>
          <Social />
        </div>
      </footer>
    </>
  );
}
