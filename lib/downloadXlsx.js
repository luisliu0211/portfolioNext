import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import React, { useEffect, useState } from 'react';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
// 報價資料填入報價單xlsx檔案
import yarnDB from '@/yarnDB';
import clientDB from '@/clientDB';
import processDB from '@/processDB';
import specialProcessDB from '@/specialProcessDB';
import machineList from '@/machineList';
import priceUnit from '@/priceUnit';
import userDB from '@/userDB';
import bussinessTermDB from '@/bussinessTermDB';
export const handleShifttoExcel = async (data) => {
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
  sheet.getCell('F5').value = data.fabricInfo.gy;
  sheet.getCell('I5').value = data.createDate.split('T')[0];
  sheet.getCell('B4').value =
    data.yarnCost.yarnTextStr +
    ' ' +
    data.yarnCost.portionText +
    ' ' +
    data.fabricInfo.description +
    ' ' +
    data.fabricInfo.fabricSpecStr;
  sheet.getCell('H34').value = getSthById(data.userId, userDB).name;

  // 紗支資料
  let yarnNumber = data.yarnCost.yarnInfoList.length;
  for (let i = 0; i < yarnNumber; i++) {
    let yarnTitle = getSthById(
      data.yarnCost.yarnInfoList[i].yarnSpec,
      yarnDB
    ).title;
    sheet.getCell(`B${7 + i}`).value = yarnTitle;
    sheet.getCell(`D${7 + i}`).value =
      data.yarnCost.yarnInfoList[i].yarnPort / 100;
    sheet.getCell(`F${7 + i}`).value =
      data.yarnCost.yarnInfoList[i].yarnSource +
      ' ' +
      data.yarnCost.yarnInfoList[i].yarnPrice +
      getSthById(data.yarnCost.yarnInfoList[i].yarnUnit, priceUnit).title;
    sheet.getCell(`H${7 + i}`).value = parseFloat(
      data.yarnCost.yarnInfoList[i].yarnPrice *
        getSthById(data.yarnCost.yarnInfoList[i].yarnUnit, priceUnit).NTDrate
    );
  }
  // // 紗規格
  sheet.getCell('B13').value = data.yarnCost.machineSpec;
  sheet.getCell('E13').value = data.yarnCost.fabricProcessFee;
  sheet.getCell('I13').value = data.yarnCost.totalWastage / 100;
  sheet.getCell('H20').value = `1英吋經向密度目數:${data.yarnCost.densityWarp}`;
  sheet.getCell('H21').value = `1英吋緯向密度目數:${data.yarnCost.densityWeft}`;
  // // 染整工繳
  sheet.getCell('D20').value = data.dyeCost.dyeAverageCost;
  // 業務工繳
  sheet.getCell('G24').value = data.salesCost.excuteCost;
  sheet.getCell('G25').value = data.salesCost.testingCost;
  sheet.getCell('G26').value = data.salesCost.shippingCost;
  sheet.getCell('G27').value = data.salesCost.profit / 100;
  sheet.getCell('G28').value = data.salesCost.exchangeRate;
  sheet.getCell('G32').value = data.salesCost.quoteDueDate.split('T')[0];
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
  a.download = `報價分析單-${data.fabricInfo.fabricItem}.xlsx`; // 指定下載的檔案名稱
  document.body.appendChild(a);
  // 模擬點選連結以觸發下載
  a.click();
  // 清理釋放效能
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
};
//下載空白報價單
export const downloadFile = async () => {
  //直接下載空白報價單
  // 從後端取得對應文件
  const response = await fetch(`${apiUrl}/public/quotationList.xlsx`);
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
//下載 DB資料庫內容 在前端寫死
export const downloadDataJson = (title, data) => {
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

const getSthById = (id, DB) => {
  const sthValue = DB.find((item) => item.id === id);
  return sthValue ? sthValue : undefined;
};
