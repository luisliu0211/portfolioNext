import { useState, useEffect } from 'react';

export function useCheckMobile() {
  const [ifMobile, setIfMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIfMobile(window.innerWidth <= 576);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    // 更新 windowSize
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return ifMobile;
}
