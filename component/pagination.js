import React, { useState, useContext, useEffect } from 'react';
import MyContext from '@/lib/context';
import { Pagination as MuiPagination } from '@mui/material';
export default function CustomPagination() {
  const context = useContext(MyContext);
  // console.log(context, 'context');
  const handleChange = (_, value) => {
    context.setCurrentPage(value);
    // console.log(context.currentPage);
  };
  // useEffect(() => {
  //   console.log(context.currentPage);
  //   // 在这里你可以根据 currentPage 更新显示的内容
  // }, [context.currentPage]);
  return (
    <div>
      <MuiPagination
        count={context.totalPage}
        size="large"
        onChange={handleChange}
        page={context.currentPage}
      />
    </div>
  );
}
