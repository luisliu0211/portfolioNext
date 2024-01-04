import React, { useEffect, useState } from 'react';
import Layout from '@/component/layouts/layout';
import { Button } from '@mui/material';
import { downloadFile } from '@/lib/downloadXlsx';
import Divider from '@mui/material/Divider';
import yarnDB from '@/yarnDB';
import clientDB from '@/clientDB';
import processDB from '@/processDB';
import specialProcessDB from '@/specialProcessDB';
import machineList from '@/machineList';
import priceUnit from '@/priceUnit';
import bussinessTermDB from '@/bussinessTermDB';
import Papa from 'papaparse';
import FetchDataButton from '@/component/props/fetchDataButton';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

export default function Downloads() {
  const options = ['下載紗價資料庫', '下載客戶資料庫'];
  const jsonOptions = ['載入紗價json資料庫', '載入客戶json資料庫'];
  const [jsonData, setJsonData] = useState(null);
  const [jsonkey, setJsonkey] = useState([]);
  const [csvData, setCSVData] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  // 处理数组的函数，将数组转换为适合工作表的格式
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleUpload = () => {
    if (!selectedFile) {
      // 如果沒有選擇檔案，不執行後續操作
      alert('沒有選擇資料');
      return;
    }
    const jsonTitle = selectedFile.name.split(' - ')[1];
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      // Convert CSV data to JSON
      const jsonData = csvToJSON(data);
      setCSVData(jsonData);
      // Send JSON data to the backend
      sendToBackend(jsonData, jsonTitle);
    };
    reader.readAsText(selectedFile);
  };
  const csvToJSON = (csv) => {
    const parsed = Papa.parse(csv, { header: true });
    return JSON.stringify(parsed.data, null, 2);
  };
  const sendToBackend = (jsonData, jsonTitle) => {
    fetch(`${apiUrl}/api/json/saveFile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: jsonData, title: jsonTitle }),
    })
      .then((res) => res.json()) // 解析服務器響應為 JSON
      .then((data) => {
        console.log(data.message); // 記錄服務器響應
      })
      .catch((err) => console.log(err));
  };
  const getJsonFile = (fileName) => {
    console.log(fileName);
    let apiBE = `http://localhost:8080`;
    fetch(`${apiBE}/api/json/readFile?fileName=${fileName}`)
      .then((res) => res.json()) // 返回 res.json() 的結果
      .then((data) => {
        setJsonData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // 在页面加载时执行一些操作，如果需要
    console.log(jsonData);
    if (jsonData) {
      const commonKeys = jsonData.reduce((keys, obj) => {
        console.log(keys);
        Object.keys(obj).forEach((key) => {
          if (!keys.includes(key)) {
            keys.push(key);
          }
        });
        return keys;
      }, []);
      setJsonkey(commonKeys);
      console.log(commonKeys);
    }
  }, [jsonData]);
  return (
    <Layout>
      <h3>下載空白檔案</h3>
      <Button variant="contained" onClick={downloadFile}>
        下載空白報價單
      </Button>
      <Divider />
      <h3>上傳csv存入資料庫</h3>
      {/* 偵測csv抬頭存入對應資料庫 */}
      <input
        type="file"
        id="csvFile"
        accept=".csv"
        onChange={handleFileChange}
      />
      <Button variant="" onClick={handleUpload}>
        確認上傳
      </Button>
      <Divider />
      <FetchDataButton
        options={options}
        getJsonFile={getJsonFile}
      ></FetchDataButton>
      <Divider />
      <FetchDataButton
        options={jsonOptions}
        getJsonFile={getJsonFile}
      ></FetchDataButton>
      <br />
      {jsonData && (
        <table>
          <thead>
            <tr>
              {jsonkey.map((col, index) => {
                console.log(col);
                return <td key={index}>{col}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {jsonData.map((data, index) => {
              let {
                名稱: title,
                報價: price,
                單位: unit,
                紗商: source,
                備註: text,
                成分: type,
                報價時間: time,
                組別: team,
                客戶代碼: clientId,
                標籤: label,
                資料庫類別: DBtype,
              } = data;
              return (
                <tr key={index}>
                  {team && <td>{team}</td>}
                  {clientId && <td>{clientId}</td>}
                  {title && <td>{title}</td>}
                  {label && <td>{label}</td>}
                  {DBtype && <td>{DBtype}</td>}
                  {price && <td>{price}</td>}
                  {unit && <td>{unit}</td>}
                  {unit && <td>{source}</td>}
                  {text && <td>{text}</td>}
                  {type && <td>{type}</td>}
                  {time && <td>{time}</td>}
                </tr>
              );
            })}
          </tbody>
          <tfoot></tfoot>
        </table>
      )}
    </Layout>
  );
}
