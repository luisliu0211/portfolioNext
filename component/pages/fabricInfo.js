import React, { useEffect } from 'react';
import QCard from '../layouts/qCard';
import styles from './fabricInfo.module.css';
import { useState, useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MyContext from '@/lib/context';
import { Tooltip } from '@mui/material';

export default function FabricInfo(props) {
  const { componentID, clientDB } = props;
  const { quote, updateTextField, updateNumberField, updateAutoValue, ifEdit } =
    useContext(MyContext);

  const getSthById = (id, DB) => {
    const sthValue = DB.find((item) => item.id === id);
    return sthValue ? sthValue : undefined;
  };
  const [brand, setBrand] = useState(quote.fabricInfo.brand);
  return (
    <QCard>
      <div className={styles.container}>
        <div className={styles.productInfo}>
          <div className={styles.twoinRow}>
            <label htmlFor="clientId">
              <span>客戶</span>
              {/* TODO: 自動輸入 */}
              {ifEdit ? (
                <Autocomplete
                  variant="standard"
                  id="clientId"
                  name="clientId"
                  value={
                    clientDB.find(
                      (item) => item.id === quote.fabricInfo.clientId
                    ) || null
                  }
                  onChange={(_, newValue) => {
                    console.log(newValue);
                    if (newValue) {
                      let type = newValue.DBtype;
                      let id = newValue.id;
                      let brandName = newValue.name;
                      updateAutoValue(componentID, type, id);
                      setBrand(brandName);
                      // setSelectedItemId(id);
                      updateAutoValue(componentID, 'brand', brandName);
                    }
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  disablePortal
                  options={clientDB}
                  className={styles.textInput}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        placeholder: '選擇客戶',
                      }}
                    />
                  )}
                />
              ) : (
                <div className={styles.viewDataText}>
                  {getSthById(quote.fabricInfo.clientId, clientDB).label}
                </div>
              )}
            </label>
            <label htmlFor="brand">
              <span>品牌</span>
              {ifEdit ? (
                <TextField
                  variant="standard"
                  type="text"
                  id="brand"
                  name="brand"
                  value={quote.fabricInfo.brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    updateTextField(e, componentID);
                  }}
                  className={styles.textInput}
                />
              ) : (
                <div className={styles.viewDataText}>
                  {quote.fabricInfo.brand}
                </div>
              )}
            </label>
          </div>
          <div className={styles.twoinRow}>
            <label htmlFor="fabricItem">
              <span>布號</span>
              {ifEdit ? (
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
              ) : (
                <div className={styles.viewDataText}>
                  {quote.fabricInfo.fabricItem}
                </div>
              )}
            </label>
            <label htmlFor="quoteDate">
              <span>報價日</span>
              {ifEdit ? (
                <TextField
                  variant="standard"
                  id="quoteDate"
                  name="quoteDate"
                  type="date"
                  value={quote.createDate}
                  onChange={(e) => {
                    updateTextField(e, componentID);
                  }}
                  className={styles.textInput}
                  min={0}
                  inputProps={{ step: 0.5, min: 0 }}
                />
              ) : (
                <div className={styles.viewDataText}>
                  {quote.createDate.split('T')[0]}
                </div>
              )}
            </label>
          </div>
        </div>
        <hr />
        <div className={styles.productDescription}>
          <Tooltip
            title="僅填寫品名 布種規格＆紗支＆成分會自動帶上"
            placement="top-start"
          >
            <label htmlFor="description">
              <span>品名</span>
              {ifEdit ? (
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
              ) : (
                <div className={styles.viewDataText}>
                  {quote.yarnCost.yarnTextStr +
                    ' ' +
                    quote.fabricInfo.description +
                    ' ' +
                    quote.yarnCost.portionText +
                    ' ' +
                    quote.fabricInfo.fabricSpecStr}
                </div>
              )}
            </label>
          </Tooltip>
        </div>
        <div className={styles.productSpec}>
          <div className={styles.threeinRow}>
            <label htmlFor="width">
              <span>幅寬</span>
              {ifEdit ? (
                <TextField
                  variant="standard"
                  type="number"
                  id="width"
                  name="width"
                  value={quote.fabricInfo.width || ''}
                  onChange={(e) => {
                    updateNumberField(e, componentID);
                  }}
                  placeholder="針內幅寬"
                  className={styles.textInput}
                  inputProps={{ step: 0.5, min: 0 }}
                />
              ) : (
                <div className={styles.viewDataText}>
                  {quote.fabricInfo.width || ''}吋
                </div>
              )}
            </label>
            <label htmlFor="gsm">
              <span>克重</span>
              {ifEdit ? (
                <TextField
                  variant="standard"
                  type="number"
                  id="gsm"
                  name="gsm"
                  value={quote.fabricInfo.gsm || ''}
                  onChange={(e) => {
                    updateNumberField(e, componentID);
                  }}
                  className={styles.textInput}
                  placeholder="gsm"
                  inputProps={{ step: 0.5, min: 0 }}
                />
              ) : (
                <div className={styles.viewDataText}>
                  {quote.fabricInfo.gsm || ''}gsm
                </div>
              )}
            </label>
            <label htmlFor="gy">
              <span>碼重</span>
              {ifEdit ? (
                <TextField
                  variant="standard"
                  disabled
                  id="gy"
                  name="gy"
                  type="number"
                  placeholder="gy"
                  value={quote.fabricInfo.gy || ''}
                  onChange={(e) => {
                    updateNumberField(e, componentID);
                  }}
                  className={styles.textInput}
                  min={0}
                  inputProps={{ step: 0.5, min: 0 }}
                />
              ) : (
                <div className={styles.viewDataText}>
                  {quote.fabricInfo.gy || ''}gy
                </div>
              )}
            </label>
          </div>
        </div>
      </div>
    </QCard>
  );
}
