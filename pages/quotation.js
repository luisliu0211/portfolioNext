import React, { use } from 'react';
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
import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
let yarnDB = [
  {
    id: 1,
    title: 'T75D/72F DTY SD',
    text: '...text',
    label: 'T75D/72F DTY SD',
  },
  {
    id: 2,
    title: 'T75D/36F FDY SD',
    text: '...text',
    label: 'T75D/72F FDY SD',
  },
  {
    id: 3,
    title: 'OP20D',
    text: '...tttext',
    label: 'OP20D',
  },
  {
    id: 4,
    title: 'OP30D',
    text: '...tttext',
    label: 'OP30D',
  },
  {
    id: 5,
    title: 'OP40D',
    text: '...tttext',
    label: 'OP40D',
  },
];
let clientDB = [
  { id: 1, team: '353E', name: 'TNF', label: '353E TNF' },
  { id: 2, team: '048E', name: 'Columbia', label: '048E Columbia' },
  { id: 3, team: '342E', name: 'Adidas', label: '342E Adidas' },
];
export default function Quotation() {
  // item
  const [item, setItem] = useState('');
  const [width, setWidth] = useState(null);
  const [description, setDescription] = useState('');
  const [gsm, setGsm] = useState(null);
  const [recordDate, setRecordDate] = useState('');
  // yarn
  const [yarnList, setYarnList] = useState();

  //
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

  return (
    <Layout>
      <Content />
      <FlexBox>
        <Column>
          <FabricInfo clientDB={clientDB} />
          <YarnList yarnDB={yarnDB} />
          <DyeMethod />
          <QuotationDetail />
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
