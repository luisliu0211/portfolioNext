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
  const { quote, dispatch, updateTextField, updateNumberField } =
    useContext(MyContext);

  const [totalCost, setTotalCost] = useState(null);
  const [dyeAverageCost, setDyeAverageCost] = useState(null);
  const [dyeLightCost, setDyeLightCost] = useState(null);
  const [dyeDarkCost, setDyeDarkCost] = useState(null);
  const [totalCostL, setTotalCostL] = useState(null);
  const [totalCostD, setTotalCostD] = useState(null);
  const [process, setProcess] = useState(quote.dyeCost.process);
  const [specialProcess, setSpecialProcess] = useState(
    quote.dyeCost.specialProcess
  );
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(id, value, 'vv');
    // 根據不同的 id 做不同的處理
    let selectedIds;
    if (name == 'process') {
      setProcess(value);
      const selectedValues = event.target.value;
      const selectedOptions = selectedValues
        .map((selectedValue) => {
          return processDB.find((option) => option.title === selectedValue);
        })
        .filter(Boolean); // 過濾掉可能的 undefined 值
      selectedIds = selectedOptions.map((option) => option.id);
    }
    if (name == 'specialProcess') {
      setSpecialProcess(value);
      const selectedValues = event.target.value;
      const selectedOptions = selectedValues
        .map((selectedValue) => {
          return specialProcessDB.find(
            (option) => option.title === selectedValue
          );
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
    setTotalCostL((quote.yarnCost.fabricCost + dyeLightCost).toFixed(2));
    setTotalCostD((quote.yarnCost.fabricCost + dyeDarkCost).toFixed(2));
  };
  useEffect(() => {
    dispatch({
      type: 'updateAutoCountData',
      payload: {
        field: componentID,
        data: {
          totalCost: parseFloat(totalCost),
          totalCostL: parseFloat(totalCostL),
          totalCostD: parseFloat(totalCostD),
        },
      },
    });
  }, [totalCost, totalCostL, totalCostD]);
  useEffect(() => {
    updateData();
  }, [quote]);
  return (
    <QCard>
      <div className={styles.title}>染色</div>
      <div className={styles.dyeList}>
        <label htmlFor="dyeLightCost">
          <span>淺色工繳</span>
          <TextField
            variant="standard"
            type="number"
            id="dyeLightCost"
            name="dyeLightCost"
            value={dyeLightCost}
            onChange={(e) => {
              updateNumberField(e, componentID);
              setDyeLightCost(parseFloat(e.target.value));
            }}
            className={styles.textInput}
            placeholder="TWD/KG"
            inputProps={{ step: 1, min: 0 }}
          />
        </label>
        <label htmlFor="dyeAverageCost">
          <span>染色工繳</span>
          <TextField
            variant="standard"
            type="number"
            id="dyeAverageCost"
            name="dyeAverageCost"
            value={dyeAverageCost}
            onChange={(e) => {
              updateNumberField(e, componentID);
              setDyeAverageCost(parseFloat(e.target.value));
            }}
            className={styles.textInput}
            placeholder="TWD/KG"
            inputProps={{ step: 1, min: 0 }}
          />
        </label>
        <label htmlFor="dyeDarkCost">
          <span>深色工繳</span>
          <TextField
            variant="standard"
            type="number"
            id="dyeDarkCost"
            name="dyeDarkCost"
            value={dyeDarkCost}
            onChange={(e) => {
              updateNumberField(e, componentID);
              setDyeDarkCost(parseFloat(e.target.value));
            }}
            className={styles.textInput}
            placeholder="TWD/KG"
            inputProps={{ step: 1, min: 0 }}
          />
        </label>
      </div>
      <div className={styles.additonal}>
        <div className={styles.dye}>
          <label>
            <span>加工製程</span>
            <Select
              className={styles.selecetInput}
              variant="standard"
              id="process"
              multiple
              value={process}
              name="process"
              onChange={handleChange}
              input={<OutlinedInput id="process-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 0.3,
                  }}
                >
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      sx={{ fontSize: '16px', padding: 0 }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {processDB.map((p) => (
                <MenuItem
                  key={p.id}
                  value={p.title}
                  // style={getStyles(name, personName, theme)}
                >
                  {p.title}
                </MenuItem>
              ))}
            </Select>
          </label>
          <label>
            <span>特殊加工</span>
            <Select
              className={styles.selecetInput}
              variant="standard"
              id="specialProcess"
              name="specialProcess"
              multiple
              value={specialProcess}
              onChange={handleChange}
              input={<OutlinedInput id="specialProcess-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 0.3,
                  }}
                >
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      sx={{ fontSize: '16px', padding: 0 }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {specialProcessDB.map((p) => (
                <MenuItem
                  key={p.id}
                  value={p.title}
                  // style={getStyles(name, personName, theme)}
                >
                  {p.title}
                </MenuItem>
              ))}
            </Select>
          </label>
        </div>
        <div className={styles.finalCost}>
          <label htmlFor="totalCost">
            <span>織染總成本</span>
            <TextField
              disabled
              variant="standard"
              type="number"
              id="totalCost"
              name="totalCost"
              value={totalCost}
              // onChange={(e) => updateNumberField(e, componentID)}
              className={styles.textInput}
              inputProps={{ step: 0.5, min: 0 }}
            />
          </label>
          <label htmlFor="RDReference">
            <span>RD參考</span>
            <TextField
              variant="standard"
              type="text"
              id="RDReference"
              name="RDReference"
              value={quote.dyeCost.RDReference}
              onChange={(e) => updateTextField(e, componentID)}
              className={styles.textInput}
            />
          </label>
        </div>
      </div>
    </QCard>
  );
}
