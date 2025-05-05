import styles from './header.module.css';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Navbar_main from '../props/navbar_main';
import throttle from '@/lib/throttle'; // 從lodash中導入throttle函數

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const [prevPosition, setPrevPosition] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    const headerHeight = headerRef.current.getBoundingClientRect().height;
    setHeaderHeight(headerHeighxt);
    // 根據需要調整節流時間
    const handleScroll = throttle(() => {
      setPrevPosition(window.scrollY);
      if (headerRef.current) {
        //判斷header是否往上滑
        if (window.scrollY < prevPosition || window.scrollY <= headerHeight) {
          // console.log('向上滾動');
          setIsScrolled(false);
        } else {
          // console.log('向下滾動');
          setIsScrolled(true);
        }
      }
    }, 200);
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 在组件卸载时移除事件监听器
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevPosition]);
  const containerClasses = `${styles.container} ${
    isScrolled ? styles.scrolled : ''
  }`;
  return (
    <>
      <div style={{ height: headerHeight, backgroundColor: 'darkgrey' }}></div>
      <header ref={headerRef} className={containerClasses}>
        <div className={styles.logoBar}>
          <Link href="/">
            <div className={styles.logoImg}></div>
            <div className={styles.logoText}>
              <h3>Luis&apos; Blog</h3>
              <h5>Just porfolio</h5>
            </div>
          </Link>
        </div>
        <Navbar_main />
      </header>
    </>
  );
}
