import React from 'react';
import QCard from '../layouts/qCard';
import FlexBox from '@/component/layouts/flexBox';
import styles from './dyeMethod.module.css';
export default function DyeMethod() {
  return (
    <QCard>
      <div className={styles.title}>染色</div>
      <div className={styles.dyeList}>
        <label htmlFor="">
          <span>淺色工繳</span>
          <input type="number" placeholder="TWD/KG" />
        </label>
        <label htmlFor="">
          <span>中色工繳</span>
          <input type="number" placeholder="TWD/KG" />
        </label>
        <label htmlFor="">
          <span>深色工繳</span>
          <input type="number" placeholder="TWD/KG" />
        </label>
      </div>
      <div className={styles.additonal}>
        <label htmlFor="">
          <span>加工製程</span>
          <select name="languages" id="lang" multiple>
            <option value="select">選擇製程</option>
            <option value="">下水</option>
            <option value="">縮練</option>
            <option value="">胚定</option>
            <option value="">染色</option>
            <option value="">上油</option>
            <option value="">單刷</option>
            <option value="">雙刷</option>
            <option value="">梳剪</option>
            <option value="">拋光</option>
            <option value="">單搖</option>
            <option value="">雙搖</option>
            <option value="">背刷剪</option>
            <option value="">磨毛</option>
            <option value="">定型</option>
            <option value="">上漿</option>
            <option value="">切邊</option>
          </select>
        </label>
        <label htmlFor="">
          <span>特殊加工</span>
          <select name="languages" id="lang" multiple>
            <option value="select">選擇特殊加工</option>
            <option value="">熱燙</option>
            <option value="">吸濕</option>
            <option value="">排汗</option>
            <option value="">抗菌</option>
            <option value="">抗臭</option>
            <option value="">防霉</option>
            <option value="">抗靜電</option>
            <option value="">抗UV</option>
            <option value="">防勾紗</option>
            <option value="">潑水</option>
            <option value="">超潑水</option>
            <option value="">貼合</option>
            <option value="">印花</option>
            <option value="">上膠</option>
          </select>
        </label>
        <div className={styles.finalCost}>
          <label htmlFor="">
            <span>總成本</span>
            <input type="number" />
          </label>
          <label htmlFor="">
            <span>RD參考</span>
            <input type="text" />
          </label>
        </div>
      </div>
    </QCard>
  );
}
