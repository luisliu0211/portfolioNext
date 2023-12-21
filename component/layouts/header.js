import styles from './header.module.css';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Navbar_main from '../props/navbar_main';
import { scrollHeight } from '@/lib/scrolls';
import throttle from '@/lib/throttle'; // 從lodash中導入throttle函數

export default function Header() {
  const [isFixed, setIsFixed] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollHeight = scrollHeight(window);
      setIsFixed(currentScrollHeight > 0);
    }, 200);
    // 根據需要調整節流時間
    setHeaderHeight(headerRef.current.clientHeight);
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 在组件卸载时移除事件监听器
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const containerClasses = `${styles.container} ${
    isFixed ? styles.fixedHeader : ''
  }`;
  return (
    <>
      <div style={{ height: isFixed ? headerHeight : '0' }}></div>
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
