import React, { useState, useCallback } from 'react';

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  // 定義一個函數，用來接收子 component 計算好的值
  const handleIncrement = useCallback(() => {
    // 使用異步的 setState，React 會合併多個 setState 呼叫
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      {/* 傳遞函數給多個 ChildComponent */}
      <ChildComponent onIncrement={handleIncrement} />
      <ChildComponent onIncrement={handleIncrement} />
    </div>
  );
};

const ChildComponent = ({ onIncrement }) => {
  // 當需要計算值時，呼叫 onIncrement callback 函數
  const handleIncrementClick = () => {
    // 呼叫父 component 傳遞的 callback 函數，這裡可能觸發兩次
    onIncrement();
  };

  return (
    <div>
      {/* 觸發增加 count */}
      <button onClick={handleIncrementClick}>Increment in Child</button>
    </div>
  );
};

export default ParentComponent;
