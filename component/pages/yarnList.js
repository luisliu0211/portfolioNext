import React, { useEffect } from 'react';
import QCard from '../layouts/qCard';
import styles from './yarnList.module.css';
import _ from 'lodash'; // 記得 import lodash
import { useState, useContext, useRef } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import MenuItem from '@mui/material/MenuItem';
import MyContext from '@/lib/context';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';

export default function YarnList(props) {
  const { componentID, yarnDB, machineList, priceUnit } = props;
  const {
    dispatch,
    quote,
    updateTextField,
    updateNumberField,
    deleteListInfo,
  } = useContext(MyContext);
  const initialYarnInfo = {
    yarnSpec: null,
    yarnPort: 0,
    yarnSource: '',
    yarnPrice: null,
    yarnUnit: 2,
    yarnType: '',
  };
  const [editingIndex, setEditingIndex] = useState(null);
  const [totalPort, setTotalPort] = useState(0);
  const [ifEdit, setIfEdit] = useState(false);
  const [machineType, setMachineType] = useState(quote.yarnCost.machineType);
  const [totalYarnCost, setTotalYarnCost] = useState(null);
  const isFirstRender = useRef(true);
  const [portionText, setPortionText] = useState([]);
  const [fabricCost, setFabricCost] = useState(null);
  const [totalWastage, setTotalWastage] = useState(null);
  const [fabricProcessFee, setFabricProcessFee] = useState(null);
  const handleAddNewYarn = () => {
    setEditingIndex(null);
    if (ifEdit) {
      alert('編輯尚未結束');
      return;
    }
    dispatch({
      type: 'yarnAdd',
      payload: {
        newYarn: {
          ...initialYarnInfo,
          index: Number(quote.yarnCost.yarnInfo.length + 1),
        },
      },
    });
  };
  const handleEditYarn = (index) => {
    if (ifEdit) {
      return;
    } else {
      setIfEdit(true);
      setEditingIndex(index);
    }
  };
  const handleSaveYarn = (index, saveInfo) => {
    dispatch({
      type: 'yarnSave',
      payload: {
        saveInfo,
        index,
      },
    });
    setIfEdit(false);
    setEditingIndex(null);
  };
  const handleDeleteYarn = (index) => {
    if (ifEdit) {
      alert('編輯中請勿刪');
      console.log('編輯中請勿刪TODO');
      return;
    } else {
      deleteListInfo(index);
    }
  };
  const updateData = () => {
    // 計算總比例
    setTotalPort(
      quote.yarnCost.yarnInfo.reduce(
        (total, yarn) => total + Number(yarn.yarnPort),
        0
      )
    );
    // console.log(quote.yarnCost.yarnInfo, 'q');
    if (quote.yarnCost.yarnInfo.length != 0) {
      let tpyePortionSum = quote.yarnCost.yarnInfo.reduce((acc, yarn) => {
        let { yarnType, yarnPort } = yarn;
        if (acc[yarnType]) {
          acc[yarnType] += yarnPort;
        } else {
          acc[yarnType] = yarnPort;
        }
        return acc;
      }, {});
      const typePorArray = Object.entries(tpyePortionSum).map(
        ([type, portion]) => ({
          type,
          portion,
        })
      );
      setPortionText(typePorArray);
    }
    // 加總所有紗線換算比例後的資料
    let totalValue = quote.yarnCost.yarnInfo
      .reduce((total, yarn) => {
        if (
          yarn.yarnPort !== undefined &&
          yarn.yarnPrice !== undefined &&
          yarn.yarnUnit !== undefined
        ) {
          let sa = yarn.yarnPort * (yarn.yarnPrice / 100);
          let exchageRate = getSthById(yarn.yarnUnit, priceUnit).NTDrate;
          let sachange = sa * exchageRate;
          return total + sachange;
        }
        return total;
      }, 0)
      .toFixed(2);
    // 更新總成本
    setTotalYarnCost(parseFloat(totalValue));
    let fValue = (
      totalYarnCost / (1 - totalWastage / 100) +
      fabricProcessFee
    ).toFixed(2);

    setFabricCost(parseFloat(fValue));
  };
  useEffect(() => {
    // 在 totalYarnCost 更新後執行 console.log
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else {
      // TODO: 第一次不要渲染 等參數有變動再渲染 如何處理
      dispatch({
        type: 'updateAutoCountData',
        payload: {
          field: componentID,
          data: {
            totalYarnCost: totalYarnCost,
            portionText: portionText,
            fabricCost: fabricCost,
          },
        },
      });
    }
  }, [totalYarnCost, totalWastage, fabricProcessFee, fabricCost]);
  useEffect(() => {
    updateData();
  }, [quote]);
  return (
    <>
      <QCard>
        <div className={styles.controlButton}>
          <div className={styles.title}>紗支分析</div>
          <Tooltip title="新增紗支">
            <AddCircleIcon onClick={handleAddNewYarn} />
          </Tooltip>
          <button
            onClick={() => {
              console.log('清空');
            }}
          >
            清空
          </button>
        </div>
        <hr />
        <table className={styles.table}>
          <thead>
            <tr>
              <th name="yarnNo">No</th>
              <th name="yarnSpec">紗支</th>
              <th name="yarnPort">
                比例
                <br />
                (%)
              </th>
              <th name="yarnSouce">
                紗廠
                <br />
                備註
              </th>
              <th name="yarnPrice">單價</th>
              <th name="singleYarnCost">
                單一成本
                <br />
                (NTD/KG)
              </th>
              <th name="controls">icon</th>
            </tr>
          </thead>
          <tbody className="yarnList">
            {quote.yarnCost.yarnInfo.map((tr, index) => {
              return (
                <>
                  <tr key={tr.index} className={styles.trStyle}>
                    {editingIndex === index ? (
                      <EditYarnInfo
                        index={editingIndex}
                        yarnDetail={tr}
                        onSave={handleSaveYarn}
                        onCancel={() => {
                          setEditingIndex(null);
                          setIfEdit((pre) => !pre);
                        }}
                        yarnDB={yarnDB}
                        priceUnit={priceUnit}
                        totalYarnCost={totalYarnCost}
                      />
                    ) : (
                      <>
                        <td name="yarnNo">{index + 1}</td>
                        <td name="yarnSpec">
                          {getSthById(tr.yarnSpec, yarnDB).title
                            ? getSthById(tr.yarnSpec, yarnDB).title
                            : '尚未選擇紗種'}
                        </td>
                        <td name="yarnPort">{tr.yarnPort}%</td>
                        <td name="yarnSource">{tr.yarnSource}</td>

                        <td name="yarnPrice">
                          <span className={styles.price}>
                            {_.toNumber(tr.yarnPrice).toLocaleString()}
                          </span>
                          <span className={styles.unit}>
                            {getSthById(tr.yarnUnit, priceUnit).title}
                          </span>
                        </td>
                        <td name="singleYarnCost">
                          {parseFloat(
                            tr.yarnPrice *
                              (tr.yarnPort / 100) *
                              getSthById(tr.yarnUnit, priceUnit).NTDrate
                          ).toFixed(2)}
                        </td>
                        <td name="controls">
                          <EditIcon
                            onClick={() => handleEditYarn(index)}
                          ></EditIcon>
                          <DeleteIcon
                            onClick={() => handleDeleteYarn(index)}
                          ></DeleteIcon>
                        </td>
                      </>
                    )}
                  </tr>
                </>
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
              <td colSpan={2}>
                <h6>成分比</h6>
                {portionText.map((p, id) => {
                  if (p.portion > 0) {
                    return (
                      <span key={id}>
                        {p.type}:{p.portion}%
                      </span>
                    );
                  } else {
                    return;
                  }
                })}
              </td>
              <Tooltip title="加總單一紗支成本">
                <td
                  style={{
                    fontWeight: 800,
                    textDecoration: 'underline',
                    fontSize: '20px',
                  }}
                >
                  {totalYarnCost}
                </td>
              </Tooltip>

              <td></td>
            </tr>
          </tfoot>
        </table>
        <table className={styles.yarnListRWD}>
          <thead>
            <tr>
              <td>No</td>
              <td colSpan={2}>紗支資訊</td>
            </tr>
          </thead>

          {quote.yarnCost.yarnInfo.map((tr, index) => {
            return (
              <tbody key={index} className={styles.trStyle}>
                <tr>
                  <td rowSpan={2} name="yarnNo">
                    {index + 1}
                  </td>
                  <td name="yarnSpec">
                    <div>紗支</div>
                  </td>
                  <td name="yarnPort">
                    <div>比例</div>
                  </td>
                </tr>
                <tr>
                  <td name="yarnSpec">
                    <div> {getSthById(tr.yarnSpec, yarnDB).title}</div>
                  </td>
                  <td name="yarnPort">
                    <div>{tr.yarnPort}%</div>
                  </td>
                </tr>
                <tr>
                  <td rowSpan={2}>
                    <EditIcon onClick={() => handleEditYarn(index)}></EditIcon>
                    <DeleteIcon
                      onClick={() => handleDeleteYarn(index)}
                    ></DeleteIcon>
                  </td>
                  <td name="yarnSouce">
                    <div>紗廠</div>
                  </td>
                  <td name="yarnPrice">
                    <div>單價 {getSthById(tr.yarnUnit, priceUnit).title}</div>
                  </td>
                </tr>
                <tr>
                  <td name="yarnSource">
                    <div>{tr.yarnSource} </div>
                  </td>
                  <td name="yarnPrice">
                    <div>{_.toNumber(tr.yarnPrice).toLocaleString()}</div>
                  </td>
                </tr>
                <tr className={styles.divider}>
                  <td colSpan={3}></td>
                </tr>
              </tbody>
            );
          })}

          <tfoot>
            <tr>
              <td colSpan={2}>Total</td>
              <td>100%</td>
            </tr>
          </tfoot>
        </table>
      </QCard>
      <QCard>
        <div className={styles.machineInfo}>
          <label>
            <span>機台種類</span>
            <Select
              id="machineType"
              name="machineType"
              value={machineType}
              onChange={(e) => {
                updateNumberField(e, componentID);
                setMachineType(e.target.value);
              }}
              className={styles.textInput}
              variant="standard"
            >
              <MenuItem key={0} value={0}>
                請選擇機台
              </MenuItem>
              {machineList.map((option) => {
                return (
                  <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
                );
              })}
            </Select>
          </label>
          <label htmlFor="machineSpec">
            <span>機台規格</span>
            <TextField
              variant="standard"
              type="text"
              id="machineSpec"
              name="machineSpec"
              value={quote.yarnCost.machineSpec}
              onChange={(e) => updateTextField(e, componentID)}
              className={styles.textInput}
            />
          </label>
          <label htmlFor="other">
            <span>備註</span>
            <TextField
              variant="standard"
              type="text"
              id="other"
              name="other"
              value={quote.yarnCost.other}
              onChange={(e) => updateTextField(e, componentID)}
              className={styles.textInput}
            />
          </label>
        </div>
        <div className={styles.machineInfo}>
          <label htmlFor="densityWarp">
            <span>經密</span>
            <TextField
              variant="standard"
              type="text"
              id="densityWarp"
              name="densityWarp"
              value={quote.yarnCost.densityWarp}
              onChange={(e) => updateTextField(e, componentID)}
              className={styles.textInput}
            />
          </label>
          <label htmlFor="densityWeft">
            <span>緯密</span>
            <TextField
              variant="standard"
              type="text"
              id="densityWeft"
              name="densityWeft"
              value={quote.yarnCost.densityWeft}
              onChange={(e) => updateTextField(e, componentID)}
              className={styles.textInput}
            />
          </label>
        </div>
        <div className={styles.yarnCost}>
          <label htmlFor="fabricProcessFee">
            <span>織布工繳</span>
            <TextField
              variant="standard"
              type="number"
              id="fabricProcessFee"
              name="fabricProcessFee"
              placeholder="TWD/KG"
              value={fabricProcessFee}
              onChange={(e) => {
                updateNumberField(e, componentID);
                setFabricProcessFee(parseFloat(e.target.value));
              }}
              className={styles.textInput}
              inputProps={{ step: 1, min: 0 }}
            />
          </label>
          <label htmlFor="fabricCost">
            <span>胚布成本</span>
            <TextField
              disabled
              variant="standard"
              type="number"
              id="fabricCost"
              name="fabricCost"
              placeholder="TWD/KG"
              value={fabricCost}
              // onChange={(e) => updateNumberField(e, componentID)}
              className={styles.textInput}
              inputProps={{ step: 1, min: 0 }}
            />
          </label>
          <label htmlFor="totalWastage">
            <span>總損耗</span>
            <TextField
              variant="standard"
              type="number"
              id="totalWastage"
              name="totalWastage"
              placeholder="%"
              value={totalWastage}
              onChange={(e) => {
                updateNumberField(e, componentID);
                setTotalWastage(parseFloat(e.target.value));
              }}
              className={styles.textInput}
              inputProps={{ step: 1, min: 0 }}
            />
          </label>
        </div>
      </QCard>
    </>
  );
}

const EditYarnInfo = ({
  onSave,
  onCancel,
  yarnDB,
  index,
  yarnDetail,
  priceUnit,
}) => {
  const [yarnInput, setYarnInput] = useState({
    yarnPort: yarnDetail.yarnPort,
    yarnPrice: yarnDetail.yarnPrice,
    yarnSource: yarnDetail.yarnSource,
    yarnSpec: yarnDetail.yarnSpec,
    yarnUnit: yarnDetail.yarnUnit,
    yarnType: yarnDetail.yarnType,
  });
  const handleYarnInputChange = (e) => {
    if (e.target.name == 'yarnSource') {
      setYarnInput({ ...yarnInput, [e.target.name]: e.target.value });
    } else {
      setYarnInput({
        ...yarnInput,
        [e.target.name]: parseFloat(e.target.value),
      });
      // switch (e.target.name) {
      //   case 'yarnPort':
      //     console.log(' revise yarn port ');
      //     break;
      //   case 'yarnPrice':
      //     console.log(' revise yarn price');
      //     break;
      // }
    }
  };
  return (
    <>
      {/* 編輯資訊的 UI 部分 */}
      <td name="yarnNo">{index + 1}</td>
      <Tooltip title="使用搜尋bar選擇紗支" placement="left-start">
        <td name="yarnSpec">
          {/* TODO: 自動輸入 */}
          <Autocomplete
            className={styles.textInput}
            disablePortal
            size="small"
            name="yarnSpec"
            value={getSthById(yarnInput.yarnSpec, yarnDB)}
            onChange={(_, newValue) => {
              // console.log(newValue);
              if (newValue) {
                setYarnInput({
                  ...yarnInput,
                  yarnSpec: newValue.id,
                  yarnPrice: newValue.price,
                  yarnSource: newValue.source,
                  yarnUnit: newValue.unit,
                  yarnType: newValue.type,
                });
              }
            }}
            id="highlights-demo"
            options={yarnDB}
            renderInput={(params) => <TextField {...params} />}
            renderOption={(props, option, { inputValue }) => {
              const matches = match(option.title, inputValue);
              const parts = parse(option.title, matches);
              return (
                <li {...props}>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </li>
              );
            }}
          />
        </td>
      </Tooltip>
      <td name="yarnPort">
        <TextField
          type="number"
          name="yarnPort"
          value={yarnInput.yarnPort}
          onChange={(e) => handleYarnInputChange(e)}
          id="standard-basic"
          size="small"
          inputProps={{ step: 1, min: 0, max: 100 }}
          className={styles.textInput}
        />
      </td>
      <td name="yarnSource">
        <TextField
          name="yarnSource"
          value={yarnInput.yarnSource}
          onChange={(e) => handleYarnInputChange(e)}
          id="standard-basic"
          size="small"
          className={styles.textInput}
          sz={{ width: 300 }}
        />
      </td>
      <td name="yarnPrice">
        <TextField
          className={styles.textInput}
          type="number"
          name="yarnPrice"
          value={yarnInput.yarnPrice}
          onChange={(e) => handleYarnInputChange(e)}
          id="standard-basic"
          size="small"
          inputProps={{ step: 1, min: 0 }}
        />
        <Select
          disabled
          name="yarnUnit"
          value={getSthById(yarnInput.yarnUnit, yarnDB)}
          onChange={(e) => handleYarnInputChange(e)}
          className={styles.textInput}
          autoWidth
        >
          {priceUnit.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </td>
      <td name="singleYarnCost">
        {parseFloat(
          yarnInput.yarnPrice *
            (yarnInput.yarnPort / 100) *
            getSthById(yarnInput.yarnUnit, priceUnit).NTDrate
        ).toFixed(2)}
      </td>
      <td name="controls">
        <SaveIcon
          onClick={() => {
            onSave(index + 1, yarnInput);
          }}
        ></SaveIcon>
        <CancelIcon onClick={onCancel}></CancelIcon>
      </td>
    </>
  );
};
const getSthById = (ide, DB) => {
  const sthValue = DB.find((item) => item.id === ide);
  return sthValue ? sthValue : '未建檔 or 未選擇';
};
