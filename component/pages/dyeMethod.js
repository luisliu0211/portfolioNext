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
  const { componentID } = props;
  const { quote, dispatch, updateTextField, updateNumberField } =
    useContext(MyContext);
  const [specialProcess, setSpecialProcess] = useState(
    quote.dyeCost.specialProcess
  );
  const [totalCost, setTotalCost] = useState(null);
  const [dyeAverageCost, setDyeAverageCost] = useState(null);
  const [process, setProcess] = useState(quote.dyeCost.process);

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
  let processDB = [
    { id: 1, title: '下水', DBtype: 'process' },
    { id: 2, title: '縮練', DBtype: 'process' },
    { id: 3, title: '胚定', DBtype: 'process' },
    { id: 4, title: '染色', DBtype: 'process' },
    { id: 5, title: '上油', DBtype: 'process' },
    { id: 6, title: '單刷', DBtype: 'process' },
    { id: 7, title: '雙刷', DBtype: 'process' },
    { id: 8, title: '梳剪', DBtype: 'process' },
    { id: 9, title: '拋光', DBtype: 'process' },
    { id: 10, title: '雙搖', DBtype: 'process' },
    { id: 11, title: '背刷剪', DBtype: 'process' },
    { id: 12, title: '雙搖', DBtype: 'process' },
    { id: 13, title: '磨毛', DBtype: 'process' },
    { id: 14, title: '定型', DBtype: 'process' },
    { id: 15, title: '上漿', DBtype: 'process' },
    { id: 16, title: '切邊', DBtype: 'process' },
  ];
  let specialProcessDB = [
    { id: 1, title: '熱燙', DBtype: 'specialProcess' },
    { id: 2, title: '吸濕', DBtype: 'specialProcess' },
    { id: 3, title: '排汗', DBtype: 'specialProcess' },
    { id: 4, title: '抗菌', DBtype: 'specialProcess' },
    { id: 5, title: '抗臭', DBtype: 'specialProcess' },
    { id: 6, title: '防霉', DBtype: 'specialProcess' },
    { id: 7, title: '抗靜電', DBtype: 'specialProcess' },
    { id: 8, title: '抗UV', DBtype: 'specialProcess' },
    { id: 9, title: '防勾紗', DBtype: 'specialProcess' },
    { id: 10, title: '潑水', DBtype: 'specialProcess' },
    { id: 11, title: '超潑水', DBtype: 'specialProcess' },
    { id: 12, title: '貼合', DBtype: 'specialProcess' },
    { id: 13, title: '印花', DBtype: 'specialProcess' },
    { id: 14, title: '上膠', DBtype: 'specialProcess' },
  ];
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
        componentID,
      },
    });
  };
  useEffect(() => {
    setTotalCost(quote.yarnCost.fabricCost + dyeAverageCost);
    dispatch({
      type: 'updateAutoCountData',
      payload: {
        field: componentID,
        data: {
          totalCost: totalCost,
        },
      },
    });
  }, [totalCost]);
  useEffect(() => {
    console.log(totalCost, 'tc');
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
            value={quote.dyeCost.dyeLightCost}
            onChange={(e) => updateNumberField(e, componentID)}
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
            value={quote.dyeCost.dyeAverageCost}
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
            value={quote.dyeCost.dyeDarkCost}
            onChange={(e) => updateNumberField(e, componentID)}
            className={styles.textInput}
            placeholder="TWD/KG"
            inputProps={{ step: 1, min: 0 }}
          />
        </label>
      </div>
      <div className={styles.additonal}>
        <div className={styles.dye}>
          <label htmlFor="process">
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
          <label htmlFor="specialProcess">
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
