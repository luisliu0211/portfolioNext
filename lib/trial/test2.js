import React, { memo, useState, useMemo, useCallback } from 'react';

export default function Test2() {
  console.log('父組件 渲染');
  const [count, setCount] = useState(0);
  const [valueA, setVa] = useState(0);
  const [valueB, setVb] = useState(0);
  const [data, setData] = useState({ content: '' });
  const handleInput = useCallback((e) => {
    setData({ content: e.target.value });
  }, []);
  const randomFunction = () => {
    return Math.random();
  };
  const randomValue = useMemo(() => {
    return Math.random() * 10;
  }, []);
  // console.log(randomFunction());
  console.log(randomValue);
  return (
    <>
      <div>Parent</div>
      <div>content:{data.content}</div>
      <div>count:{count}</div>
      <button onClick={() => setCount((prev) => prev + 1)}>click</button>
      <Child handleInput={handleInput} />
      <button onClick={() => setVa((prev) => prev + 1)}>a+1</button>
      <button onClick={() => setVb((prev) => prev + 1)}>b+1</button>
      <Calculate valueA={valueA} valueB={valueB} />
    </>
  );
}

const Child = memo(
  function Child({ handleInput }) {
    console.log('子組件渲染');
    return (
      <>
        <div>Child Input</div>
        <input type="text" onChange={handleInput} />
      </>
    );
  },
  () => 'Child'
);
const Calculate = memo(function Calculate({ valueA, valueB }) {
  console.log('子組件calculate渲染');
  console.log(valueA, valueB);
  const result = useMemo(() => {
    console.log('result');
    return valueA + valueB;
  }, [valueA, valueB]);
  return (
    <>
      <div>Result:{result}</div>
    </>
  );
});
