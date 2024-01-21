import React, { useState, useMemo, useEffect } from 'react';

const UseMemo = ({ valueA, valueB }) => {
  // 使用 useState 定義一個狀態
  const [count, setCount] = useState(0);
  const [ifUpdate, setIfupdate] = useState(false);
  const [countObj, setCountObj] = useState({ count: 0 });
  // 使用 useMemo 計算衍生的值，並且指定依賴（這裡是 count）
  const expensiveValue = useMemo(() => {
    console.log('假設這是耗時的計算過程...');
    // 這裡可以是一個昂貴的計算過程
    return valueA * valueB;
  }, [valueA, valueB]); // 依賴 count 的變化
  const slowCountFunction = () => {
    for (let i = 0; i < 100; i++) {
      console.log('大量計算好久....');
    }
    setIfupdate(false);
    return '每次資料都一樣';
  };
  const aa = useMemo(() => slowCountFunction(), [ifUpdate]);
  const changeHandler = () => {
    setCount((perv) => perv + 1);
  };
  useEffect(() => {
    console.log(aa);
  }, [count]);
  return (
    <div>
      <p>目前值A: {valueA}</p>
      <p>目前值B: {valueB}</p>
      <div>count:{count}</div>
      <div>objCount:{countObj.count}</div>
      <button onClick={changeHandler}>count +1</button>
      <button
        onClick={() => {
          setCountObj({ count: countObj.count + 1 });
        }}
      >
        countObj +1
      </button>
      <div onClick={() => setIfupdate(true)}>ifUpdate </div>
      <input></input>
      <p>計算後的產出 ： {expensiveValue}</p>
      {/* <button onClick={() => setCount(count + 1)}>Increment Count</button> */}
    </div>
  );
};

export default UseMemo;
