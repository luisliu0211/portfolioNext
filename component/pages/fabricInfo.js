import React, { useEffect } from 'react';
import QCard from '../layouts/qCard';
import styles from './fabricInfo.module.css';
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
export default function FabricInfo(props) {
  const { clientDB } = props;
  const [fabricInfo, setFabricInfo] = useState({
    clientName: 0,
    fabricItem: '',
    description: '',
    width: null,
    gsm: null,
    gy: null,
    recordDate: '',
  });
  const [selectedItemId, setSelectedItemId] = useState(fabricInfo.clientName);
  const handleTextChange = (e) => {
    setFabricInfo({ ...fabricInfo, [e.target.name]: e.target.value });
  };
  const handleNumberChange = (e) => {
    // 把value改成數字運算
    let target = parseFloat(e.target.value);
    const { width, gsm } = fabricInfo;
    setFabricInfo({
      ...fabricInfo,
      [e.target.id]: target,
    });
    const roundedWidth = width !== null ? width : 0;
    const roundedGsm = gsm !== null ? gsm : 0;
    switch (e.target.id) {
      case 'width':
        if (gsm !== null && width !== null) {
          let newGy = (((target + 2) * roundedGsm) / 43).toFixed(2);
          setFabricInfo({
            ...fabricInfo,
            gy: parseFloat(newGy),
            width: target,
          });
        }
        break;
      case 'gsm':
        if (gsm !== null && width !== null) {
          let newGy = (((roundedWidth + 2) * target) / 43).toFixed(2);
          setFabricInfo({
            ...fabricInfo,
            gy: parseFloat(newGy),
            gsm: target,
          });
        }
        break;
    }
  };
  const foundClient = clientDB.find(
    (client) => client.id === fabricInfo.clientName
  );
  useEffect(() => {
    console.log(fabricInfo);
  }, [fabricInfo]);

  return (
    <QCard>
      <div className={styles.container}>
        <div className={styles.productInfo}>
          <label htmlFor="">
            <span>客戶</span>
            {/* TODO: 自動輸入 */}
            {/* <Autocomplete
              autoselectvalue={selectedItemId}
              onChange={(event, newValue) => {
                // 在这里设置选定项的 id
                if (newValue) {
                  setSelectedItemId(newValue.id);
                  console.log('Selected ID:', newValue.id);
                } else {
                  setSelectedItemId(null);
                }
              }}
              disablePortal
              id="combo-box-demo"
              options={clientDB}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
            /> */}
            <select id="clientName" onChange={handleNumberChange}>
              <option value={0}>選擇客戶</option>
              {clientDB.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.team}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            <span>布號</span>
            <input type="text" name="fabricItem" onChange={handleTextChange} />
          </label>
          <label htmlFor="">
            <span>品牌</span>
            <input
              defaultValue={foundClient ? foundClient.name : ''}
              type="text"
            />
          </label>
        </div>
        <hr />
        <div className={styles.productDescription}>
          <label htmlFor="">
            <span>品名</span>
            <input name="description" type="text" onChange={handleTextChange} />
          </label>
        </div>
        <div className={styles.productSpec}>
          <label htmlFor="">
            <span>幅寬</span>
            <input
              // value={fabricInfo.width}
              min={0}
              step={0.1}
              id="width"
              name="width"
              type="number"
              onChange={handleNumberChange}
            />
          </label>
          <label htmlFor="">
            <span>克重</span>
            <input
              // value={fabricInfo.gsm}
              min={0}
              step={0.1}
              id="gsm"
              name="gsm"
              type="number"
              onChange={handleNumberChange}
            />
          </label>
          <label htmlFor="">
            <span>碼重</span>
            <input
              // min={0}
              value={fabricInfo.gy}
              // step={0.1}
              id="gy"
              name="gy"
              type="number"
              disabled
              // onChange={handleNumberChange}
            />
          </label>
          <label htmlFor="">
            <span>報價日</span>
            <input onChange={handleTextChange} name="recordDate" type="date" />
          </label>
        </div>
      </div>
    </QCard>
  );
}
