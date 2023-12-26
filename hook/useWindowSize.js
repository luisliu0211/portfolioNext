import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(null);

  useEffect(() => {
    // 定义 resize 事件处理函数
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      // 更新 windowSize
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 添加 window resize 事件监听器
    window.addEventListener('resize', handleResize);

    // 在组件卸载或下一次 effect 执行前，移除事件监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 这个 effect 只在 component 加载时执行

  return windowSize;
}
