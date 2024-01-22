import React, { useState, useEffect, useRef } from 'react';
import { TextField, Paper, Divider, Button } from '@mui/material';
import { useRouter } from 'next/router';
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
import MarkdownContent from '@/component/layouts/markdownContent';
import styles from './uploadArea.module.css';
import useImagePreview from '@/hook/useImagePreview';
import { getFormattedDate } from '@/lib/getDate';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import FlexBox from '@/component/layouts/flexBox';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
export default function MdEditArea(props) {
  let { data, editMode } = props;
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [curMd, setCurMd] = useState('');
  const [mdOutput, setOutput] = useState('');
  const textFieldRef = useRef(null);
  const viewerRef = useRef(null);
  const { previewImage, handleImageChange, clearPreview } = useImagePreview();
  const [handPickCover, setHandPickCover] = useState('');
  const [postDetail, setPostDetail] = useState(
    data
      ? data
      : {
          title: '未命名',
          subTitle: '',
          coverImage: '/image/photoDefault.png',
          create_date: getFormattedDate(),
          category: '',
          tags: [],
          content: '',
          contentType: 'markdown',
        }
  );

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
    console.log(postDetail, 'p');
  };
  const handleUpload = async () => {
    if (
      postDetail.title == '' ||
      postDetail.category == '' ||
      postDetail.content == ''
    ) {
      setErr(true);
      return;
    }
    console.log(postDetail);
    try {
      let t = 'http://localhost:8080';
      const response = await axios.post(`${apiUrl}/api/posts`, postDetail);
      // 檢查HTTP狀態碼
      console.log(response);
      if (response.status === 200) {
        console.log(response, 'data');
        setSuccess(true);
        if (editMode) {
          setPostDetail({
            title: '',
            subTitle: '',
            coverImage: '/image/photoDefault.png',
            create_date: getFormattedDate(),
            category: '',
            tags: [],
            content: '',
            contentType: 'markdown',
          });
          setCurMd('');
        } else {
          router.push('/');
        }

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
    console.log(postDetail);
  }, [handPickCover, curMd]);
  useEffect(() => {
    console.log(postDetail, 'postDetail');
  }, []);
  useEffect(() => {
    console.log(data, 'data');
    console.log(postDetail, 'ppp');
    setPostDetail(
      data
        ? { ...data, revised_date: getFormattedDate() }
        : { ...postDetail, revised_date: getFormattedDate() }
    );
    setHandPickCover(data ? data.coverImage : handPickCover);
    setCurMd(data ? data.content : curMd);
  }, [data]);
  const handleChange = (e) => {
    let val = e.target.value;
    setCurMd(val);
    let view = mdToHtml(val);
    setOutput(view);
    setPostDetail((prevDetail) => ({ ...prevDetail, content: val }));
  };
  const md = MarkdownIt(mdOpt)
    .use(markdownItCheckbox)
    .use(require('markdown-it-highlightjs'));
  const mdToHtml = (text) => {
    text = String(text);
    return md.render(text);
  };

  // 取得行數
  // const getLineNumber = (text, index) => {
  //   console.log('text', text);
  //   const lines = text.split('\n');
  //   console.log(lines, 'text 按照 換行格篩分');

  //   //過濾空值
  //   let filterCode = lines.filter((i) => i.trim() !== '' && i.trim() !== '---');
  //   console.log(filterCode.length, '篩選總行數');

  //   //有幾個\n 就有幾行
  //   let lineNumber = 0;

  //   for (let i = 0; i < filterCode.length; i++) {
  //     if (index >= filterCode[i].length + 1) {
  //       index -= filterCode[i].length + 1;
  //       lineNumber++;
  //     } else {
  //       lineNumber += filterCode[i].trim() !== '' ? 1 : 0;
  //       break;
  //     }
  //   }
  //   return lineNumber;
  // };
  // useEffect(() => {
  //   const editor = document.getElementById('textField');
  //   const viewer = viewerRef.current;
  //   if (viewer) {
  //     let text = editor.value; // 假设 editor 是一个 textarea 元素
  //     console.log(text, 'tt');
  //     console.log(text.split(/\s+/));
  //     let a = text.split(/\s+/);
  //     console.log(a.length);
  //     console.log('空白', a.length - 1);
  //     const excludedPatterns = /```(?:html|javascript)?/g;
  //     // let filterStr = text.replace(excludedPatterns, (match) => {
  //     //   if (
  //     //     match === '```' ||
  //     //     match === '```html' ||
  //     //     match === '```javascript'
  //     //   ) {
  //     //     return '';
  //     //   } else {
  //     //     return match;
  //     //   }
  //     // });
  //     let cursorP = editor.selectionStart;
  //     // while (cursorP > 0 && filterStr[cursorP - 1] === ' ') {
  //     //   setTextBlank((prev) => prev + 1);
  //     //   cursorP--;
  //     // }

  //     console.log(textBlank, 'ttb');
  //     console.log(cursorP);
  //     let position = cursorP - a;
  //     console.log('目前光標位置：', position);
  //     let lineNumber = getLineNumber(curMd, cursorP - textBlank);
  //     const lineHeight = 25;
  //     viewer.scrollTop = lineNumber * lineHeight;
  //     const lines = viewer.getElementsByClassName('line');
  //     console.log(lines.length, 'lines class數量');
  //     for (let i = 0; i < lines.length; i++) {
  //       lines[i].classList.remove('highlighted');
  //       lines[i].style.backgroundColor = 'transparent';
  //     }
  //     console.log(lines);
  //     console.log(lineNumber - 1);
  //     if (lines[lineNumber - 1]) {
  //       lines[lineNumber - 1].classList.add('highlighted');
  //       lines[lineNumber - 1].style.backgroundColor = 'yellow';
  //     }
  //   }
  // }, [mdOutput, curMd]);

  return (
    <>
      <div className={`${styles.container} ${styles.grid}`}>
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
                value={postDetail.title}
                onChange={handleDetailChange}
                sx={{ width: 300 }}
                required
                inputProps={{
                  maxLength: 30,
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
              <span>分類</span>
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
                {tagsDetails.map((tag, index) => {
                  return (
                    <MenuItem key={index} value={tag}>
                      {tag}
                    </MenuItem>
                  );
                })}
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
            ref={textFieldRef}
          />
          <Paper elevation={4} sx={{ width: '50%' }} ref={viewerRef}>
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
