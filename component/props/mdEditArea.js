import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box, Paper, Divider, Button } from '@mui/material';
import MarkdownIt from 'markdown-it';
import { mdOpt } from '@/lib/markdownConfig';
import 'highlight.js/styles/github-dark.css';
import markdownItCheckbox from 'markdown-it-checkbox';
import MarkdownContent from '../layouts/markdownContent';

export default function MdEditArea() {
  const [curMd, setCurMd] = useState('');
  const [mdOutput, setOutput] = useState('');

  const handleChange = (e) => {
    let val = e.target.value;
    setCurMd(val);
    let view = mdToHtml(val);
    setOutput(view);
  };
  const md = MarkdownIt(mdOpt)
    .use(markdownItCheckbox)
    .use(require('markdown-it-highlightjs'));
  const mdToHtml = (text) => {
    return md.render(text);
  };

  useEffect(() => {
    setOutput(mdToHtml(curMd));
  }, [curMd]);
  // 計算滾動條位置

  return (
    <>
      <Divider />
      <Grid item container spacing={1} md={12}>
        <Grid item md={5}>
          <TextField
            multiline
            overflow="auto"
            height="575px"
            rows={24}
            fullWidth
            value={curMd}
            variant="outlined"
            onChange={handleChange}
            id="textField"
          />
        </Grid>
        <Grid item md={7}>
          <Paper elevation={4}>
            <Box maxHeight="575px" height="575px" overflow="auto" py={1} px={1}>
              <MarkdownContent data={mdOutput} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
