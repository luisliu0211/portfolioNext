import React, { useState, useEffect, useCallback } from 'react';

export default function Cb() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');
  const childCount = useCallback(() => {
    return [count + 1, count + 2, count + 3];
  }, [count]);
  return (
    <>
      <div>
        <h1>現在號碼：{count}</h1>

        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="無關緊要的 input"
        />

        <Child childCount={childCount} />

        <button
          onClick={() => {
            setCount((state) => state + 1);
          }}
        >
          下一位
        </button>
      </div>
    </>
  );
}

const Child = (props) => {
  const { childCount } = props;

  const [count, setCount] = useState([]);
  useEffect(() => {
    console.log('子組件渲染');
    setCount(childCount());
  }, [childCount]);

  return <h1>排隊號碼：{count.join(', ')}</h1>;
};
