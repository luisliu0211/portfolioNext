import React, { use, useEffect } from 'react';
import Layout from '@/component/layouts/layout';
import { handleShifttoExcel } from '@/lib/downloadXlsx';
import Content from '@/component/layouts/content';
import Column from '@/component/layouts/column';
import Breadcrumbs from '@/component/props/breadcrumbs';
import { useRouter } from 'next/router';
import SideBar from '@/component/sideBar';
import FlexBox from '@/component/layouts/flexBox';
import FabricInfo from '@/component/pages/fabricInfo';
import DyeMethod from '@/component/pages/dyeMethod';
import QuotationDetail from '@/component/pages/quotationDetail';
import YarnList from '@/component/pages/yarnList';
import { Button } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useState, useReducer } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MyContext from '@/lib/context';
import { getFormattedDate } from '@/lib/getDate';
import { useCheckMobile } from '@/hook/useCheckMobile';
import yarnDB from '@/yarnDB';
import clientDB from '@/clientDB';
import processDB from '@/processDB';
import specialProcessDB from '@/specialProcessDB';
import machineList from '@/machineList';
import priceUnit from '@/priceUnit';
import bussinessTermDB from '@/bussinessTermDB';
// item
const initState = {
  id: 1,
  authur: 'Luis',
  team: 1,
  createDate: getFormattedDate(),
  lastRevise: '2023-12-25',
  state: 'issue',
  fabricInfo: {
    clientId: 0,
    fabricItem: '',
    description: '',
    width: null,
    gsm: null,
    gy: null,
    brand: '',
  },
  yarnCost: {
    machineType: '',
    machineSpec: '',
    other: '',
    densityWarp: '',
    densityWeft: '',
    fabricProcessFee: 0,
    fabricCost: 0,
    totalWastage: 0,
    yarnInfo: [],
    totalYarnCost: null,
  },
  dyeCost: {
    dyeLightCost: 0,
    dyeAverageCost: 0,
    dyeDarkCost: 0,
    process: [],
    specialProcess: [],
    totalCost: null,
    RDReference: '',
    totalCost: 0,
    totalCostD: 0,
    totalCostL: 0,
  },
  salesCost: {
    excuteCost: null,
    shippingCost: null,
    testingCost: null,
    profit: 0,
    exchangeRate: 28,
    tradeTerm: 0,
    quoteDueDate: getFormattedDate(),
    quoteUSDY: null,
    quoteUSDM: null,
    quoteTWDY: null,
    quoteTWDM: null,
    costTWDKG: null,
    costUSDKG: null,
    costUSDY: null,
  },
};
const quoteReducer = (quote = initState, action) => {
  // console.log(quote, action);
  const {
    field,
    value,
    name,
    newYarn,
    index,
    saveInfo,
    data,
    selectedIds,
    fabricSpecString,
  } = action.payload;
  // console.log(action.type);
  let yarnList = quote.yarnCost.yarnInfo;
  switch (action.type) {
    case 'fieldTextChange':
      return { ...quote, [field]: { ...quote[field], [name]: value } };
    case 'fieldNumberChange':
      return {
        ...quote,
        [field]: {
          ...quote[field],
          [name]: value,
          ...(fabricSpecString ? { fabricSpecString: fabricSpecString } : {}),
        },
      };
    case 'yarnAdd':
      // 複製原始陣列 加入新資料
      yarnList = [...yarnList, newYarn];
      return { ...quote, yarnCost: { ...quote.yarnCost, yarnInfo: yarnList } };
    case 'yarnSave':
      // console.log('儲存哪一筆', index, saveInfo);
      // 複製原始陣列 加入新資料
      yarnList = [...yarnList].map((item, itemIndex) => {
        if (itemIndex + 1 == index) {
          return saveInfo;
        } else {
          return item;
        }
      });
      return { ...quote, yarnCost: { ...quote.yarnCost, yarnInfo: yarnList } };
    case 'yarnDelete':
      // console.log('刪除第幾個', index);
      yarnList = [...yarnList].filter((_, itemIndex) => itemIndex !== index);
      return { ...quote, yarnCost: { ...quote.yarnCost, yarnInfo: yarnList } };
    // case 'fieldAutoCompleteChange':
    //   // 修改在quote裡面 yarnCost下層裡面的yarnInfo 陣列 選取第2個 修改key value為 yarnSpec:3
    //   // console.log(name, value);
    //   // 篩選修改內容
    //   let newInfo = [...quote[field][listName]].map((i, itemId) => {
    //     if (itemId + 1 === index) {
    //       return { ...i, [name]: value };
    //     }
    //     return i;
    //   });
    //   return {
    //     ...quote,
    //     [field]: {
    //       ...quote[field],
    //       [listName]: newInfo,
    //     },
    //   };
    case 'updateAutoCountData':
      return { ...quote, [field]: { ...quote[field], ...data } };
    case 'updateIDinArray':
      return { ...quote, [field]: { ...quote[field], [name]: selectedIds } };
    // return quote;
    default:
      return quote;
  }
};

export default function Quotation() {
  const [quote, dispatch] = useReducer(quoteReducer, initState);
  const updateTextField = (e, field) => {
    let name = e.target.name;
    let value = e.target.value;
    dispatch({
      type: 'fieldTextChange',
      payload: { field, name, value },
    });
  };
  const updateNumberField = (e, field) => {
    let name = e.target.name;
    let value = parseFloat(e.target.value);
    dispatch({
      type: 'fieldNumberChange',
      payload: { field, name, value },
    });
    // 計算幅寬克重換算
    let { gsm, width } = quote.fabricInfo;
    const roundedWidth = width !== null ? width : 0;
    const roundedGsm = gsm !== null ? gsm : 0;
    switch (e.target.id) {
      case 'width':
        if (gsm !== null && width !== null) {
          let newGy = (((value + 2) * roundedGsm) / 43).toFixed(2);
          let name = 'gy';
          let fabricSpecString = `針內${value}吋X${roundedGsm}GSM ${newGy}g/y`;
          dispatch({
            type: 'fieldNumberChange',
            payload: {
              field,
              name: name,
              value: parseFloat(newGy),
              fabricSpecString: fabricSpecString,
            }, // Corrected to use newName and parseFloat
          });
        }
        break;
      case 'gsm':
        if (gsm !== null && width !== null) {
          let newGy = (((roundedWidth + 2) * value) / 43).toFixed(2);
          let name = 'gy';
          let fabricSpecString = `針內${roundedWidth}吋X${value}GSM ${newGy}g/y`;
          dispatch({
            type: 'fieldNumberChange',
            payload: {
              field,
              name: name,
              value: parseFloat(newGy),
              fabricSpecString: fabricSpecString,
            }, // Corrected to use newName and parseFloat
          });
        }
        break;
    }
  };
  const deleteListInfo = (index) => {
    console.log('刪除？', index);
    var r = confirm('確認刪除？!');
    console.log(index);
    if (r == true) {
      dispatch({
        type: 'yarnDelete',
        payload: {
          index,
        },
      });
    }
    return;
  };
  const updateAutoValue = (field, name, value) => {
    dispatch({
      type: 'fieldTextChange',
      payload: { field, name, value },
    });
  };
  const [open, setOpen] = useState(false);
  const isMobile = useCheckMobile();
  const handleItemClick = (text) => {
    // 根据不同的文本执行不同的功能
    switch (text) {
      case '轉成PDF':
        // 执行转成PDF的功能
        console.log('轉成PDF TBA');
        break;
      case '轉成Excel':
        // 执行转成Excel的功能
        handleShifttoExcel(quote);
        break;
      case '返回報價清單':
        // 执行返回报价清单的功能
        console.log('返回報價清單 TBA');
        break;
      default:
        // 默认情况
        break;
    }
  };
  const handleSave = (e) => {
    console.log(quote, 'final quote save');
    handleSavetoDB();
  };
  const handleSavetoDB = async () => {
    alert('測試中');
    // try {
    //   const response = await fetch(`${apiUrl}/api/quotation`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ quote }),
    //     credentials: 'include',
    //   });
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   // const result = await response.json();
    //   router.reload();
    // } catch (error) {
    //   console.error('Error saving data to the database:', error);
    // }
  };
  const handleIssue = () => {};

  const toggleDrawer = (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    console.log('quote', quote);
  }, [quote]);
  return (
    <Layout>
      <Content />
      <MyContext.Provider
        value={{
          quote,
          dispatch,
          updateTextField,
          updateNumberField,
          deleteListInfo,
          updateAutoValue,
          isMobile,
        }}
      >
        <FlexBox>
          <Column>
            <FabricInfo componentID="fabricInfo" clientDB={clientDB} />
            <YarnList
              componentID="yarnCost"
              yarnDB={yarnDB}
              machineList={machineList}
              priceUnit={priceUnit}
            />
            <DyeMethod
              componentID="dyeCost"
              processDB={processDB}
              specialProcessDB={specialProcessDB}
            />
            <QuotationDetail
              componentID="salesCost"
              bussinessTermDB={bussinessTermDB}
            />
            <ButtonGroup size="large">
              <Button variant="contained">清空</Button>
              <Button variant="contained" onClick={handleSave}>
                儲存
              </Button>
              <Button variant="contained" onClick={() => handleIssue(quote)}>
                發布
              </Button>
              <Button variant="contained" onClick={toggleDrawer}>
                其他
              </Button>
            </ButtonGroup>
          </Column>
        </FlexBox>
      </MyContext.Provider>
      <Drawer open={open} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            {['轉成PDF', '轉成Excel', '返回報價清單'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleItemClick(text)}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Layout>
  );
}
