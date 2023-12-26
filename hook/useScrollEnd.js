import { useState, useEffect } from 'react';
export function useScrollEnd() {
  const [page, setPage] = useState(1);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]); // 注意：這裡將 page 添加到 useEffect 的依賴項中
  return page;
}
