import React, { useEffect, useReducer, useState } from 'react';
import styles from './calculator.module.css';
export default function Calculator() {
  // const [count, dispatch] = useReducer(countReducer, 0);
  const [showValue, setShowValue] = useState('');
  const [calValue, setCalValue] = useState('');
  const [cal, setCal] = useState('');
  const [final, setFinal] = useState(null);
  // function countReducer(count, action) {
  //   switch (action.type) {
  //     case 'add':
  //       console.log(showValue);
  //       return count + 1;
  //     case 'sub':
  //       return count - 1;
  //     case 'mul':
  //       return count * 2;
  //     // case 'numberChange':
  //     //   return action.payload;
  //     default:
  //       return count;
  //   }
  // }

  const handleNumberChange = (e) => {
    let newValue = e.target.getAttribute('data-value');
    if (
      newValue == '+' ||
      newValue == '-' ||
      newValue == '*' ||
      newValue == '/'
    ) {
      setShowValue((prevValue) => prevValue + newValue);
      setCal(newValue);
      setCalValue((prevValue) => prevValue + cal + showValue);
      setShowValue('');
      console.log(showValue, 'show');
    } else if (newValue == '=') {
      console.log('e');
      setCalValue((prevValue) => prevValue + cal + showValue);
      setCal(newValue);
      setShowValue('');
      console.log('結果');
    } else {
      setShowValue((prevValue) => prevValue + newValue);
    }
    // dispatch({ type: 'numberChange', payload: newValue });
  };
  useEffect(() => {
    console.log('count now', calValue);
    console.log('showValue now', showValue);
    let final = eval(calValue);
    setFinal(final);
    console.log(final, 'fff');
  }, [showValue, calValue]);
  return (
    <div className={styles.container}>
      <input type="text" className={styles.output} disabled value={calValue} />
      <span className={styles.calSign}>{cal}</span>
      <input
        value={showValue ? showValue : final}
        className={styles.input}
        placeholder="input number"
        disabled
      />

      <table>
        <tbody>
          <tr>
            <td></td>
            <td>M2</td>
            <td data-value="(" onClick={handleNumberChange}>
              (
            </td>
            <td data-value=")" onClick={handleNumberChange}>
              )
            </td>
            <td data-value="/" onClick={handleNumberChange}>
              /
            </td>
          </tr>
          <tr>
            <td></td>
            <td data-value={7} onClick={handleNumberChange}>
              7
            </td>
            <td data-value={8} onClick={handleNumberChange}>
              8
            </td>
            <td data-value={9} onClick={handleNumberChange}>
              9
            </td>
            <td data-value="*" onClick={handleNumberChange}>
              *
            </td>
          </tr>
          <tr>
            <td></td>
            <td data-value={4} onClick={handleNumberChange}>
              4
            </td>
            <td data-value={5} onClick={handleNumberChange}>
              5
            </td>
            <td data-value={6} onClick={handleNumberChange}>
              6
            </td>
            <td data-value="-" onClick={handleNumberChange}>
              -
            </td>
          </tr>
          <tr>
            <td></td>
            <td data-value={1} onClick={handleNumberChange}>
              1
            </td>
            <td data-value={2} onClick={handleNumberChange}>
              2
            </td>
            <td data-value={3} onClick={handleNumberChange}>
              3
            </td>
            <td data-value="+" onClick={handleNumberChange}>
              +
            </td>
          </tr>
          <tr>
            <td></td>
            <td data-value={0} onClick={handleNumberChange}>
              0
            </td>
            <td data-value="." onClick={handleNumberChange}>
              .
            </td>
            <td
              colSpan={2}
              data-value="="
              onClick={handleNumberChange}
              // onClick={() => setShowValue((prevValue) => eval(prevValue))}
            >
              ={' '}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
