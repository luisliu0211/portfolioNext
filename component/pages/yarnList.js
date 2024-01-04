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
    isMobile,
    ifEdit,
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
  const [ifEditYarn, setIfEditYarn] = useState(false);
  const [machineType, setMachineType] = useState(quote.yarnCost.machineType);
  const [totalYarnCost, setTotalYarnCost] = useState(null);
  const isFirstRender = useRef(true);
  const [portionText, setPortionText] = useState([]);
  const [fabricCost, setFabricCost] = useState(quote.yarnCost.fabricCost);
  const [totalWastage, setTotalWastage] = useState(quote.yarnCost.totalWastage);
  const [fabricProcessFee, setFabricProcessFee] = useState(
    quote.yarnCost.fabricProcessFee
  );
  const [expandRowIndex, setExpandRowIndex] = useState(null);

  const handleAddNewYarn = () => {
    setEditingIndex(null);
    if (quote.yarnCost.yarnInfoList.length >= 5) {
      alert('不可再增新紗支');
      return;
    }
    if (ifEditYarn) {
      alert('編輯尚未結束');
      return;
    }
    dispatch({
      type: 'yarnAdd',
      payload: {
        newYarn: {
          ...initialYarnInfo,
          index: Number(quote.yarnCost.yarnInfoList.length + 1),
        },
      },
    });
  };
  const handleEditYarn = (index) => {
    if (ifEditYarn) {
      return;
    } else {
      setIfEditYarn(true);
      setEditingIndex(index);
    }
  };
  const handleSaveYarn = (index, saveInfo) => {
    console.log(saveInfo, 'ss');
    dispatch({
      type: 'yarnSave',
      payload: {
        saveInfo,
        index,
      },
    });
    setIfEditYarn(false);
    setEditingIndex(null);
  };
  const handleDeleteYarn = (index) => {
    if (ifEditYarn) {
      alert('編輯中請勿刪');
      console.log('編輯中請勿刪TODO');
      return;
    } else {
      deleteListInfo(index);
    }
  };
  const openRow = (index) => {
    setExpandRowIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const updateData = () => {
    // 計算總比例
    setTotalPort(
      quote.yarnCost.yarnInfoList.reduce(
        (total, yarn) => total + Number(yarn.yarnPort),
        0
      )
    );
    if (quote.yarnCost.yarnInfoList.length != 0) {
      let tpyePortionSum = quote.yarnCost.yarnInfoList.reduce((acc, yarn) => {
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
    let totalValue = quote.yarnCost.yarnInfoList
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
      let portionTextString = portionText
        .filter((p) => p.portion > 0) // 过滤掉 portion <= 0 的元素
        .map((p) => `${p.portion}%${p.type}`)
        .join('');

      let yarnTextString = quote.yarnCost.yarnInfoList
        .map((i) => {
          return getSthById(i.yarnSpec, yarnDB).title;
        })
        .join('+');
      dispatch({
        type: 'updateAutoCountData',
        payload: {
          field: componentID,
          data: {
            totalYarnCost: totalYarnCost,
            portionText: portionTextString,
            yarnTextStr: yarnTextString,
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
          {isMobile ? (
            <span>手機版僅供查看</span>
          ) : (
            ifEdit && (
              <div className={styles.buttons}>
                <Tooltip title="新增紗支">
                  <AddCircleIcon onClick={handleAddNewYarn} />
                </Tooltip>
                <button
                  disabled={!ifEdit}
                  onClick={() => {
                    console.log('清空');
                  }}
                >
                  清空
                </button>
              </div>
            )
          )}
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

              <th name="controls">{ifEdit ? 'icon' : ''}</th>
            </tr>
          </thead>
          <tbody className="yarnList">
            {quote.yarnCost.yarnInfoList.map((tr, index) => {
              return (
                <React.Fragment key={index}>
                  <tr className={styles.trStyle}>
                    {editingIndex === index ? (
                      <EditYarnInfo
                        index={editingIndex}
                        yarnDetail={tr}
                        onSave={handleSaveYarn}
                        onCancel={() => {
                          setEditingIndex(null);
                          setIfEditYarn((pre) => !pre);
                        }}
                        yarnDB={yarnDB}
                        priceUnit={priceUnit}
                        totalYarnCost={totalYarnCost}
                      />
                    ) : (
                      <>
                        <td name="yarnNo">{index + 1}</td>
                        <td name="yarnSpec" onClick={() => openRow(index)}>
                          {getSthById(tr.yarnSpec, yarnDB)
                            ? getSthById(tr.yarnSpec, yarnDB).title
                            : '尚未選擇紗種'}
                        </td>
                        <td name="yarnPort">{tr.yarnPort}%</td>
                        <td name="yarnSource">
                          {tr.yarnSource ? tr.yarnSource : '---'}
                        </td>

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
                        {ifEdit ? (
                          <td name="controls">
                            <EditIcon
                              onClick={() => handleEditYarn(index)}
                            ></EditIcon>
                            <DeleteIcon
                              onClick={() => handleDeleteYarn(index)}
                            ></DeleteIcon>
                          </td>
                        ) : (
                          <td>檢視模式</td>
                        )}
                      </>
                    )}
                  </tr>
                  <tr className={styles.yarnDetails}>
                    {index === expandRowIndex && (
                      <td colSpan={7}> {tr.yarnQuoteText}</td>
                    )}
                  </tr>
                </React.Fragment>
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
                        {p.type}:{p.portion}%&nbsp;
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
          {quote.yarnCost.yarnInfoList.map((tr, index) => {
            return (
              <tbody
                key={index}
                className={styles.trStyle}
                onClick={() => openRow(index)}
              >
                <tr>
                  <td rowSpan={4} name="yarnNo">
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
                    <div>
                      {' '}
                      {getSthById(tr.yarnSpec, yarnDB)
                        ? getSthById(tr.yarnSpec, yarnDB).title
                        : '尚未選擇紗種'}
                    </div>
                  </td>
                  <td name="yarnPort">
                    <div>{tr.yarnPort}%</div>
                  </td>
                </tr>
                <tr>
                  <td name="yarnSouce">
                    <div>紗廠</div>
                  </td>
                  <td name="yarnPrice">
                    {/* <div>單價 {getSthById(tr.yarnUnit, priceUnit).title}</div> */}
                  </td>
                </tr>
                <tr>
                  <td name="yarnSource">
                    <div> {tr.yarnSource ? tr.yarnSource : '---'} </div>
                  </td>
                  <td name="yarnPrice">
                    <div>{_.toNumber(tr.yarnPrice).toLocaleString()}</div>
                  </td>
                </tr>
                <tr className={styles.divider}>
                  <td colSpan={3}></td>
                </tr>
                <tr className={styles.yarnDetails}>
                  {index === expandRowIndex && (
                    <td colSpan={7}> {tr.yarnQuoteText}</td>
                  )}
                </tr>
              </tbody>
            );
          })}
          <tfoot>
            <tr>
              <td>Total</td>
              <td>
                {' '}
                {portionText.map((p, id) => {
                  if (p.portion > 0) {
                    return (
                      <span key={id}>
                        {p.type}:{p.portion}%&nbsp;
                      </span>
                    );
                  } else {
                    return;
                  }
                })}
              </td>
              <td style={{ color: totalPort != 100 ? 'red' : 'black' }}>
                {totalPort}%
              </td>
            </tr>
          </tfoot>
        </table>
      </QCard>
      <QCard>
        <div className={styles.title}>胚布資料</div>
        <div className={styles.machineInfo}>
          <label>
            <span>機台種類</span>
            {ifEdit ? (
              <Select
                id="machineType"
                name="machineType"
                value={machineType || 0}
                onChange={(e) => {
                  updateNumberField(e, componentID);
                  setMachineType(e.target.value);
                }}
                className={styles.textInput}
                variant="standard"
                displayEmpty
              >
                <MenuItem value={0} disabled>
                  請選擇...
                </MenuItem>
                {machineList.map((option) => {
                  return (
                    <MenuItem key={option.id} value={option.id}>
                      {option.title}
                    </MenuItem>
                  );
                })}
              </Select>
            ) : (
              <div className={styles.viewDataText}>
                {getSthById(machineType, machineList).title || ''}
              </div>
            )}
          </label>
          <label htmlFor="machineSpec">
            <span>機台規格</span>
            {ifEdit ? (
              <TextField
                variant="standard"
                type="text"
                id="machineSpec"
                name="machineSpec"
                value={quote.yarnCost.machineSpec || ''}
                onChange={(e) => updateTextField(e, componentID)}
                className={styles.textInput}
              />
            ) : (
              <div className={styles.viewDataText}>
                {quote.yarnCost.machineSpec || ''}
              </div>
            )}
          </label>
        </div>
        <div className={styles.additonal}>
          <label htmlFor="densityWarp">
            <span>經密</span>
            {ifEdit ? (
              <TextField
                variant="standard"
                type="text"
                id="densityWarp"
                name="densityWarp"
                value={quote.yarnCost.densityWarp || ''}
                onChange={(e) => updateTextField(e, componentID)}
                className={styles.textInput}
              />
            ) : (
              <div className={styles.viewDataText}>
                {quote.yarnCost.densityWarp || ''}
              </div>
            )}
          </label>
          <label htmlFor="densityWeft">
            <span>緯密</span>
            {ifEdit ? (
              <TextField
                variant="standard"
                type="text"
                id="densityWeft"
                name="densityWeft"
                value={quote.yarnCost.densityWeft || ''}
                onChange={(e) => updateTextField(e, componentID)}
                className={styles.textInput}
              />
            ) : (
              <div className={styles.viewDataText}>
                {quote.yarnCost.densityWeft || ''}
              </div>
            )}
          </label>
          <label htmlFor="other">
            <span>備註</span>
            {ifEdit ? (
              <TextField
                variant="standard"
                type="text"
                id="other"
                name="other"
                value={quote.yarnCost.other || ''}
                onChange={(e) => updateTextField(e, componentID)}
                className={styles.textInput}
              />
            ) : (
              <div className={styles.viewDataText}>
                {quote.yarnCost.other || ''}
              </div>
            )}
          </label>
        </div>
        <div className={styles.yarnCost}>
          <label htmlFor="fabricProcessFee">
            <span>織布工繳</span>
            {ifEdit ? (
              <TextField
                variant="standard"
                type="number"
                id="fabricProcessFee"
                name="fabricProcessFee"
                placeholder="TWD/KG"
                value={fabricProcessFee || ''}
                onChange={(e) => {
                  updateNumberField(e, componentID);
                  setFabricProcessFee(parseFloat(e.target.value));
                }}
                className={styles.textInput}
                inputProps={{ step: 1, min: 0 }}
              />
            ) : (
              <div className={styles.viewDataText}>
                {quote.yarnCost.fabricProcessFee || ''}
              </div>
            )}
          </label>
          <label htmlFor="fabricCost">
            <span>胚布成本</span>
            {ifEdit ? (
              <TextField
                disabled
                variant="standard"
                type="number"
                id="fabricCost"
                name="fabricCost"
                placeholder="TWD/KG"
                value={fabricCost || ''}
                // onChange={(e) => updateNumberField(e, componentID)}
                className={styles.textInput}
                inputProps={{ step: 1, min: 0 }}
              />
            ) : (
              <div className={styles.viewDataText}>
                {quote.yarnCost.fabricCost || ''}
              </div>
            )}
          </label>
          <label htmlFor="totalWastage">
            <span>總損耗</span>
            {ifEdit ? (
              <TextField
                variant="standard"
                type="number"
                id="totalWastage"
                name="totalWastage"
                placeholder="%"
                value={totalWastage || ''}
                onChange={(e) => {
                  updateNumberField(e, componentID);
                  setTotalWastage(parseFloat(e.target.value));
                }}
                className={styles.textInput}
                inputProps={{ step: 1, min: 0 }}
              />
            ) : (
              <div className={styles.viewDataText}>
                {quote.yarnCost.totalWastage || ''}
              </div>
            )}
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
      // 在設置狀態之前確保值不為null
      const numericValue = parseFloat(e.target.value);
      setYarnInput({
        ...yarnInput,
        [e.target.name]: numericValue,
      });
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
            value={
              yarnDB.find((item) => item.id === yarnInput.yarnSpec) || null
            }
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
                  yarnQuoteText: newValue.text,
                });
              }
            }}
            sx={{
              '.MuiInputBase-root': {
                paddingRight: '5% !important',
              },
              '.MuiInputBase-root .MuiAutocomplete-endAdornment': {
                width: '20%',
              },
              '.MuiInputBase-root .MuiAutocomplete-endAdornment button': {
                width: '50%',
              },
            }}
            id="highlights-demo"
            options={yarnDB}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  placeholder: '選擇紗支', // 在這裡設定你的預設 placeholder 文字
                }}
              />
            )}
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
          value={yarnInput.yarnPort || ''}
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
          value={yarnInput.yarnSource || ''}
          onChange={(e) => handleYarnInputChange(e)}
          id="standard-basic"
          size="small"
          className={styles.textInput}
          sz={{ width: 200 }}
        />
      </td>
      <td name="yarnPrice">
        <TextField
          className={styles.textInput}
          type="number"
          name="yarnPrice"
          value={yarnInput.yarnPrice || ''}
          onChange={(e) => handleYarnInputChange(e)}
          id="standard-basic"
          size="small"
          inputProps={{ step: 1, min: 0 }}
        />
        {getSthById(yarnInput.yarnUnit, yarnDB).yarnUnit}
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
          className={styles.icons}
          onClick={() => {
            onSave(index + 1, yarnInput);
          }}
        ></SaveIcon>
        <CancelIcon className={styles.icons} onClick={onCancel}></CancelIcon>
      </td>
    </>
  );
};
const getSthById = (id, DB) => {
  const sthValue = DB.find((item) => item.id === id);
  return sthValue ? sthValue : undefined;
};
