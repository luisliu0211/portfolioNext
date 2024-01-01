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
import { getFormattedDate } from '@/lib/getDate';
import { useCheckMobile } from '@/hook/useCheckMobile';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
let yarnDB = [
  {
    id: 1,
    title: 'T75D/72F DTY SD',
    text: '麗雪12/31報價',
    label: 'T75D/72F DTY SD',
    price: 50,
    source: '遠東',
    unit: 2,
    type: 'Polyester',
  },
  {
    id: 2,
    title: 'T75D/36F FDY SD',
    text: '麗雪12/31報價',
    label: 'T75D/72F FDY SD',
    price: 85,
    source: '台化',
    unit: 1,
    type: 'Polyester',
  },
  {
    id: 3,
    title: 'OP20D',
    text: '麗雪1/3報價',
    label: 'OP20D',
    price: 205,
    source: '台化',
    unit: 2,
    type: 'OP',
  },
  {
    id: 4,
    title: 'OP30D',
    text: '麗雪1/3報價',
    label: 'OP30D',
    price: 100,
    source: '立統',
    unit: 2,
    type: 'OP',
  },
  {
    id: 5,
    title: 'OP40D',
    text: '麗雪1/5報價',
    label: 'OP40D',
    source: '立統',
    price: 290,
    unit: 2,
    type: 'OP',
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
let processDB = [
  { id: 1, title: '下水', DBtype: 'process' },
  { id: 2, title: '縮練', DBtype: 'process' },
  { id: 3, title: '胚定', DBtype: 'process' },
  { id: 4, title: '染色', DBtype: 'process' },
  { id: 5, title: '上油', DBtype: 'process' },
  { id: 6, title: '單刷', DBtype: 'process' },
  { id: 7, title: '雙刷', DBtype: 'process' },
  { id: 8, title: '梳剪', DBtype: 'process' },
  { id: 9, title: '拋光', DBtype: 'process' },
  { id: 10, title: '雙搖', DBtype: 'process' },
  { id: 11, title: '背刷剪', DBtype: 'process' },
  { id: 12, title: '雙搖', DBtype: 'process' },
  { id: 13, title: '磨毛', DBtype: 'process' },
  { id: 14, title: '定型', DBtype: 'process' },
  { id: 15, title: '上漿', DBtype: 'process' },
  { id: 16, title: '切邊', DBtype: 'process' },
];
let specialProcessDB = [
  { id: 1, title: '熱燙', DBtype: 'specialProcess' },
  { id: 2, title: '吸濕', DBtype: 'specialProcess' },
  { id: 3, title: '排汗', DBtype: 'specialProcess' },
  { id: 4, title: '抗菌', DBtype: 'specialProcess' },
  { id: 5, title: '抗臭', DBtype: 'specialProcess' },
  { id: 6, title: '防霉', DBtype: 'specialProcess' },
  { id: 7, title: '抗靜電', DBtype: 'specialProcess' },
  { id: 8, title: '抗UV', DBtype: 'specialProcess' },
  { id: 9, title: '防勾紗', DBtype: 'specialProcess' },
  { id: 10, title: '潑水', DBtype: 'specialProcess' },
  { id: 11, title: '超潑水', DBtype: 'specialProcess' },
  { id: 12, title: '貼合', DBtype: 'specialProcess' },
  { id: 13, title: '印花', DBtype: 'specialProcess' },
  { id: 14, title: '上膠', DBtype: 'specialProcess' },
];
let machineList = [
  { id: 1, title: '經編' },
  { id: 2, title: '橫編YOKO' },
  { id: 3, title: '毛巾' },
  { id: 4, title: '台車' },
  { id: 5, title: '單面' },
  { id: 6, title: '單面大剖' },
  { id: 7, title: '雙面' },
  { id: 8, title: '螺紋' },
];
let priceUnit = [
  { id: 1, title: 'USD/KG', NTDrate: 28 },
  { id: 2, title: 'TWD/KG', NTDrate: 1 },
];
let bussinessTermDB = [
  { id: 1, title: 'FOB HCMC' },
  { id: 2, title: 'FOR HCMC' },
  { id: 3, title: 'CIF HCMC' },
  { id: 4, title: 'FOB TW' },
  { id: 5, title: 'CIF TW' },
  { id: 6, title: 'DDU HCMC' },
  { id: 7, title: 'DDP HCMC' },
];
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
    yarnInfo: [
      {
        yarnPort: 94,
        yarnPrice: 85,
        yarnSource: '台化',
        yarnSpec: 1,
        yarnType: 'Polyester',
        yarnUnit: 2,
        yarnQuoteText: '麗雪1/1報價',
      },
      {
        yarnPort: 6,
        yarnPrice: 120,
        yarnSource: '台化',
        yarnSpec: 3,
        yarnType: 'OP',
        yarnUnit: 2,
        yarnQuoteText: '麗雪12/31報價',
      },
    ],
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
          dispatch({
            type: 'fieldNumberChange',
            payload: { field, name: name, value: parseFloat(newGy) }, // Corrected to use newName and parseFloat
          });
        }
        break;
      case 'gsm':
        if (gsm !== null && width !== null) {
          let newGy = (((roundedWidth + 2) * value) / 43).toFixed(2);
          let name = 'gy';
          dispatch({
            type: 'fieldNumberChange',
            payload: { field, name: name, value: parseFloat(newGy) }, // Corrected to use newName and parseFloat
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
  const handleClear = async (data) => {
    const response = await fetch(`${apiUrl}/public/quotationList.xlsx`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Excel file. Status: ${response.status}`);
    }
    const blobData = await response.blob();
    const arrayBuffer = await new Response(blobData).arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    const sheetName = '報價分析單'; // 假设你要修改的工作表的名称是 Sheet1
    const sheet = workbook.getWorksheet(sheetName);
    sheet.views = [
      {
        showGridLines: false, // 关闭默认的网格线
      },
    ];
    // 基本資料
    let client = getSthById(data.fabricInfo.clientId, clientDB)
      ? getSthById(data.fabricInfo.clientId, clientDB).label
      : '未設定';
    sheet.getCell('B3').value = client;
    sheet.getCell('E3').value = data.fabricInfo.fabricItem;
    sheet.getCell('H3').value = data.fabricInfo.brand;
    sheet.getCell('B5').value = data.fabricInfo.width;
    sheet.getCell('D5').value = data.fabricInfo.gsm;
    // sheet.getCell('F5').value = data.fabricInfo.gy;
    sheet.getCell('I5').value = data.createDate.replace(/-/g, '/');
    sheet.getCell('B4').value = data.fabricInfo.description;
    sheet.getCell('H34').value = data.authur;

    // 紗支資料
    let yarnNumber = data.yarnCost.yarnInfo.length;
    for (let i = 0; i < yarnNumber; i++) {
      let yarnTitle = getSthById(
        data.yarnCost.yarnInfo[i].yarnSpec,
        yarnDB
      ).title;
      let yarnUnit = getSthById(
        data.yarnCost.yarnInfo[i].yarnUnit,
        priceUnit
      ).title;
      sheet.getCell(`B${7 + i}`).value = yarnTitle;
      sheet.getCell(`D${7 + i}`).value =
        data.yarnCost.yarnInfo[i].yarnPort / 100;
      sheet.getCell(`F${7 + i}`).value = data.yarnCost.yarnInfo[i].yarnSource;
      sheet.getCell(`H${7 + i}`).value = data.yarnCost.yarnInfo[i].yarnPrice;
      sheet.getCell(`I${7 + i}`).value = yarnUnit;
    }
    // // 紗規格
    sheet.getCell('B13').value = data.yarnCost.machineSpec;
    sheet.getCell('E13').value = data.yarnCost.fabricProcessFee;
    sheet.getCell('I13').value = data.yarnCost.totalWastage / 100;
    sheet.getCell(
      'H20'
    ).value = `1英吋經向密度目數:${data.yarnCost.densityWarp}`;
    sheet.getCell(
      'H21'
    ).value = `1英吋緯向密度目數:${data.yarnCost.densityWeft}`;
    // // 染整工繳
    sheet.getCell('D20').value = data.dyeCost.dyeAverageCost;
    // 業務工繳
    sheet.getCell('G24').value = data.salesCost.excuteCost;
    sheet.getCell('G25').value = data.salesCost.testingCost;
    sheet.getCell('G26').value = data.salesCost.shippingCost;
    sheet.getCell('G27').value = data.salesCost.profit / 100;
    sheet.getCell('G28').value = data.salesCost.exchangeRate;
    sheet.getCell('G32').value = data.salesCost.quoteDueDate.replace(/-/g, '/');
    let tradeTerm = getSthById(data.salesCost.tradeTerm, bussinessTermDB)
      ? getSthById(data.salesCost.tradeTerm, bussinessTermDB).title
      : '未設定';
    sheet.getCell('H31').value = tradeTerm;
    // 将修改后的数据转换为 Blob
    const modifiedBlob = await workbook.xlsx.writeBuffer();

    // 創建一個連結
    const a = document.createElement('a');
    const blobUrl = URL.createObjectURL(
      new Blob([modifiedBlob], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
    );
    a.href = blobUrl;
    a.download = `報價分析單-${quote.fabricInfo.fabricItem}.xlsx`; // 指定下載的檔案名稱
    document.body.appendChild(a);
    // 模擬點選連結以觸發下載
    a.click();
    // 清理釋放效能
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
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
  const handleIssue = async (data) => {
    const response = await fetch(
      `http://localhost:8080/public/quotationList.xlsx`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch Excel file. Status: ${response.status}`);
    }
    const blobData = await response.blob();
    const arrayBuffer = await new Response(blobData).arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });

    const sheetName = '報價分析單'; // 假设你要修改的工作表的名称是 Sheet1
    const sheet = workbook.Sheets[sheetName];
    const originalRef = sheet['!ref'];
    sheet['!ref'] = originalRef;
    // 基本資料
    let client = getSthById(data.fabricInfo.clientId, clientDB).label;
    sheet['B3'] = { t: 's', v: client };
    sheet['E3'] = { t: 's', v: data.fabricInfo.fabricItem };
    sheet['H3'] = { t: 's', v: data.fabricInfo.brand };
    sheet['B5'] = { t: 'n', v: data.fabricInfo.width };
    sheet['D5'] = { t: 'n', v: data.fabricInfo.gsm };
    sheet['F5'] = { t: 'n', v: data.fabricInfo.gy };
    sheet['J5'] = { t: 's', v: data.createDate.replace(/-/g, '/') };
    sheet['B4'] = { t: 's', v: data.fabricInfo.description };
    sheet['H34'] = { t: 's', v: data.authur };

    // 紗支資料
    let yarnNumber = data.yarnCost.yarnInfo.length;
    for (let i = 0; i < yarnNumber; i++) {
      let yarnTitle = getSthById(
        data.yarnCost.yarnInfo[i].yarnSpec,
        yarnDB
      ).title;
      let yarnUnit = getSthById(
        data.yarnCost.yarnInfo[i].yarnUnit,
        priceUnit
      ).title;
      sheet[`B${7 + i}`] = {
        t: 's',
        v: yarnTitle,
      };
      sheet[`D${7 + i}`] = {
        t: 'n',
        v: data.yarnCost.yarnInfo[i].yarnPort / 100,
      };
      sheet[`F${7 + i}`] = { t: 's', v: data.yarnCost.yarnInfo[i].yarnSource };
      sheet[`H${7 + i}`] = { t: 'n', v: data.yarnCost.yarnInfo[i].yarnPrice };
      sheet[`I${7 + i}`] = {
        t: 's',
        v: yarnUnit,
      };
    }
    // 紗規格
    sheet['B13'] = {
      t: 's',
      v: data.yarnCost.machineSpec,
    };
    sheet['E13'] = { t: 'n', v: data.yarnCost.fabricProcessFee };
    sheet['I13'] = { t: 'n', v: data.yarnCost.totalWastage / 100 };
    sheet['H20'] = {
      t: 's',
      v: `1英吋經向密度目數:${data.yarnCost.densityWarp}`,
    };
    sheet['H21'] = {
      t: 's',
      v: `1英吋緯向密度目數:${data.yarnCost.densityWeft}`,
    };
    // 染整工繳
    sheet['D20'] = { t: 'n', v: data.dyeCost.dyeAverageCost };
    // 業務工繳
    sheet['G24'] = { t: 'n', v: data.salesCost.excuteCost };
    sheet['G25'] = { t: 'n', v: data.salesCost.testingCost };
    sheet['G26'] = { t: 'n', v: data.salesCost.shippingCost };
    sheet['G27'] = { t: 'n', v: data.salesCost.profit / 100 };
    sheet['G28'] = { t: 'n', v: data.salesCost.exchangeRate };
    sheet['G32'] = {
      t: 's',
      v: data.salesCost.quoteDueDate.replace(/-/g, '/'),
    };
    // 将修改后的数据转换为 Blob
    const modifiedBlob = new Blob([
      XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }),
    ]);
    // 創建一個連結
    const a = document.createElement('a');
    const blobUrl = URL.createObjectURL(modifiedBlob);
    a.href = blobUrl;
    a.download = `報價分析單-${quote.fabricInfo.fabricItem}.xlsx`; // 指定下載的檔案名稱
    document.body.appendChild(a);
    // 模擬點選連結以觸發下載
    a.click();
    // 清理釋放效能
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  };
  const getSthById = (id, DB) => {
    const sthValue = DB.find((item) => item.id === id);
    return sthValue ? sthValue : undefined;
  };
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
              <Button variant="contained" onClick={() => handleClear(quote)}>
                清空
              </Button>
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
