import React, { useState, useCallback, useMemo } from 'react';

export default React.memo(
  function Test() {
    const [count, setCount] = useState(0);
    const clickHandler = () => {
      setCount((perv) => perv + 1);
    };
    console.log('父層組件 渲染', count);
    const itemA = 'test in string by react.memo';
    const itemB = { content: 'test in obj by react.memo' };

    // 使用useCallback把資料包成function;
    const dataInUseCallback = useCallback(() => {
      return { content: 'test in obj useCallback' };
    }, []);
    const dataInUseMemo = useMemo(() => {
      return { content: 'test in obj useMemo' };
    }, []);
    return (
      <>
        <button onClick={clickHandler}>click +1 </button>
        <span className="item">Parent</span>
        <Child item={itemA} />
        <Child item={itemB} />
        <Child item={dataInUseCallback} />
        <Child item={dataInUseMemo} />
      </>
    );
  },
  () => 'Test'
);
// child component
const Child = React.memo(
  function Child({ item }) {
    console.log('子組件被重新渲染的資料', item);
    // 如果 item 是函數，則呼叫它以獲取返回的物件
    const data = typeof item === 'function' ? item() : item;
    return (
      <>
        <h3 className="item">Child</h3>
        {/* <span className="child">{item.content ? item.content : item}</span> */}
        <span className="child">{data.content ? data.content : data}</span>
        <hr />
      </>
    );
  },
  () => 'Child'
);
