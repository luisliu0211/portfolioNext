import React, { useContext, useEffect, useState } from 'react';
import styles from './filterBar.module.css';
import { getFormattedDate } from '@/lib/getDate';
import MyContext from '@/lib/context';
import throttle from '@/lib/throttle';
const tagsData = ['css/scss', 'javascript', 'html', 'react/next', 'database'];
export default function FilterBar() {
  const [dateRangeFrom, setDateRangeFrom] = useState(getFormattedDate());
  const [dateRangeTo, setDateRangeTo] = useState('2023-12-31');
  const context = useContext(MyContext);
  const handleDateOrder = (e) => {
    e.preventDefault();
    context.setFilter({
      ...context.filter,
      order: context.filter.order === 'ASC' ? 'DESC' : 'ASC',
    });
  };
  const handleDateRange = (e) => {
    e.preventDefault();
    document.querySelector('input[name="dateRangeTo"]').style.display = 'block';
    if (e.target.name == 'dateRangeFrom') {
      if (e.target.value > dateRangeTo) {
        alert('起始日不可大於結束日');
        // setDateRangeFrom(todayDate);
      } else {
        setDateRangeFrom(e.target.value);
        context.setFilter({
          ...context.filter,
          dateRangeFrom: e.target.value,
          dateRangeTo: dateRangeTo,
        });
      }
    } else {
      if (e.target.value < dateRangeFrom) {
        alert('結束日不可小於起始日');
        // setDateRangeTo(todayDate);
      } else {
        setDateRangeTo(e.target.value);
        context.setFilter({
          ...context.filter,
          dateRangeFrom: dateRangeFrom,
          dateRangeTo: e.target.value,
        });
      }
    }
  };
  const handleCategory = (e) => {
    e.preventDefault();
    context.setFilter({
      ...context.filter,
      category: e.target.value,
    });
  };

  // 陣列無法轉換成url傳到後端
  // 必須轉換成字串
  const handleTags = (value) => {
    context.setFilter((prevFilter) => {
      let updatedTags;
      const currentTags = prevFilter.tags
        .split(',')
        .filter((tag) => tag.trim() !== '');

      if (currentTags.includes(value)) {
        // 如果值已经存在，则从数组中移除
        updatedTags = currentTags.filter((tag) => tag !== value).join(',');
      } else {
        // 如果值不存在且不为空字符串，则添加到数组中
        if (value.trim() !== '') {
          updatedTags = [...currentTags, value].join(',');
        } else {
          updatedTags = currentTags.join(',');
        }
      }

      return {
        ...prevFilter,
        tags: updatedTags,
      };
    });
  };
  // const handleKeyword = (e) => {
  //   e.preventDefault();

  //   context.setFilter((filter) => ({
  //     ...filter,
  //     keywordSearch: e.target.value,
  //   }));
  // };
  const handleKeyword = throttle((e) => {
    e.preventDefault();
    context.setFilter((filter) => ({
      ...filter,
      keywordSearch: e.target.value,
    }));
  }, 500);
  useEffect(() => {
    document.querySelector('input[name="dateRangeTo"]').style.display = 'none';
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
        <button name="dateOrder" onClick={handleDateOrder}>
          按日期排序{context.filter.order == 'DESC' ? '大到小' : '小到大'}
        </button>
        <label className={styles.customDatePicker}>
          <span>
            日期篩選:
            {/* {context.store.text} */}
          </span>
          <input
            value={context.filter.dateRangeFrom || ''}
            name="dateRangeFrom"
            onChange={handleDateRange}
            type="date"
          />
          <input
            value={context.filter.dateRangeTo || ''}
            name="dateRangeTo"
            onChange={handleDateRange}
            type="date"
          />
        </label>
        <select
          name="category"
          className={styles.category}
          onChange={handleCategory}
        >
          <option value="">All</option>
          <option value="frontend">FrontEnd</option>
          <option value="backend">BackEnd</option>
          <option value="other">other</option>
        </select>
      </div>

      <div className={styles.rightBox}>
        <ul className={styles.tagBox}>
          {tagsData.map((tag, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  handleTags(tag);
                }}
                className={
                  context.filter.tags.includes(tag) ? styles.selectedTag : ''
                }
              >
                {tag}
              </li>
            );
          })}
        </ul>
        <label htmlFor="keywordSearch">
          <input
            id="keywordSearch"
            type="text"
            name="search"
            placeholder="searchContent"
            onChange={handleKeyword}
          />
        </label>
      </div>
    </div>
  );
}
