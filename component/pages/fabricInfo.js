import React, { useEffect } from 'react';
import QCard from '../layouts/qCard';
import styles from './fabricInfo.module.css';
import { useState, useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MyContext from '@/lib/context';
export default function FabricInfo(props) {
  const { componentID, clientDB } = props;
  const { quote, updateTextField, updateNumberField, updateAutoValue } =
    useContext(MyContext);
  const [selectedItemId, setSelectedItemId] = useState(
    quote.fabricInfo.clientId != 0
      ? quote.fabricInfo.clientId
      : '請選擇客戶代號'
  );
  const [brand, setBrand] = useState(quote.fabricInfo.brand);
  return (
    <QCard>
      <div className={styles.container}>
        <div className={styles.productInfo}>
          <label htmlFor="clientId">
            <span>客戶</span>
            {/* TODO: 自動輸入 */}
            <Autocomplete
              variant="standard"
              // autoselectvalue={selectedItemId}
              // value={quote.fabricInfo.clientId}
              id="clientId"
              name="clientId"
              onChange={(_, newValue) => {
                let type = newValue.DBtype;
                let id = newValue.id;
                let brandName = newValue.name;
                console.log(type);
                updateAutoValue(componentID, type, id);
                setBrand(brandName);
                updateAutoValue(componentID, 'brand', brandName);
              }}
              disablePortal
              options={clientDB}
              className={styles.textInput}
              renderInput={(params) => (
                <TextField variant="standard" {...params} />
              )}
            />
          </label>
          <label htmlFor="fabricItem">
            <span>布號</span>
            <TextField
              variant="standard"
              type="text"
              id="fabricItem"
              name="fabricItem"
              value={quote.fabricInfo.fabricItem}
              onChange={(e) => {
                updateTextField(e, componentID);
              }}
              className={styles.textInput}
            />
          </label>
          <label htmlFor="brand">
            <span>品牌</span>
            <TextField
              variant="standard"
              type="text"
              id="brand"
              name="brand"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                updateTextField(e, componentID);
              }}
              className={styles.textInput}
            />
          </label>
        </div>
        <hr />
        <div className={styles.productDescription}>
          <label htmlFor="description">
            <span>品名</span>
            <TextField
              variant="standard"
              type="text"
              id="description"
              name="description"
              value={quote.fabricInfo.description}
              onChange={(e) => {
                updateTextField(e, componentID);
              }}
              className={styles.textInput}
            />
          </label>
        </div>
        <div className={styles.productSpec}>
          <label htmlFor="width">
            <span>幅寬</span>
            <TextField
              variant="standard"
              type="number"
              id="width"
              name="width"
              value={quote.fabricInfo.width}
              onChange={(e) => {
                updateNumberField(e, componentID);
              }}
              className={styles.textInput}
              inputProps={{ step: 0.5, min: 0 }}
            />
          </label>
          <label htmlFor="gsm">
            <span>克重</span>
            <TextField
              variant="standard"
              type="number"
              id="gsm"
              name="gsm"
              value={quote.fabricInfo.gsm}
              onChange={(e) => {
                updateNumberField(e, componentID);
              }}
              className={styles.textInput}
              min={0}
              inputProps={{ step: 0.5, min: 0 }}
            />
          </label>
          <label htmlFor="gy">
            <span>碼重</span>
            <TextField
              variant="standard"
              disabled
              id="gy"
              name="gy"
              type="number"
              value={quote.fabricInfo.gy}
              onChange={(e) => {
                updateNumberField(e, componentID);
              }}
              className={styles.textInput}
              min={0}
              inputProps={{ step: 0.5, min: 0 }}
            />
          </label>
          <label htmlFor="quoteDate">
            <span>報價日</span>
            <TextField
              variant="standard"
              id="quoteDate"
              name="quoteDate"
              type="date"
              // value={quote.createDate}
              onChange={(e) => {
                updateTextField(e, componentID);
              }}
              className={styles.textInput}
              min={0}
              inputProps={{ step: 0.5, min: 0 }}
            />
          </label>
        </div>
      </div>
    </QCard>
  );
}
