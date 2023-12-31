import React, { useEffect } from 'react';
import * as XLSX from 'xlsx';
import Layout from '@/component/layouts/layout';
import { Button } from '@mui/material';
import { getFormattedDate } from '@/lib/getDate';

let data = [
  ['第一列', '第二列', '第三列'],
  [1, 2, 3],
  [true, false, null, 'sheetjs'],
  ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
  ['baz', null, 'qux'],
];
const quote = {
  id: 1,
  authur: 'Luis',
  team: 1,
  createDate: getFormattedDate(),
  lastRevise: '2023-12-25',
  state: 'issue',
  fabricInfo: {
    clientId: 0,
    fabricItem: '',
    description: 'testwing',
    width: 58,
    gsm: 300,
    gy: 418,
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
    totalYarnCost: 100,
  },
  dyeCost: {
    dyeLightCost: 0,
    dyeAverageCost: 0,
    dyeDarkCost: 0,
    process: [],
    specialProcess: [],
    totalCost: 100,
    RDReference: '',
    totalCost: 0,
    totalCostD: 0,
    totalCostL: 0,
  },
  salesCost: {
    excuteCost: 0,
    shippingCost: null,
    testingCost: null,
    profit: 0,
    exchangeRate: 28,
    tradeTerm: 0,
    quoteDueDate: getFormattedDate(),
    quoteUSDY: 1,
    quoteUSDM: 2,
    quoteTWDY: 3,
    quoteTWDM: 5,
    costTWDKG: 4,
    costUSDKG: 6,
    costUSDY: 7,
  },
};
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
const jsonData = [
  { Name: 'John Doe', Age: 30, City: 'New York' },
  { Name: 'Jane Smith', Age: 25, City: 'San Francisco' },
  { Name: 'Bob Johnson', Age: 35, City: 'Los Angeles' },
];
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
export default function Msdocument() {
  // 处理数组的函数，将数组转换为适合工作表的格式

  function processArray(arr) {
    return arr.map((item, index) => {
      const processedItem = {};
      Object.keys(item).forEach((key) => {
        processedItem[`${key}${index + 1}`] = item[key];
      });
      return processedItem;
    });
  }
  // 处理 quote 对象的函数，处理其中的数组
  function processQuote(quote) {
    const processedQuote = { ...quote };

    // 处理 yarnInfo 数组
    processedQuote.yarnCost.yarnInfo = processArray(quote.yarnCost.yarnInfo);

    // 处理 dyeCost 中的 process 和 specialProcess 数组
    processedQuote.dyeCost.process = processArray(quote.dyeCost.process);
    processedQuote.dyeCost.specialProcess = processArray(
      quote.dyeCost.specialProcess
    );

    return processedQuote;
  }
  // const test = async () => {
  //   // 读取现有的 Excel 文件
  //   const response = await fetch('../public/quotationList.xlsx');
  //   const data = await response.arrayBuffer(); // 直接使用 arrayBuffer

  //   // 將 arrayBuffer 轉換為 unit8array
  //   const unit8Array = new Uint8Array(data);

  //   // 使用 XLSX.read 來讀取 Excel 數據
  //   const workbook = XLSX.read(unit8Array, { type: 'array' });

  //   // 获取特定的工作表（例如，第一个工作表）
  //   const sheetName = workbook.SheetNames[0];
  //   const worksheet = workbook.Sheets[sheetName];
  //   // 将工作簿转换为数据 URL
  //   const description = worksheet['B4'];
  //   description.v = quote.fabricInfo.description;
  //   // 将工作簿转换为 Blob
  //   // 將工作表重新轉換為 arrayBuffer
  //   const modifiedArrayBuffer = XLSX.write(workbook, {
  //     bookType: 'arraybuffer',
  //     type: 'arraybuffer',
  //   });

  //   // 將 arrayBuffer 轉換為 Blob
  //   const modifiedBlob = new Blob([modifiedArrayBuffer], {
  //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //   });

  //   // 创建一个下载链接并触发下载
  //   const a = document.createElement('a');
  //   a.href = URL.createObjectURL(modifiedBlob);
  //   a.download = 'modified_test.xlsx';
  //   a.click();
  // };
  const downloadFile = async () => {
    // const response = await fetch(`${apiUrl}/public/quotationList.xlsx`);
    // 從後端取得對應文件
    const response = await fetch(
      `http://localhost:8080/public/quotationList.xlsx`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch Excel file. Status: ${response.status}`);
    }
    const contentType = response.headers.get('Content-Type');
    // console.log(contentType); // 檢查 MIME 類型 必須是application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    const blobData = await response.blob();
    const blobUrl = URL.createObjectURL(blobData);
    // 創建一個連結
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'quotationList-blank.xlsx'; // 指定下載的檔案名稱
    document.body.appendChild(a);
    // 模擬點選連結以觸發下載
    a.click();
    // 清理釋放效能
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  };
  const downloadQuoteFile = async (data) => {
    // const response = await fetch(`${apiUrl}/public/quotationList.xlsx`);
    // 從後端取得對應文件
    console.log(data, 'quote data');
    const response = await fetch(
      `http://localhost:8080/public/quotationList.xlsx`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch Excel file. Status: ${response.status}`);
    }
    const contentType = response.headers.get('Content-Type');
    // console.log(contentType); // 檢查 MIME 類型 必須是application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    const blobData = await response.blob();
    // const arrayBuffer = await blobData.arrayBuffer();
    // const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const arrayBuffer = await new Response(blobData).arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });

    const sheetName = '報價分析單'; // 假设你要修改的工作表的名称是 Sheet1
    const sheet = workbook.Sheets[sheetName];
    // 基本資料
    sheet['B3'] = { t: 's', v: data.fabricInfo.clientId };
    sheet['E3'] = { t: 's', v: data.fabricInfo.fabricItem };
    sheet['H3'] = { t: 's', v: data.fabricInfo.brand };
    sheet['B5'] = { t: 's', v: data.fabricInfo.width };
    sheet['D5'] = { t: 's', v: data.fabricInfo.gsm };
    sheet['F5'] = { t: 's', v: data.fabricInfo.gy };
    sheet['J5'] = { t: 's', v: data.createDate };
    sheet['B4'] = { t: 's', v: data.fabricInfo.description };
    sheet['E33'] = { t: 's', v: data.authur };

    // 紗支資料
    sheet['B7'] = { t: 's', v: data.yarnCost.yarnInfo[0].yarnSpec };
    sheet['D7'] = { t: 's', v: data.yarnCost.yarnInfo[0].yarnPort };
    sheet['F7'] = { t: 's', v: data.yarnCost.yarnInfo[0].yarnSource };
    sheet['H7'] = { t: 's', v: data.yarnCost.yarnInfo[0].yarnPrice };
    // 紗規格
    sheet['B12'] = { t: 's', v: data.yarnCost.machineSpec };
    sheet['E12'] = { t: 's', v: data.yarnCost.fabricProcessFee };
    sheet['J12'] = { t: 's', v: data.yarnCost.totalWastage };
    // 染整工繳
    sheet['D19'] = { t: 's', v: data.dyeCost.dyeAverageCost };
    // 業務工繳
    sheet['G23'] = { t: 's', v: data.salesCost.excuteCost };
    sheet['G24'] = { t: 's', v: data.salesCost.testingCost };
    sheet['G25'] = { t: 's', v: data.salesCost.shippingCost };
    sheet['G26'] = { t: 's', v: data.salesCost.profit };
    sheet['G27'] = { t: 's', v: data.salesCost.exchangeRate };
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
  const handleDownloadDB = (title, data) => {
    // 创建一个工作簿
    const workbook = XLSX.utils.book_new();
    // OPTION 直接轉換成工作表
    // 将 JSON 数据转换为工作表
    // const worksheet = XLSX.utils.json_to_sheet(data, {
    //   header: ['Full Name', 'Age Group', 'Location'],
    // });
    const worksheet = XLSX.utils.json_to_sheet(data);
    // // 将工作表添加到工作簿
    XLSX.utils.book_append_sheet(workbook, worksheet, title);
    // // 将工作簿转换为数据 URL
    const dataURL = XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });

    // 创建一个下载链接并触发下载
    const a = document.createElement('a');
    a.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${dataURL}`;
    a.download = `${title}.xlsx`;
    a.click();
  };
  const handleMultiDataSheet = (data) => {
    console.log('ts', data);
    const {
      authur,
      createDate,
      dyeCost: {
        dyeLightCost,
        dyeAverageCost,
        dyeDarkCost,
        process,
        specialProcess,
        RDReference,
        totalCost,
        totalCostD,
        totalCostL,
      },
      fabricInfo: { clientId, fabricItem, description, width, gsm, gy, brand },
      salesCost: {
        excuteCost,
        shippingCost,
        testingCost,
        profit,
        exchangeRate,
        tradeTerm,
        quoteDueDate,
        quoteUSDY,
        quoteUSDM,
        quoteTWDY,
        quoteTWDM,
        costTWDKG,
        costUSDKG,
        costUSDY,
      },
      yarnCost: {
        machineType,
        machineSpec,
        other,
        densityWarp,
        densityWeft,
        fabrcProcessFee,
        fabrciCost,
        totalWastage,
        yarnInfo,
      },
    } = data;
  };
  useEffect(() => {
    // 在页面加载时执行一些操作，如果需要
  }, []);
  return (
    <Layout>
      <Button variant="contained" onClick={downloadFile}>
        下載空白報價單
      </Button>
      <Button variant="contained" onClick={() => downloadQuoteFile(quote)}>
        下載報價單
      </Button>
      <Button
        variant="contained"
        onClick={() => handleDownloadDB('紗價資料庫', yarnDB)}
      >
        下載紗價資料庫
      </Button>
      <Button
        variant="contained"
        onClick={() => handleDownloadDB('客戶資料庫', clientDB)}
      >
        下載客戶資料庫
      </Button>
      <Button
        variant="contained"
        onClick={() => handleDownloadDB('貿易條件資料庫', bussinessTermDB)}
      >
        下載貿易條件資料庫
      </Button>
      <Button
        variant="contained"
        onClick={() => handleDownloadDB('設備資料庫', machineList)}
      >
        下載設備資料庫
      </Button>
      <br />
      <Button
        variant="contained"
        onClick={() => {
          handleMultiDataSheet(quote);
        }}
      >
        {' '}
        報價分析單.xlsx
      </Button>
    </Layout>
  );
}
