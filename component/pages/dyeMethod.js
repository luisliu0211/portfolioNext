import React, { useState, useContext, useEffect } from 'react';
import QCard from '../layouts/qCard';
import FlexBox from '@/component/layouts/flexBox';
import styles from './dyeMethod.module.css';
import MyContext from '@/lib/context';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
export default function DyeMethod(props) {
  const { componentID, processDB, specialProcessDB } = props;
  const { quote, dispatch, updateTextField, updateNumberField, ifEdit } =
    useContext(MyContext);

  const [totalCost, setTotalCost] = useState(quote.dyeCost.totalCost);
  const [dyeAverageCost, setDyeAverageCost] = useState(
    quote.dyeCost.dyeAverageCost
  );
  const [process, setProcess] = useState(quote.dyeCost.process);
  const [specialProcess, setSpecialProcess] = useState(
    quote.dyeCost.specialProcess
  );
  const getSthById = (id, DB) => {
    const sthValue = DB.find((item) => item.id === id);
    return sthValue ? sthValue : undefined;
  };

  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const selectStyles = {
    outlinedInput: {
      width: '300px',
      height: '75px',
      padding: '5px', // 設定寬度為100%
      '& fieldset': {
        borderColor: 'transparent',
        // border: '1px solid transparent', // 設定邊框顏色
      },
      '&.Mui-focused fieldset': {
        borderColor: 'transparent',
      },
    },
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // 根據不同的 id 做不同的處理
    let selectedIds;
    if (name == 'process') {
      setProcess(value);
      const selectedValues = event.target.value;
      const selectedOptions = selectedValues
        .map((selectedValue) => {
          return processDB.find((option) => option.id === selectedValue);
        })
        .filter(Boolean); // 過濾掉可能的 undefined 值
      selectedIds = selectedOptions.map((option) => option.id);
      console.log(selectedIds);
    }
    if (name == 'specialProcess') {
      setSpecialProcess(value);
      const selectedValues = event.target.value;
      const selectedOptions = selectedValues
        .map((selectedValue) => {
          return specialProcessDB.find((option) => option.id === selectedValue);
        })
        .filter(Boolean); // 過濾掉可能的 undefined 值
      selectedIds = selectedOptions.map((option) => option.id);
    }
    dispatch({
      type: 'updateIDinArray',
      payload: {
        selectedIds,
        field: componentID,
        name,
      },
    });
  };
  const updateData = () => {
    setTotalCost((quote.yarnCost.fabricCost + dyeAverageCost).toFixed(2));
  };
  useEffect(() => {
    dispatch({
      type: 'updateAutoCountData',
      payload: {
        field: componentID,
        data: {
          totalCost: parseFloat(totalCost),
        },
      },
    });
  }, [totalCost]);
  useEffect(() => {
    updateData();
  }, [quote]);
  return (
    <QCard>
      <div className={styles.title}>染色</div>
      <div className={styles.finalCost}>
        <label htmlFor="dyeAverageCost">
          <span>染色工繳</span>
          {ifEdit ? (
            <TextField
              disabled={!ifEdit}
              variant="standard"
              type="number"
              id="dyeAverageCost"
              name="dyeAverageCost"
              value={quote.dyeCost.dyeAverageCost || ''}
              onChange={(e) => {
                updateNumberField(e, componentID);
                setDyeAverageCost(parseFloat(e.target.value));
              }}
              className={styles.textInput}
              placeholder="TWD/KG"
              inputProps={{ step: 1, min: 0 }}
            />
          ) : (
            <div className={styles.viewDataText}>
              {quote.dyeCost.dyeAverageCost}
            </div>
          )}
        </label>
        <label htmlFor="totalCost">
          <span>織染總成本</span>
          {ifEdit ? (
            <TextField
              disabled
              variant="standard"
              type="number"
              id="totalCost"
              name="totalCost"
              value={totalCost || ''}
              className={styles.textInput}
              inputProps={{ step: 0.5, min: 0 }}
            />
          ) : (
            <div className={styles.viewDataText}>{quote.dyeCost.totalCost}</div>
          )}
        </label>

        <label htmlFor="RDReference">
          <span>RD參考</span>
          {ifEdit ? (
            <TextField
              variant="standard"
              type="text"
              id="RDReference"
              name="RDReference"
              value={quote.dyeCost.RDReference}
              onChange={(e) => updateTextField(e, componentID)}
              className={styles.textInput}
            />
          ) : (
            <div className={styles.viewDataText}>
              {quote.dyeCost.RDReference}
            </div>
          )}
        </label>
      </div>
      <div className={styles.process}>
        <label>
          <span>加工製程</span>
          {ifEdit ? (
            <Select
              className={styles.selecetInput}
              variant="standard"
              id="process"
              multiple
              value={process || ''}
              name="process"
              onChange={handleChange}
              input={
                <OutlinedInput
                  id="process-chip"
                  label="Chip"
                  sx={selectStyles.outlinedInput}
                />
              }
              renderValue={(selected) => {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 0.3,
                      maxHeight: '70px',
                      overflowY: 'auto',
                    }}
                  >
                    {selected.map((value) => {
                      let title = getSthById(value, processDB).title;
                      return (
                        <Chip
                          key={value}
                          label={title}
                          sx={{
                            fontSize: '16px',
                            backgroundColor: 'darkgrey',
                            padding: '5px',
                            margin: '2px', // 适当调整间距
                          }}
                        />
                      );
                    })}
                  </Box>
                );
              }}
              MenuProps={MenuProps}
            >
              {processDB.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.title}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <div className={styles.viewDataText}>
              {quote.dyeCost.process.map((p) => (
                <span className={styles.chips} key={p.id}>
                  {getSthById(p, processDB).title}
                </span>
              ))}
            </div>
          )}
        </label>
        <label>
          <span>特殊加工</span>
          {ifEdit ? (
            <Select
              className={styles.selecetInput}
              variant="standard"
              id="specialProcess"
              name="specialProcess"
              multiple
              value={specialProcess || ''}
              onChange={handleChange}
              input={
                <OutlinedInput
                  id="specialProcess-chip"
                  label="Chip"
                  sx={selectStyles.outlinedInput}
                />
              }
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 0.3,
                    maxHeight: '70px',
                    overflowY: 'auto',
                  }}
                >
                  {selected.map((value) => {
                    let title = getSthById(value, specialProcessDB).title;
                    return (
                      <Chip
                        key={value}
                        label={title}
                        sx={{
                          fontSize: '16px',
                          backgroundColor: 'darkgrey',
                          padding: '5px',
                          margin: '2px', // 适当调整间距
                        }}
                      />
                    );
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {specialProcessDB.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.title}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <div className={styles.viewDataText}>
              {quote.dyeCost.specialProcess.map((p) => (
                <span className={styles.chips} key={p.id}>
                  {getSthById(p, specialProcessDB).title}
                </span>
              ))}
            </div>
          )}
        </label>
      </div>
    </QCard>
  );
}
