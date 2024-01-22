import React, { useState, useCallback, useMemo } from 'react';

export default function Test() {
  const [count, setCount] = useState(0);
  const [items, setItem] = useState(0);
  const clickHandler = () => {
    setCount((prev) => prev + 1);
  };
  console.log('父層組件 渲染', count);
  console.log('父層組件 渲染', items);
  const itemA = '回傳的props非object';
  const itemB = { content: 'props in obj by react.memo' };
  // 使用useCallback把資料包成function;
  const dataInUseCallback = useCallback(() => {
    return { content: 'obj useCallback' };
  }, []);
  const dataInUseMemo = useMemo(() => {
    return { content: 'obj useMemo' };
  }, [items]);
  return (
    <>
      <button onClick={clickHandler}>click +1 </button>
      <button onClick={() => setItem((prev) => prev - 1)}>click-1</button>
      <h4 className="item">Parent</h4>
      <Child item={itemA} />
      <Child item={items} />
      <Child item={itemB} />
      <Child item={dataInUseCallback} />
      <Child item={dataInUseMemo} />
    </>
  );
}

// child component
const Child = React.memo(
  function Child({ item, items }) {
    console.log('子組件被重新渲染的資料', item);
    // 如果 item 是函數，則呼叫它以獲取返回的物件
    const data = typeof item === 'function' ? item() : item;
    return (
      <>
        <h3 className="item">Child</h3>
        <span className="child">{data.content ? data.content : data}</span>
        <span className="items">{items}</span>
        <hr />
      </>
    );
  },
  () => 'Child'
);
