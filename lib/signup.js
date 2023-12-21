const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
import axios from 'axios';

export const handleSignup = async (e, user, clearInput) => {
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
    if (!response.data.success) {
      console.log(response);
      // 電子郵件已被註冊，顯示錯誤訊息
      console.log('Error:', response.data.message);
      document.querySelector('.resultBar').innerText = response.data.message;
    } else {
      // 註冊成功，顯示成功訊息或導向其他頁面
      console.log('Success:', response.data.message);
      document.querySelector('.resultBar').innerText = response.data.message;
    }
    clearInput();
  } catch (error) {
    console.log('error!', error);
    if (error.response) {
      // 請求已經發出，並且狀態碼不在 2xx 的範圍內
      console.error('Response Error:', error.response.data);
      document.querySelector('.resultBar').innerText =
        error.response.data.message;
    } else if (error.request) {
      // 請求已經發出，但沒有收到任何回應
      console.error('Request Error:', error.request);
      document.querySelector('.resultBar').innerText = 'No response received.';
    } else {
      // 其他錯誤
      console.error('Error:', error.message);
      document.querySelector('.resultBar').innerText =
        'An error occurred during the request.';
    }
    clearInput();
  }
};
