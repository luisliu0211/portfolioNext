import React, { useState, useContext } from 'react';
import QCard from '../layouts/qCard';
import styles from './quotationDetail.module.css';
import FlexBox from '../layouts/flexBox';
import Column from '../layouts/column';
import MyContext from '@/lib/context';
import TextField from '@mui/material/TextField';
export default function QuotationDetail(props) {
  const { componentID } = props;
  const { quote, updateTextField, updateNumberField } = useContext(MyContext);
  const [salesCost, setSalesCost] = useState({
    excuteCost: null,
    shippingCost: null,
    testingCost: null,
    profit: null,
    exchangeRate: null,
    tradeTerm: 'FOB HCMC',
    quoteDueDate: '2024-01-01',
    quoteUSDY: null,
    quoteUSDM: null,
    quoteTWDY: null,
    quoteTWDM: null,
    costTWDKG: null,
  });
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
                  value={quote.dyeCost.excuteCost}
                  onChange={(e) => updateNumberField(e, componentID)}
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
                  value={quote.dyeCost.shippingCost}
                  onChange={(e) => updateNumberField(e, componentID)}
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
                  value={quote.dyeCost.testingCost}
                  onChange={(e) => updateNumberField(e, componentID)}
                  className={styles.textInput}
                  placeholder="NTD"
                  inputProps={{ step: 1, min: 0 }}
                />
              </label>
              <label htmlFor="costTWDKG">
                <span>估算成本</span>
                <TextField
                  variant="standard"
                  type="number"
                  id="costTWDKG"
                  name="costTWDKG"
                  disabled
                  value={quote.dyeCost.costTWDKG}
                  onChange={(e) => updateNumberField(e, componentID)}
                  className={styles.textInput}
                  placeholder="NTD"
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
                  disabled
                  value={quote.dyeCost.profit}
                  onChange={(e) => updateNumberField(e, componentID)}
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
                  value={quote.dyeCost.exchangeRate}
                  onChange={(e) => updateNumberField(e, componentID)}
                  className={styles.textInput}
                  placeholder="%"
                  inputProps={{ step: 1, min: 0 }}
                />
              </label>
              <label htmlFor="tradeTerm">
                <span>貿易條件</span>
                <TextField
                  variant="standard"
                  type="text"
                  id="tradeTerm"
                  name="tradeTerm"
                  value={quote.dyeCost.exchangeRate}
                  onChange={(e) => updateTextField(e, componentID)}
                  className={styles.textInput}
                  placeholder="FOB HCMC"
                  inputProps={{ step: 1, min: 0 }}
                />
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
        <div className={styles.box}>
          <div className={styles.profit1}>
            <div className={styles.title}>報價資訊</div>
            <label htmlFor="quoteUSDY">
              <span>USD/Y</span>
              <TextField
                variant="standard"
                type="number"
                disabled
                id="quoteUSDY"
                name="quoteUSDY"
                value={quote.dyeCost.quoteDueDate}
                onChange={(e) => updateTextField(e, componentID)}
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
                value={quote.dyeCost.quoteDueDate}
                onChange={(e) => updateTextField(e, componentID)}
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
                value={quote.dyeCost.quoteDueDate}
                onChange={(e) => updateTextField(e, componentID)}
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
    </QCard>
  );
}
