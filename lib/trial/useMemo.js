import React, { useState, useMemo } from 'react';

const UseMemo = ({ data }) => {
  // 使用 useState 定義一個狀態
  const [count, setCount] = useState(0);

  // 使用 useMemo 計算衍生的值，並且指定依賴（這裡是 count）
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensiveValue...');
    // 這裡可以是一個昂貴的計算過程
    return count * 2;
  }, [count]); // 依賴 count 的變化

  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
};

export default UseMemo;
