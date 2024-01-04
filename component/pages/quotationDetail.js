import React, { useState, useContext, useEffect } from 'react';
import QCard from '../layouts/qCard';
import styles from './quotationDetail.module.css';
import MyContext from '@/lib/context';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
export default function QuotationDetail(props) {
  const { componentID, bussinessTermDB } = props;
  const { quote, dispatch, updateTextField, updateNumberField, ifEdit } =
    useContext(MyContext);
  const [salesCost, setSalesCost] = useState(quote.salesCost);
  const [costTWDKG, setCostTWDKG] = useState(quote.dyeCost.totalCost);
  const [tradeTerm, setTradeTerm] = useState(quote.salesCost.tradeTerm);
  const [costUSDKG, setCostUSDKG] = useState(salesCost.costUSDKG);
  const [costUSDY, setCostUSDY] = useState(salesCost.costUSDY);
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
  const getSthById = (id, DB) => {
    const sthValue = DB.find((item) => item.id === id);
    return sthValue ? sthValue : undefined;
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
                {ifEdit ? (
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
                ) : (
                  <div className={styles.viewDataText}>
                    {quote.salesCost.excuteCost}
                  </div>
                )}
              </label>
              <label htmlFor="shippingCost">
                <span>運輸費用</span>
                {ifEdit ? (
                  <TextField
                    variant="standard"
                    type="number"
                    id="shippingCost"
                    name="shippingCost"
                    disabled={!ifEdit}
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
                ) : (
                  <div className={styles.viewDataText}>
                    {quote.salesCost.shippingCost}
                  </div>
                )}
              </label>
              <label htmlFor="testingCost">
                <span>測試費用</span>
                {ifEdit ? (
                  <TextField
                    variant="standard"
                    type="number"
                    id="testingCost"
                    name="testingCost"
                    disabled={!ifEdit}
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
                ) : (
                  <div className={styles.viewDataText}>
                    {quote.salesCost.testingCost}
                  </div>
                )}
              </label>
              <label htmlFor="costTWDKG">
                <span>
                  總成本
                  <br />
                  TWD/KG
                </span>
                {ifEdit ? (
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
                ) : (
                  <div className={styles.viewDataText}>
                    {quote.salesCost.costTWDKG}
                  </div>
                )}
              </label>
              <label htmlFor="costUSDKG">
                <span>
                  總成本
                  <br />
                  USD/KG
                </span>
                {ifEdit ? (
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
                ) : (
                  <div className={styles.viewDataText}>
                    {quote.salesCost.costUSDKG}
                  </div>
                )}
              </label>
            </div>
            <div className={styles.profit}>
              <label htmlFor="profit">
                <span>利潤</span>
                {ifEdit ? (
                  <TextField
                    variant="standard"
                    type="number"
                    name="profit"
                    id="profit"
                    disabled={!ifEdit}
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
                ) : (
                  <div className={styles.viewDataText}>
                    {quote.salesCost.profit}
                  </div>
                )}
              </label>
              <label htmlFor="exchangeRate">
                <span>匯率</span>
                {ifEdit ? (
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
                ) : (
                  <div className={styles.viewDataText}>
                    {quote.salesCost.exchangeRate}
                  </div>
                )}
              </label>
              <label htmlFor="tradeTerm">
                <span>貿易條件</span>
                {ifEdit ? (
                  <Select
                    id="tradeTerm"
                    name="tradeTerm"
                    value={tradeTerm}
                    disabled={!ifEdit}
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
                ) : (
                  <div className={styles.viewDataText}>
                    {
                      getSthById(quote.salesCost.tradeTerm, bussinessTermDB)
                        .title
                    }
                  </div>
                )}
              </label>
              <label htmlFor="quoteDueDate">
                <span>報價期限</span>
                {ifEdit ? (
                  <TextField
                    variant="standard"
                    type="date"
                    id="quoteDueDate"
                    name="quoteDueDate"
                    disabled={!ifEdit}
                    value={quote.salesCost.quoteDueDate}
                    onChange={(e) => updateTextField(e, componentID)}
                    className={styles.textInput}
                    placeholder=""
                    inputProps={{ step: 1, min: 0 }}
                  />
                ) : (
                  <div className={styles.viewDataText}>
                    {quote.salesCost.quoteDueDate.split('T')[0]}
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
        <div className={styles.quote}>
          <div className={styles.title}>報價資訊</div>
          <label htmlFor="quoteUSDY">
            <span>USD/Y</span>
            {ifEdit ? (
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
            ) : (
              <div className={styles.viewDataText}>{quoteUSDY}</div>
            )}
          </label>
          <label htmlFor="quoteUSDM">
            <span>USD/M</span>
            {ifEdit ? (
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
            ) : (
              <div className={styles.viewDataText}>{quoteUSDM}</div>
            )}
          </label>
          <label htmlFor="quoteTWDY">
            <span>TWD/Y</span>
            {ifEdit ? (
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
            ) : (
              <div className={styles.viewDataText}>{quoteTWDY}</div>
            )}
          </label>
          <label htmlFor="quoteTWDM">
            <span>TWD/M</span>
            {ifEdit ? (
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
            ) : (
              <div className={styles.viewDataText}>{quoteTWDM}</div>
            )}
          </label>
        </div>
      </div>
    </QCard>
  );
}
