import React, { useState, useCallback } from 'react';
import axios from 'axios';
axios.defaults.baseURL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

export default function UseAxios() {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setErr(true);
    let res;
    try {
      res = await axios({
        url: requestConfig.url,
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        // data: requestConfig.data ? requestConfig.data : null,
      });
    } catch (err) {
      console.log(err);
      setErr(err.message || 'Something went wrong!');
    } finally {
      if (res) {
        applyData(res.data);
      }
      setIsLoading(false);
    }
  }, []);
  return {
    isLoading,
    err,
    sendRequest,
  };
}
