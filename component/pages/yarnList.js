import React, { useEffect } from 'react';
import QCard from '../layouts/qCard';
import styles from './yarnList.module.css';
import _ from 'lodash'; // 記得 import lodash
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
export default function YarnList(props) {
  const { yarnDB } = props;

  let machineList = [
    { id: 1, title: '經編' },
    { id: 2, title: '橫編YOKO' },
    { id: 3, title: '毛巾' },
    { id: 4, title: '台車' },
    { id: 5, title: '單面' },
    { id: 6, title: '單面大剖' },
    { id: 7, title: '雙面' },
    { id: 8, title: '螺紋' },
  ];
  let priceUnit = [
    { id: 1, title: 'USD/KG' },
    { id: 2, title: 'TWD/KG' },
  ];
  const initialYarnInfo = {
    // index: null,
    yarnSpec: null,
    yarnPort: 1,
    yarnSource: '',
    yarnPrice: null,
    yarnUnit: 1,
  };
  let dummyData = [
    {
      yarnSpec: 3,
      yarnPort: 20,
      yarnSource: '遠東',
      yarnPrice: 50,
      yarnUnit: 1,
    },
    {
      yarnSpec: 1,
      yarnPort: 30,
      yarnSource: '遠東',
      yarnPrice: 66,
      yarnUnit: 1,
    },
    {
      yarnSpec: 2,
      yarnPort: 50,
      yarnSource: '遠東',
      yarnPrice: 210,
      yarnUnit: 1,
    },
  ];

  const [yarnList, setYarnList] = useState([]);
  const [yarnInfo, setYarnInfo] = useState(initialYarnInfo);
  const [editingIndex, setEditingIndex] = useState(null);
  const [totalPort, setTotalPort] = useState(0);
  const [ifEdit, setIfEdit] = useState(false);
  const [yarnCostInfo, setYarnCostInfo] = useState({
    machineType: null,
    machineSpec: '',
    other: '',
    densityWarp: '',
    densityWeft: '',
    fabricProcessFee: null,
    fabricCost: null,
    totalWastage: null,
  });
  const handleAddNewYarn = () => {
    // console.log(yarnInfo);
    if (ifEdit) {
      alert('編輯尚未結束');
      return;
    }
    setYarnList((prevList) => [
      ...prevList,
      {
        ...yarnInfo,
        index: Number(yarnList.length + 1),
        yarnSpec: Number(yarnInfo.yarnSpec),
        yarnUnit: Number(yarnInfo.yarnUnit),
        yarnPrice: Number(yarnInfo.yarnPrice),
      },
    ]);
    setYarnInfo(initialYarnInfo);
    console.log(yarnList, ' add list');
  };

  const handleEditYarn = (index) => {
    setEditingIndex(index);
    setIfEdit(true);
    setYarnInfo(yarnList[index]);
  };

  const handleSaveYarn = () => {
    console.log(yarnList, yarnInfo, ' save list');
    setIfEdit(false);
    setYarnList((prevList) => {
      const newList = [...prevList];
      newList[editingIndex] = {
        ...yarnInfo,
        index: Number(yarnList.length + 1),
        yarnSpec: Number(yarnInfo.yarnSpec),
        yarnUnit: Number(yarnInfo.yarnUnit),
        yarnPrice: Number(yarnInfo.yarnPrice),
      };
      return newList;
    });
    setEditingIndex(null);
    setYarnInfo(initialYarnInfo);
  };

  const handleDeleteYarn = (index) => {
    var r = confirm('確認刪除？!');
    if (r == true) {
      setYarnList((prevList) => prevList.filter((_, i) => i !== index));
      setEditingIndex(null);
      setYarnInfo(initialYarnInfo);
    }
    return;
  };

  const handleDataChange = (e) => {
    console.log(e.target.name);
    if (
      e.target.name === 'machineSpec' ||
      e.target.name === 'other' ||
      e.target.name === 'densityWarp' ||
      e.target.name === 'densityWeft'
    ) {
      setYarnCostInfo({ ...yarnCostInfo, [e.target.name]: e.target.value });
    } else {
      setYarnCostInfo({
        ...yarnCostInfo,
        [e.target.name]: parseFloat(e.target.value),
      });
    }
  };
  useEffect(() => {
    // console.log(yarnInfo);
    // console.log(yarnCostInfo);
    setTotalPort(
      yarnList.reduce((total, yarn) => total + Number(yarn.yarnPort), 0)
    );
  }, [yarnInfo, yarnList, ifEdit, yarnCostInfo]);
  return (
    <>
      <QCard>
        <div className={styles.controlButton}>
          <div className={styles.title}>紗支分析</div>
          <button onClick={handleAddNewYarn}>新增紗支</button>
          <button onClick={() => setYarnList([])}>清空</button>
        </div>
        <hr />
        <table className={styles.table}>
          <thead>
            <tr>
              <th name="yarnNo">No</th>
              <th name="yarnSpec">紗支</th>
              <th name="yarnPort">比例%</th>
              <th name="yarnSouce">紗廠</th>
              <th name="yarnPrice">單價</th>
              <th name="controls">icon</th>
            </tr>
          </thead>
          <tbody className="yarnList">
            {yarnList.map((tr, index) => {
              return (
                <tr key={index} className={styles.trStyle}>
                  {editingIndex === index ? (
                    <EditYarnInfo
                      index={index}
                      yarnInfo={yarnInfo}
                      setYarnInfo={setYarnInfo}
                      onSave={handleSaveYarn}
                      onCancel={() => setEditingIndex(null)}
                      yarnDB={yarnDB}
                      priceUnit={priceUnit}
                    />
                  ) : (
                    <>
                      <td name="yarnNo">{index + 1}</td>
                      <td name="yarnSpec">
                        {getTitleById(tr.yarnSpec, yarnDB)}
                      </td>
                      <td name="yarnPort">{tr.yarnPort}%</td>
                      <td name="yarnSouce">{tr.yarnSource}</td>
                      <td name="yarnPrice">
                        <div>{_.toNumber(tr.yarnPrice).toLocaleString()}</div>
                        <div>{getTitleById(tr.yarnUnit, priceUnit)}</div>
                      </td>
                      <td name="controls">
                        <button onClick={() => handleEditYarn(index)}>
                          編
                        </button>
                        <button onClick={() => handleDeleteYarn(index)}>
                          刪
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td></td>
              <td style={{ color: totalPort != 100 ? 'red' : 'black' }}>
                {totalPort}%
              </td>
              <td></td>
              <td></td>
              <td rowSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </QCard>
      <QCard>
        <div className={styles.machineInfo}>
          <label>
            <span>機台種類</span>
            <select name="machineType" id="" onChange={handleDataChange}>
              {machineList.map((option, index) => {
                return (
                  <option key={index} value={option.id}>
                    {option.title}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            <span>機台規格</span>
            <input name="machineSpec" type="text" onChange={handleDataChange} />
          </label>
          <label>
            <span>備註</span>
            <input name="other" type="text" onChange={handleDataChange} />
          </label>
        </div>
        <div className={styles.machineInfo}>
          <label>
            <span>經密</span>
            <input name="densityWarp" type="text" onChange={handleDataChange} />
          </label>
          <label>
            <span>緯密</span>
            <input name="densityWeft" type="text" onChange={handleDataChange} />
          </label>
        </div>
        <div className={styles.yarnCost}>
          <label>
            <span>織布工繳</span>
            <input
              name="fabricProcessFee"
              type="number"
              onChange={handleDataChange}
            />
          </label>
          <label>
            <span>胚布成本</span>
            <input
              type="number"
              name="fabricCost"
              placeholder="TWD/KG"
              onChange={handleDataChange}
            />
          </label>
          <label>
            <span>總損耗</span>
            <input
              type="number"
              name="totalWastage"
              placeholder="%"
              onChange={handleDataChange}
            />
          </label>
        </div>
      </QCard>
    </>
  );
}

const EditYarnInfo = ({
  yarnInfo,
  setYarnInfo,
  onSave,
  onCancel,
  yarnDB,
  priceUnit,
  index,
}) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  return (
    <>
      {/* 編輯資訊的 UI 部分 */}
      <td name="yarnNo">{index + 1}</td>
      <td name="yarnSpec">
        {/* <select
          value={yarnInfo.yarnSpec}
          onChange={(e) => {
            setYarnInfo({ ...yarnInfo, yarnSpec: Number(e.target.value) });
          }}
        >
          <option value={0}>選擇紗支</option>
          {yarnDB.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select> */}
        {/* TODO: 自動輸入 */}
        <Autocomplete
          autoselectvalue={selectedItemId}
          onChange={(e, newValue) => {
            // 在这里设置选定项的 id
            if (newValue) {
              setSelectedItemId(newValue.id);
              console.log('Selected ID:', newValue.id);
              setYarnInfo({ ...yarnInfo, yarnSpec: Number(newValue.id) });
            } else {
              setSelectedItemId(null);
            }
          }}
          disablePortal
          id="combo-box-demo"
          options={yarnDB}
          // sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} />}
        />
      </td>
      <td>
        <input
          name="yarnPort"
          type="number"
          value={yarnInfo.yarnPort}
          onChange={(e) =>
            setYarnInfo({ ...yarnInfo, yarnPort: Number(e.target.value) })
          }
          min={1}
          max={100}
          step={0.1}
        />
      </td>
      <td>
        <input
          name="yarnSouce"
          type="text"
          value={yarnInfo.yarnSource}
          onChange={(e) =>
            setYarnInfo({ ...yarnInfo, yarnSource: e.target.value })
          }
        />
      </td>
      <td name="yarnPrice">
        <input
          type="number"
          value={yarnInfo.yarnPrice}
          onChange={(e) =>
            setYarnInfo({ ...yarnInfo, yarnPrice: Number(e.target.value) })
          }
          min={0}
          step={0.01}
        />
        <select
          value={yarnInfo.yarnUnit}
          onChange={(e) =>
            setYarnInfo({ ...yarnInfo, yarnUnit: Number(e.target.value) })
          }
        >
          {priceUnit.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
      </td>
      <td name="controls">
        <button onClick={onSave}>儲存</button>
        <button onClick={onCancel}>取消</button>
      </td>
    </>
  );
};
const getTitleById = (id, DB) => {
  const yarn = DB.find((yarn) => yarn.id === id);
  return yarn ? yarn.title : '未選擇紗支';
};
