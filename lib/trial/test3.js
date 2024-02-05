import React, { useEffect, useRef, useState } from 'react';

export default function Test3() {
  const ref = useRef(null);
  const [name, setName] = useState('');
  const prevName = useRef('');
  const [status, setStatus] = useState('TBA');
  const [jwtStatus, setJwtStatus] = useState('TBA');

  useEffect(() => {
    ref.current.style.color = 'red';
    prevName.current = name;
    console.log();
  }, [name]);

  const handleLogin = () => {
    fetch('http://localhost:8080/api/loginTest', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'luis', password: '1234' }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJwtStatus(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleGetData = () => {
    fetch('http://localhost:8080/api/getDataTest', {
      method: 'GET',
      credentials: 'include', // 允許瀏覽器發送包含 Cookie 的跨源請求
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.success);
        setJwtStatus(data.message);
        if (data.success) {
          console.log('good');
        } else {
          console.log('no good');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleLogout = () => {
    fetch('http://localhost:8080/api/logoutTest', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJwtStatus(data.message);
      })
      .catch((error) => console.error('Error:', error));
  };
  const handleLoginCS = () => {
    console.log('test');
    fetch('http://localhost:8080/api/loginCookieSession', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'lu0211@hotmail.com', password: '1234' }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStatus(data.message);
      })
      .catch((err) => console.log(err));
  };
  const handleGetDataCS = () => {
    fetch('http://localhost:8080/api/getdataCookieSesison', {
      method: 'GET',
      credentials: 'include', // 允許瀏覽器發送包含 Cookie 的跨源請求
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.success);
        setStatus(data.message);
        if (data.success) {
          console.log('good');
        } else {
          console.log('no good');
          // alert('pls login in');
        }
      })
      .catch((error) => console.error('Error:', error));
  };
  const handleLogoutCS = () => {
    fetch('http://localhost:8080/api/logoutCookieSession', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStatus(data.message);
      })
      .catch((error) => console.error('Error:', error));
  };
  return (
    <>
      <div
        style={{ width: '100px', height: '200px', backgroundColor: 'green' }}
        ref={ref}
      >
        test
      </div>
      <div>
        now Value is{name}, previous value is: {prevName.current}.
      </div>
      <input type="text" onChange={(e) => setName(e.target.value)} />{' '}
      <div>
        jwt <br />
        驗證狀態：{jwtStatus}
      </div>
      <div onClick={handleLogin}>login jwt</div>
      <div onClick={handleGetData}>getData</div>
      <div onClick={handleLogout}>logout</div>
      <hr />
      <div>
        cookie based session <br />
        驗證狀態：{status}
      </div>
      <div onClick={handleLoginCS}>login CS</div>
      <div onClick={handleGetDataCS}>getData CS</div>
      <div onClick={handleLogoutCS}>logout CS</div>
      <hr />
    </>
  );
}
