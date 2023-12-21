import React from 'react';
import QCard from '../layouts/qCard';
import styles from './quotationDetail.module.css';
import FlexBox from '../layouts/flexBox';
import Column from '../layouts/column';
export default function QuotationDetail() {
  return (
    <QCard>
      <div className={styles.container}>
        <div className={styles.flexBox}>
          <div className={styles.title}>業務成本</div>
          <div className={styles.box}>
            <div className={styles.cost}>
              <label htmlFor="">
                <span>行政費用</span>
                <input type="number" min={0} />
              </label>
              <label htmlFor="">
                <span>運輸費用</span>
                <input type="number" min={0} />
              </label>
              <label htmlFor="">
                <span>測試費用</span>
                <input type="number" min={0} />
              </label>
            </div>
            <div className={styles.profit}>
              <label htmlFor="">
                <span>利潤</span>
                <input type="number" min={0} />
              </label>
              <label htmlFor="">
                <span>匯率</span>
                <input type="number" min={0} />
              </label>
              <label htmlFor="">
                <span>貿易條件</span>
                <input type="text" />
              </label>
              <label htmlFor="">
                <span>報價期限</span>
                <input type="date" />
              </label>
            </div>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.profit1}>
            <div className={styles.title}>報價資訊</div>
            <label htmlFor="">
              <span>USD/Y</span>
              <input type="number" min={0} />
            </label>
            <label htmlFor="">
              <span>USD/M</span>
              <input type="number" min={0} />
            </label>
            <label htmlFor="">
              <span>TWD/KG</span>
              <input type="number" min={0} />
            </label>
            <label htmlFor="">
              <span>TWD/KG</span>
              <input type="number" min={0} />
            </label>
          </div>
        </div>
      </div>
    </QCard>
  );
}
