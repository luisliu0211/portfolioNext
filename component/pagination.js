import React, { useState, useContext, useEffect } from 'react';
import MyContext from '@/lib/context';
import { Pagination as MuiPagination } from '@mui/material';
export default function CustomPagination() {
  const context = useContext(MyContext);
  const handleChange = (_, value) => {
    context.setCurrentPage(value);
  };

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
