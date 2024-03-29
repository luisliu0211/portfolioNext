import Column from '@/component/layouts/column';
import Layout from '@/component/layouts/layout';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FlexBox from '@/component/layouts/flexBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
export default function MuiTest() {
  const options = ['label1', 'label2', 'label3'];
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const datas = [
    { label: 'label1', id: 1 },
    { label: 'label2', id: 2 },
    { label: 'label3', id: 3 },
    { label: 'label4', id: 4 },
  ];
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  return (
    <Layout>
      <Column>
        <h3>自動搜尋</h3>
        {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div> */}
        <div>{`輸入的資料: '${selectedItemId}'`}</div>
        <Autocomplete
          autoselectvalue={selectedItemId}
          onChange={(event, newValue) => {
            setSelectedItemId(newValue ? newValue.id : null);
          }}
          disablePortal
          options={datas}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          // value={selectedItemId}
          sx={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                placeholder: '選擇',
              }}
            />
          )}
        />
      </Column>
      <br />
      <hr />
      <Column>
        <br />
        <h3>按鈕</h3>
        <FlexBox>
          <ButtonGroup variant="contained" aria-label="contained button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
          <hr />
          <ButtonGroup
            variant="contained"
            orientation="vertical"
            aria-label="contained button group"
          >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
          <hr />
          <ButtonGroup
            variant="contained"
            ref={anchorRef}
            aria-label="split button"
          >
            <Button onClick={handleClick}>{options[selectedIndex]}</Button>
            <Button
              size="small"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper
            sx={{
              zIndex: 1,
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                          href="/"
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </FlexBox>
      </Column>
      <br />
      <hr />
      <Column>
        <h3>點擊按鈕</h3>
        <FlexBox>
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
          <Checkbox
            {...label}
            icon={<BookmarkBorderIcon />}
            checkedIcon={<BookmarkIcon />}
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Label"
              sx={{
                // backgroundColor: 'green',
                borderRadius: '30px',
                border: '1px solid black',
                '&.Mui-checked': {
                  backgroundColor: 'yellow',
                },
                '& .PrivateSwitchBase-input': {
                  border: '1px solid black',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 30,
                  borderRadius: '30px',
                  // backgroundColor: 'red',
                },
              }}
            />
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Required"
            />
            <FormControlLabel
              disabled
              control={<Checkbox />}
              label="Disabled"
            />
          </FormGroup>
        </FlexBox>
      </Column>
      <hr />
      <br />
      <Column>
        <h3>切換</h3>
        <FlexBox>
          <Switch
            {...label}
            // s
            sx={{
              '& .MuiSwitch-thumb': {
                backgroundColor: 'red', // 初始状态下的颜色
              },
              '& .MuiSwitch-track': {
                backgroundColor: 'green',
              },
              // '&.Mui-checked >.MuiSwitch-thumb': {
              //   backgroundColor: 'green', // 选中状态下的颜色
              // },
            }}
          />

          {/* <Switch {...label} />
          <Switch {...label} disabled defaultChecked />
          <Switch {...label} disabled /> */}
        </FlexBox>
      </Column>
      <Column>
        <Slider
          defaultValue={30}
          sx={{
            width: '100%',
            color: 'red',
            '& .MuiSlider-rail': {
              backgroundColor: 'yellow',
            },
            '& .MuiSlider-track': {
              backgroundColor: 'green',
              border: 'none',
            },
          }}
        />
      </Column>
    </Layout>
  );
}
