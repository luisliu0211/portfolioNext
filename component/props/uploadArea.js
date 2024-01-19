import React, { useState, useEffect } from 'react';
import { Button, Divider } from '@mui/material';
import axios from 'axios';
import { getFormattedDate } from '@/lib/getDate';
import { TextField } from '@mui/material';
import styles from './uploadArea.module.css';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import useImagePreview from '@/hook/useImagePreview';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
export default function UploadArea() {
  const { previewImage, handleImageChange, clearPreview } = useImagePreview();
  const [postTheme, setPostTheme] = useState('尚未命名的資料');
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [file, setFile] = useState(null);
  const [postDetail, setPostDetail] = useState({
    title: '尚未命名的資料',
    subTitle: '',
    coverImage: '',
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
  const [handPickCover, setHandPickCover] = useState('');
  const handleDetailChange = (e) => {
    setPostDetail({ ...postDetail, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0].name);
    let title = e.target.files[0].name.split('.')[0];
    setPostDetail({ ...postDetail, title: title });
  };
  const handleUpload = async () => {
    try {
      let t = 'http://localhost:8080';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('postDetail', JSON.stringify(postDetail));
      const response = await axios.post(`${t}/api/mdFile`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 200) {
        console.log(response, 'data');
        setSuccess(true);
        setPostDetail({
          title: '尚未選擇markdown檔案',
          subTitle: '',
          coverImage: '',
          create_date: getFormattedDate(),
          category: '',
          tags: [],
          content: '',
          contentType: 'markdown',
        });
      } else {
        // 在這裡處理其他HTTP狀態碼，例如錯誤處理
        console.error('Request failed with status:', response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // console.log(postDetail);
  }, [postDetail, handPickCover]);
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
          severity="success"
        ></Snackbar>
        <Snackbar
          open={err}
          autoHideDuration={3000}
          onClose={() => {
            setErr(false);
          }}
          message="欄位尚未填寫完成！"
          severity="warning"
        ></Snackbar>
        <div className={styles.grid}>
          <div className={styles.left}>
            <label>
              <span>標題</span>
              <TextField
                size="small"
                name="title"
                value={postDetail.title || ''}
                onChange={handleDetailChange}
                required
                sx={{ width: 300 }}
                inputProps={{
                  maxLength: 16,
                }}
              />
            </label>
            <label>
              <span>副標</span>{' '}
              <TextField
                size="small"
                name="subTitle"
                value={postDetail.subTitle || ''}
                onChange={handleDetailChange}
                required
                inputProps={{
                  maxLength: 16,
                }}
              />
            </label>
            <label>
              <span>分類</span>{' '}
              <Select
                name="category"
                value={postDetail.category || ''}
                label="category"
                onChange={handleDetailChange}
                sx={{ width: 195, '& fieldset span': { display: 'none' } }}
                required
              >
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
                value={postDetail.tags || []}
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
                <span>{postDetail.title}</span>
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
                    coverImage: '/image/peter-rabbit.webp',
                  });
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
                    coverImage: '/image/peter-rabbit21.jpeg',
                  });
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
                    coverImage: '/image/peter-rabbit3.webp',
                  });
                }}
              />
            </Stack>
            <span>
              選擇MD檔案:
              <br />
              {postDetail.title}
            </span>
            <label id={styles.mdSVG}>
              <input
                type="file"
                id="mdFile"
                accept=".md"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        <Button variant="contained" onClick={handleUpload}>
          確認上傳MD檔案
        </Button>
      </div>
    </>
  );
}
