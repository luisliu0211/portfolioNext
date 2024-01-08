import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import Layout from '@/component/layouts/layout';
import { Button } from '@mui/material';
import { downloadDataJson } from '@/lib/downloadXlsx';
import { quoteDataKeyTranslate } from '@/lib/quoteDataFormatted';
import processDB from '@/processDB';
import specialProcessDB from '@/specialProcessDB';
import machineList from '@/machineList';
import userDB from '@/userDB';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
export default function QuotationRecap() {
  const [gridKey, setGridKey] = useState(0);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/quotations`, {
          credentials: 'include',
        });
        const result = await response.json();
        let formattedResult = result.map((item) => {
          console.log(item.yarnInfoList);
          const keysToConvert = [
            'width',
            'gy',
            'fabricProcessFee',
            'fabricCost',
            'totalWastage',
            'totalYarnCost',
            'dyeCost',
            'totalCost',
            'excuteCost',
            'shippingCost',
            'testingCost',
            'profit',
            'exchangeRate',
            'quoteUSDY',
            'quoteUSDM',
            'quoteTWDY',
            'quoteTWDM',
            'costUSDKG',
            'costTWDKG',
            'costUSDY',
          ];
          const convertedObj = { ...item };
          for (const key in item) {
            if (item.hasOwnProperty(key)) {
              if (keysToConvert.includes(key)) {
                convertedObj[key] = parseFloat(item[key]);
              } else {
                convertedObj[key] = item[key];
              }
            }
          }
          // console.log(convertedObj, 'ojbcover');
          let formattedProcess = item.process.map((p) => {
            let po = processDB.find((i) => i.id == p);
            return po ? po.title : null;
          });
          let formattedSpecialProcess = item.specialProcess.map((p) => {
            let sp = specialProcessDB.find((i) => i.id == p);
            return sp ? sp.title : null;
          });

          let formattedmachine = machineList.find(
            (i) => i.id == item.machineType
          ).title;
          let formattedAuthur = userDB.find((i) => i.id == item.userId).name;
          let formattedTeam = userDB.find((i) => i.id == item.userId).team;

          let formattedlastRevise = item.lastRevise.split('T')[0];
          return {
            ...convertedObj,
            formattedlastRevise: formattedlastRevise,
            formattedProcess: formattedProcess,
            formattedSpecialProcess: formattedSpecialProcess,
            formattedmachine: formattedmachine,
            formattedAuthur: formattedAuthur,
            formattedTeam: formattedTeam,
          };
        });
        console.log(formattedResult);
        setData(formattedResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    console.log(data);
  }, [data]);

  const columns = [
    {
      field: 'brand',
      headerName: '品牌',
      width: 100,
    },
    { field: 'formattedlastRevise', headerName: '更新日期', width: 120 },
    { field: 'formattedTeam', headerName: '組別', width: 60 },
    { field: 'fabricItem', headerName: '布號', width: 130 },
    { field: 'description', headerName: '品名', width: 130 },
    { field: 'portionText', headerName: '成分', width: 130 },
    { field: 'formattedmachine', headerName: '織機規格', width: 100 },
    { field: 'formattedProcess', headerName: '加工', width: 120 },
    { field: 'formattedSpecialProcess', headerName: '特殊加工', width: 120 },
    {
      field: 'width',
      headerName: '幅寬',
      type: 'number',
      width: 90,
    },
    {
      field: 'gsm',
      headerName: '克重',
      type: 'number',
      width: 60,
    },
    {
      field: 'gy',
      headerName: '碼重',
      type: 'number',
      width: 70,
    },
    { field: 'profit', headerName: '利潤', width: 50 },
    { field: 'quoteUSDY', headerName: 'USD/Y', width: 80 },
    { field: 'formattedAuthur', headerName: '報價人', width: 60 },
    {
      field: 'details',
      headerName: '其他細節',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            handleDetailsButtonClick(params.row.id);
          }}
        >
          查看明細
        </Button>
      ),
    },
  ];
  const handleDetailsButtonClick = (id) => {
    window.open(`/member/quotes/${id}`, '_blank');
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedRowsStr = selectedRows.join(',');
        const response = await fetch(
          `${apiUrl}/api/quotations?selected=${selectedRowsStr}`,
          {
            credentials: 'include',
          }
        );
        const result = await response.json();
        console.log(result);

        let formattedData = result.map((i) => {
          // 把json裡面的key值替換成中文
          return quoteDataKeyTranslate(i);
        });
        setSelectedData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [selectedRows, data]);

  return (
    <Layout>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          key={gridKey}
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(row) => {
            console.log(row);
            setSelectedRows(row);
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            if (selectedRows.length == 0) {
              alert('尚未選擇資料');
              return;
            }
            downloadDataJson('報價表', selectedData);
            setSelectedRows([]);
            setGridKey((prevKey) => prevKey + 1); // 強制重新渲染
          }}
        >
          下載選取的資料
        </Button>
      </div>
    </Layout>
  );
}
