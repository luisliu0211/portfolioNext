import React, { useState, useCallback, memo } from 'react';

export default function Test1() {
  const [count, setCount] = useState(0);
  console.log('觸發父層渲染');

  // const resetCount = () => {
  //   setCount(0);
  // };
  const resetCountCallBack = useCallback(() => {
    setCount(0);
  }, []);
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((count) => count + 1)}>Increment</button>
      {/* <Child reset={resetCount} /> */}
      <Child reset={resetCountCallBack} />
    </>
  );
}

const Child = memo(
  function Child({ reset }) {
    console.log('觸發子層渲染');
    return (
      <>
        <p>resets count</p>

        <button onClick={reset}>Reset Count</button>
      </>
    );
  },
  () => 'Child'
);
