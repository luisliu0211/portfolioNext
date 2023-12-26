import React, { use, useEffect } from 'react';
import Layout from '@/component/layouts/layout';
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
import MailIcon from '@mui/icons-material/Mail';
import MyContext from '@/lib/context';
let yarnDB = [
  {
    id: 1,
    title: 'T75D/72F DTY SD',
    text: '...text',
    label: 'T75D/72F DTY SD',
    price: 80,
    source: '遠東',
    unit: 1,
    type: 'Polyester',
    por: 30,
  },
  {
    id: 2,
    title: 'T75D/36F FDY SD',
    text: '...text',
    label: 'T75D/72F FDY SD',
    price: 85,
    source: '台化',
    unit: 1,
    type: 'Polyester',
    por: 20,
  },
  {
    id: 3,
    title: 'OP20D',
    text: '...tttext',
    label: 'OP20D',
    price: 205,
    source: '台化',
    unit: 1,
    type: 'OP',
    por: 20,
  },
  {
    id: 4,
    title: 'OP30D',
    text: '...tttext',
    label: 'OP30D',
    price: 100,
    source: '立統',
    unit: 2,
    type: 'OP',
    por: 25,
  },
  {
    id: 5,
    title: 'OP40D',
    text: '...tttext',
    label: 'OP40D',
    source: '立統',
    price: 290,
    unit: 2,
    type: 'OP',
    por: 25,
  },
];
let clientDB = [
  { id: 1, team: '353E', name: 'TNF', label: '353E TNF', DBtype: 'clientId' },
  {
    id: 2,
    team: '048E',
    name: 'Columbia',
    label: '048E Columbia',
    DBtype: 'clientId',
  },
  {
    id: 3,
    team: '342E',
    name: 'Adidas',
    label: '342E Adidas',
    DBtype: 'clientId',
  },
];
// item
const initState = {
  id: 1,
  authur: 'Luis',
  team: 1,
  createDate: '2023-12-23',
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
    machineType: null,
    machineSpec: '',
    other: '',
    densityWarp: '',
    densityWeft: '',
    fabricProcessFee: null,
    fabricCost: null,
    totalWastage: null,
    yarnInfo: [],
    totalYarnCost: null,
  },
  dyeCost: {
    dyeLightCost: null,
    dyeAverageCost: null,
    dyeDarkCost: null,
    process: [],
    specialProcess: [],
    totalCost: null,
    RDReference: '',
  },
  salesCost: {
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
  },
};
const quoteReducer = (quote = initState, action) => {
  console.log(quote, action);
  const { field, value, name, newYarn, index, saveInfo, data, selectedIds } =
    action.payload;
  // console.log(action.type);
  let yarnList = quote.yarnCost.yarnInfo;
  switch (action.type) {
    case 'fieldTextChange':
      return { ...quote, [field]: { ...quote[field], [name]: value } };
    case 'fieldNumberChange':
      return { ...quote, [field]: { ...quote[field], [name]: value } };
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
      console.log('fe');
      return quote;
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
          console.log(newGy, name, 'newGy');
          dispatch({
            type: 'fieldNumberChange',
            payload: { field, name: name, value: parseFloat(newGy) }, // Corrected to use newName and parseFloat
          });
        }
        break;
      case 'gsm':
        if (gsm !== null && width !== null) {
          let newGy = (((roundedWidth + 2) * value) / 43).toFixed(2);
          console.log(newGy, 'newGy');
          let name = 'gy';
          dispatch({
            type: 'fieldNumberChange',
            payload: { field, name: name, value: parseFloat(newGy) }, // Corrected to use newName and parseFloat
          });
        }
        break;
    }
  };
  // const updateAutoComplteData = (index, name, value, field, ...arg) => {
  //   let listName = arg[0];
  //   console.log(
  //     `修改在quote裡面 ${field}下層裡面的${listName} 陣列 選取第${index}個 修改key value為 ${name}:${value}`
  //   );
  //   dispatch({
  //     type: 'fieldAutoCompleteChange',
  //     payload: { field, listName, index, name, value },
  //   });
  // };
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
    console.log(field, name, value);
    dispatch({
      type: 'fieldTextChange',
      payload: { field, name, value },
    });
  };
  const [open, setOpen] = useState(false);
  const handleClear = (e) => {
    console.log('clear');
  };
  const handleSave = (e) => {
    console.log('save');
  };
  const toggleDrawer = (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    console.log('eji');
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    console.log('quote', quote);
  });
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
        }}
      >
        <FlexBox>
          <Column>
            <FabricInfo componentID="fabricInfo" clientDB={clientDB} />
            <YarnList componentID="yarnCost" yarnDB={yarnDB} />
            <DyeMethod componentID="dyeCost" />
            <QuotationDetail componentID="salesCost" />
            <ButtonGroup size="large">
              <Button variant="contained" onClick={handleClear}>
                Clear 清空
              </Button>
              <Button variant="contained" onClick={handleSave}>
                Save 儲存
              </Button>
              <Button variant="contained" onClick={toggleDrawer}>
                其他功能
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
                <ListItemButton>
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
