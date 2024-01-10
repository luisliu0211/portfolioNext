import React, { useState, useEffect } from 'react';
import { TextField, Grid, Paper, Divider, Button } from '@mui/material';
import MarkdownIt from 'markdown-it';
import axios from 'axios';
import { mdOpt } from '@/lib/markdownConfig';
import 'highlight.js/styles/github-dark.css';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import markdownItCheckbox from 'markdown-it-checkbox';
import MarkdownContent from '../layouts/markdownContent';
import styles from './uploadArea.module.css';
import useImagePreview from '@/hook/useImagePreview';
import { getFormattedDate } from '@/lib/getDate';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import debounce from '@/lib/debounce';
import throttle from '@/lib/throttle';
import FlexBox from '../layouts/flexBox';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
export default function MdEditArea() {
  const [success, setSuccess] = useState(false);
  const [curMd, setCurMd] = useState('');
  const [mdOutput, setOutput] = useState('');
  const { previewImage, handleImageChange, clearPreview } = useImagePreview();
  const [postTheme, setPostTheme] = useState('');
  const [handPickCover, setHandPickCover] = useState('');
  const [postDetail, setPostDetail] = useState({
    title: '尚未命名的資料',
    subTitle: '',
    coverImg: '',
    create_date: getFormattedDate(),
    category: '',
    tags: [],
    content: '',
    contentType: 'markdown',
  });
  let tagsDetails = [
    'css/scss',
    'javascript',
    'html',
    'react/next',
    'database',
    'nodejs',
    'other',
  ];
  const selectStyles = {
    outlinedInput: {
      width: '300px',
      height: '80px',
      padding: '0px', // 設定寬度為100%
      '& fieldset': {},
      '&.Mui-focused fieldset': {
        borderColor: 'transparent',
      },
      '& fieldset legend': {
        display: 'none',
      },
    },
  };
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };

  const handleDetailChange = (e) => {
    setPostDetail({ ...postDetail, [e.target.name]: e.target.value });
  };
  const handleUpload = async () => {
    try {
      // let t = 'http://localhost:8080';
      const response = await axios.post(`${apiUrl}/api/posts/edit`, postDetail);
      // 檢查HTTP狀態碼
      if (response.status === 200) {
        console.log(response, 'data');
        setSuccess(true);
        setPostDetail({
          title: '尚未命名的資料',
          subTitle: '',
          coverImg: '',
          create_date: getFormattedDate(),
          category: '',
          tags: [],
          content: '',
          contentType: 'markdown',
        });
        setCurMd('');
        // 做其他你需要的操作
      } else {
        // 在這裡處理其他HTTP狀態碼，例如錯誤處理
        console.error('Request failed with status:', response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setOutput(mdToHtml(curMd));
  }, [postDetail, handPickCover, curMd]);

  const handleChange = (e) => {
    let val = e.target.value;
    setCurMd(val);
    let view = mdToHtml(val);
    setOutput(view);
    setPostDetail({ ...postDetail, content: curMd });
  };

  const md = MarkdownIt(mdOpt)
    .use(markdownItCheckbox)
    .use(require('markdown-it-highlightjs'));
  const mdToHtml = (text) => {
    return md.render(text);
  };

  return (
    <>
      <div className={styles.container}>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => {
            setSuccess(false);
          }}
          message="資料成功儲存！"
          // action={action}
          severity="success"
        ></Snackbar>
        <div className={styles.grid}>
          {' '}
          <div className={styles.left}>
            <label>
              <span>標題</span>
              <TextField
                size="small"
                name="title"
                value={postDetail.title}
                onChange={handleDetailChange}
                sx={{ width: 300 }}
              />
            </label>
            <label>
              <span>副標</span>{' '}
              <TextField
                size="small"
                name="subTitle"
                value={postDetail.subTitle}
                onChange={handleDetailChange}
              />
            </label>
            <label>
              <span>分類</span>{' '}
              <Select
                name="category"
                value={postDetail.category}
                label="category"
                onChange={handleDetailChange}
                sx={{ width: 195, '& fieldset span': { display: 'none' } }}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>FrontEnd</MenuItem>
                <MenuItem value={2}>BackEnd</MenuItem>
                <MenuItem value={3}>Database</MenuItem>
                <MenuItem value={4}>Other</MenuItem>
              </Select>
            </label>
            <label>
              <span>標籤</span>{' '}
              <Select
                className={styles.selecetInput}
                variant="standard"
                id="postTags"
                name="tags"
                multiple
                value={postDetail.tags}
                onChange={handleDetailChange}
                input={
                  <OutlinedInput
                    id="specialProcess-chip"
                    label="Chip"
                    sx={selectStyles.outlinedInput}
                  />
                }
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 0.1,
                      maxHeight: '80px',
                      overflowY: 'auto',
                    }}
                  >
                    {selected.map((value) => {
                      return (
                        <Chip
                          key={value}
                          label={value}
                          sx={{
                            width: '100px',
                            textAlign: 'center',
                            fontSize: '14px',
                            backgroundColor: 'darkgrey',
                            padding: '0px',
                            margin: '2px',
                            '& span': {
                              padding: '0px',
                              width: '100%',
                            },
                          }}
                        />
                      );
                    })}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {tagsDetails.map((tag, index) => (
                  <MenuItem key={index} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            </label>
          </div>
          <div className={styles.right}>
            <span>選擇封面圖片banner or 預設主題 </span>
            {handPickCover != '' ? (
              <label id={styles.coverImgH}>
                <img
                  id={styles.handpickImg}
                  src={handPickCover}
                  alt="預設照片"
                />
                <span>{postTheme}</span>
                <input
                  type="file"
                  id="mdFile"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  onClick={() => {
                    setHandPickCover('');
                  }}
                />
              </label>
            ) : previewImage == '/image/defaultPhoto.png' ? (
              <label id={styles.coverImgP}>
                <input
                  type="file"
                  id="mdFile"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  onClick={() => {
                    setHandPickCover('');
                  }}
                />
              </label>
            ) : (
              <label id={styles.coverImgP}>
                <img
                  id={styles.selectedImg}
                  src={previewImage}
                  alt="選取的照片"
                />
                <input
                  type="file"
                  id="mdFile"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  onClick={() => {
                    setHandPickCover('');
                  }}
                />
              </label>
            )}

            <Stack direction="row" spacing={1}>
              <Avatar
                className={styles.avatar}
                alt="P1"
                src="/image/peter-rabbit.webp"
                data-theme="帥氣主角"
                onClick={() => {
                  setHandPickCover('/image/peter-rabbit.webp');
                  clearPreview();
                  setPostDetail({
                    ...postDetail,
                    coverImg: '/image/peter-rabbit.webp',
                  });
                  setPostTheme('主題1');
                }}
              />
              <Avatar
                className={styles.avatar}
                alt="P2"
                data-theme="帥氣主角"
                src="/image/peter-rabbit21.jpeg"
                onClick={() => {
                  setHandPickCover('/image/peter-rabbit21.jpeg');
                  clearPreview();
                  setPostDetail({
                    ...postDetail,
                    coverImg: '/image/peter-rabbit21.jpeg',
                  });
                  setPostTheme('主題2');
                }}
              />
              <Avatar
                className={styles.avatar}
                data-theme="帥氣主角"
                alt="P3"
                src="/image/peter-rabbit3.webp"
                onClick={() => {
                  setHandPickCover('/image/peter-rabbit3.webp');
                  clearPreview();
                  setPostDetail({
                    ...postDetail,
                    coverImg: '/image/peter-rabbit3.webp',
                  });
                  setPostTheme('主題3');
                }}
              />
            </Stack>
          </div>
        </div>
        <Divider />
        <h3>Markdown 編輯器</h3>
        <FlexBox>
          <TextField
            multiline
            overflow="auto"
            height="580px"
            rows={24}
            // fullWidth
            value={curMd}
            variant="outlined"
            onChange={handleChange}
            id="textField"
            sx={{ width: '50%' }}
          />
          <Paper elevation={4} sx={{ width: '50%' }}>
            <Box maxHeight="580px" height="580px" overflow="auto" py={1} px={1}>
              <MarkdownContent data={mdOutput} />
            </Box>
          </Paper>
        </FlexBox>

        <Button variant="contained" onClick={handleUpload}>
          確認存檔Markdown
        </Button>
      </div>
    </>
  );
}
