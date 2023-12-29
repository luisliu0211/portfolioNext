import React, { useState, useContext, useEffect } from 'react';
import QCard from '../layouts/qCard';
import styles from './quotationDetail.module.css';
import MyContext from '@/lib/context';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
export default function QuotationDetail(props) {
  const { componentID, bussinessTermDB } = props;
  const { quote, dispatch, updateTextField, updateNumberField } =
    useContext(MyContext);
  const [salesCost, setSalesCost] = useState(quote.salesCost);
  const [costTWDKG, setCostTWDKG] = useState(quote.dyeCost.totalCost);
  const [tradeTerm, setTradeTerm] = useState(quote.salesCost.tradeTerm);
  const [costUSDKG, setCostUSDKG] = useState(null);
  const [costUSDY, setCostUSDY] = useState(null);
  const [quoteUSDY, setQuoteUSDY] = useState(salesCost.quoteUSDY);
  const [quoteUSDM, setQuoteUSDM] = useState(salesCost.quoteUSDM);
  const [quoteTWDY, setQuoteTWDY] = useState(salesCost.quoteTWDY);
  const [quoteTWDM, setQuoteTWDM] = useState(salesCost.quoteTWDM);
  const updateData = () => {
    let { excuteCost, shippingCost, testingCost, exchangeRate, profit } =
      salesCost;
    setCostTWDKG(
      quote.dyeCost.totalCost + excuteCost + shippingCost + testingCost
    );
    if (exchangeRate !== null && costTWDKG !== null && profit !== null) {
      // 执行数学运算
      setCostUSDKG((costTWDKG / exchangeRate).toFixed(2));
      setCostUSDY(((costUSDKG * quote.fabricInfo.gy) / 1000).toFixed(2));
      setQuoteUSDY((costUSDY * (1 + profit / 100)).toFixed(2));
      setQuoteUSDM(((costUSDY * (1 + profit / 100)) / 0.9144).toFixed(2));
      setQuoteTWDY((costUSDY * (1 + profit / 100) * exchangeRate).toFixed(2));
      setQuoteTWDM(
        ((costUSDY * (1 + profit / 100) * exchangeRate) / 0.9144).toFixed(2)
      );
    }
  };
  useEffect(() => {
    dispatch({
      type: 'updateAutoCountData',
      payload: {
        field: componentID,
        data: {
          costTWDKG: parseFloat(costTWDKG),
          costUSDKG: parseFloat(costUSDKG),
          costUSDY: parseFloat(costUSDY),
          quoteUSDY: parseFloat(quoteUSDY),
          quoteUSDM: parseFloat(quoteUSDM),
          quoteTWDM: parseFloat(quoteTWDM),
          quoteTWDY: parseFloat(quoteTWDY),
        },
      },
    });
  }, [salesCost, costUSDKG, costTWDKG, costUSDY, quoteUSDY]);
  useEffect(() => {
    updateData();
  }, [quote]);
  return (
    <QCard>
      <div className={styles.container}>
        <div className={styles.flexBox}>
          <div className={styles.title}>業務成本</div>
          <div className={styles.box}>
            <div className={styles.cost}>
              <label htmlFor="excuteCost">
                <span>行政費用</span>
                <TextField
                  variant="standard"
                  type="number"
                  id="excuteCost"
                  name="excuteCost"
                  value={salesCost.excuteCost || ''}
                  onChange={(e) => {
                    updateNumberField(e, componentID);
                    setSalesCost({
                      ...salesCost,
                      [e.target.name]: parseFloat(e.target.value),
                    });
                  }}
                  className={styles.textInput}
                  placeholder="NTD"
                  inputProps={{ step: 1, min: 0 }}
                />
              </label>
              <label htmlFor="shippingCost">
                <span>運輸費用</span>
                <TextField
                  variant="standard"
                  type="number"
                  id="shippingCost"
                  name="shippingCost"
                  value={salesCost.shippingCost || ''}
                  onChange={(e) => {
                    updateNumberField(e, componentID);
                    setSalesCost({
                      ...salesCost,
                      [e.target.name]: parseFloat(e.target.value),
                    });
                  }}
                  className={styles.textInput}
                  placeholder="NTD"
                  inputProps={{ step: 1, min: 0 }}
                />
              </label>
              <label htmlFor="testingCost">
                <span>測試費用</span>
                <TextField
                  variant="standard"
                  type="number"
                  id="testingCost"
                  name="testingCost"
                  value={salesCost.testingCost || ''}
                  onChange={(e) => {
                    updateNumberField(e, componentID);
                    setSalesCost({
                      ...salesCost,
                      [e.target.name]: parseFloat(e.target.value),
                    });
                  }}
                  className={styles.textInput}
                  placeholder="NTD"
                  inputProps={{ step: 1, min: 0 }}
                />
              </label>
              <label htmlFor="costTWDKG">
                <span>
                  總成本
                  <br />
                  TWD/KG
                </span>
                <TextField
                  variant="standard"
                  type="number"
                  id="costTWDKG"
                  name="costTWDKG"
                  disabled
                  value={costTWDKG || ''}
                  className={styles.textInput}
                  placeholder="NTD"
                  inputProps={{ step: 1, min: 0 }}
                />
              </label>
              <label htmlFor="costUSDKG">
                <span>
                  總成本
                  <br />
                  USD/KG
                </span>
                <TextField
                  variant="standard"
                  type="number"
                  id="costUSDKG"
                  name="costUSDKG"
                  disabled
                  value={costUSDKG || ''}
                  className={styles.textInput}
                  placeholder="USD"
                  inputProps={{ step: 1, min: 0 }}
                />
              </label>
            </div>
            <div className={styles.profit}>
              <label htmlFor="profit">
                <span>利潤</span>
                <TextField
                  variant="standard"
                  type="number"
                  name="profit"
                  id="profit"
                  value={salesCost.profit}
                  onChange={(e) => {
                    updateNumberField(e, componentID);
                    setSalesCost({
                      ...salesCost,
                      [e.target.name]: parseFloat(e.target.value),
                    });
                  }}
                  className={styles.textInput}
                  placeholder="%"
                  inputProps={{ step: 1, min: 0 }}
                />
              </label>
              <label htmlFor="exchangeRate">
                <span>匯率</span>
                <TextField
                  variant="standard"
                  type="number"
                  id="exchangeRate"
                  name="exchangeRate"
                  disabled
                  value={salesCost.exchangeRate}
                  onChange={(e) => updateNumberField(e, componentID)}
                  className={styles.textInput}
                  placeholder="%"
                  inputProps={{ step: 1, min: 0 }}
                />
              </label>
              <label htmlFor="tradeTermL">
                <span>貿易條件</span>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <Select
                  id="tradeTermL"
                  name="tradeTermL"
                  value={tradeTerm}
                  onChange={(e) => {
                    updateNumberField(e, componentID);
                    setTradeTerm(e.target.value);
                  }}
                  className={styles.textInput}
                  variant="standard"
                  displayEmpty
                >
                  <MenuItem key={0} value={0}>
                    請選擇...
                  </MenuItem>
                  {bussinessTermDB.map((option) => {
                    return (
                      <MenuItem key={option.id} value={option.id}>
                        {option.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </label>
              <label htmlFor="quoteDueDate">
                <span>報價期限</span>
                <TextField
                  variant="standard"
                  type="date"
                  id="quoteDueDate"
                  name="quoteDueDate"
                  value={quote.dyeCost.quoteDueDate}
                  onChange={(e) => updateTextField(e, componentID)}
                  className={styles.textInput}
                  placeholder=""
                  inputProps={{ step: 1, min: 0 }}
                />
              </label>
            </div>
          </div>
        </div>
        <div className={styles.quote}>
          <div className={styles.title}>報價資訊</div>
          <label htmlFor="quoteUSDY">
            <span>USD/Y</span>
            <TextField
              variant="standard"
              type="number"
              disabled
              id="quoteUSDY"
              name="quoteUSDY"
              value={quoteUSDY || ''}
              className={styles.textInput}
              placeholder=""
              inputProps={{ step: 1, min: 0 }}
            />
          </label>
          <label htmlFor="quoteUSDM">
            <span>USD/M</span>
            <TextField
              variant="standard"
              type="number"
              disabled
              id="quoteUSDM"
              name="quoteUSDM"
              value={quoteUSDM || ''}
              className={styles.textInput}
              placeholder=""
              inputProps={{ step: 1, min: 0 }}
            />
          </label>
          <label htmlFor="quoteTWDY">
            <span>TWD/Y</span>
            <TextField
              variant="standard"
              type="number"
              disabled
              id="quoteTWDY"
              name="quoteTWDY"
              value={quoteTWDY || ''}
              className={styles.textInput}
              placeholder=""
              inputProps={{ step: 1, min: 0 }}
            />
          </label>
          <label htmlFor="quoteTWDM">
            <span>TWD/M</span>
            <TextField
              variant="standard"
              type="number"
              disabled
              id="quoteTWDM"
              name="quoteTWDM"
              value={quoteTWDM || ''}
              // onChange={(e) => updateTextField(e, componentID)}
              className={styles.textInput}
              placeholder=""
              inputProps={{ step: 1, min: 0 }}
            />
          </label>
        </div>
      </div>
    </QCard>
  );
}
