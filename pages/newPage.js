import React from 'react';
import { useEffect, useState } from 'react';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
import axios from 'axios';

export default function NewPage() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleUserDetail = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.password) {
      alert('Please fill in all fields');
      return;
    }
    console.log('有資料 送後端檢查');
    try {
      // const response = await fetch(`${apiUrl}/api/saveLoginData`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(user),
      // });
      // const responseData = await response.json();
      // if (!response.ok) {
      //   console.log(responseData);
      //   return;
      // }
      // TODO:改成axios寫法
      const response = await axios.post(`${apiUrl}/api/saveLoginData`, user);
      // if (response.status == 200) {
      //   console.log(response.data.message);
      // }
      console.log(response, 'response');
      // 如果需要處理 API 回應，可以在這裡進行操作
      document.querySelector('.resultBar').innerText = response.data.message;
    } catch (error) {
      console.log(error);
      if (error.response) {
        // 請求已經發出，並且狀態碼不在 2xx 的範圍內
        console.error('Response Error:', error.response.data);
      } else if (error.request) {
        // 請求已經發出，但沒有收到任何回應
        console.error('Request Error:', error.request);
      } else {
        // 其他錯誤
        console.error('Error:', error.message);
      }
      document.querySelector('.resultBar').innerText =
        'An error occurred during the request.';
      // console.error('發送 API 請求時發生錯誤:', error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>測試送出 post資料</h2>
      <br />
      <label>
        <span>Name:</span>
        <input name="name" type="text" onChange={handleUserDetail} />
      </label>
      <br />
      <label>
        <span>Email:</span>
        <input name="email" type="email" onChange={handleUserDetail} />
      </label>
      <br />
      <label>
        <span>Password:</span>
        <input name="password" type="password" onChange={handleUserDetail} />
      </label>
      <button type="submit">註冊</button>
      <div className="resultBar"></div>
    </form>
  );
}

// newPage.auth = true;
