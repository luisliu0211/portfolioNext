import React, { useEffect, useRef, useState } from 'react';

export default function Test3() {
  const ref = useRef(null);
  const [name, setName] = useState('');
  const prevName = useRef('');
  console.log(ref.current);
  useEffect(() => {
    ref.current.style.color = 'red';
    prevName.current = name;
  }, [name]);

  return (
    <>
      <div
        style={{ width: '100px', height: '200px', backgroundColor: 'green' }}
        ref={ref}
      >
        test
      </div>
      <div>
        now Value is{name}, previous value is: {prevName.current}.
      </div>
      <input type="text" onChange={(e) => setName(e.target.value)} />{' '}
    </>
  );
}
