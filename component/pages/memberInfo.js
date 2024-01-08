import React, { useEffect, useState } from 'react';
import styles from './memberInfo.module.css';
import Image from 'next/image';
import { handleImageUpload } from '@/lib/uploadPhoto';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
import useImagePreview from '@/hook/useImagePreview';

export default function MemberInfo() {
  // 預覽圖片
  const { previewImage, handleImageChange } = useImagePreview();
  let userData = {
    id: 12,
    name: 'Luis',
    gender: 'male',
    password: 'fefaefaw',
    email: 'lu0211@hotmail.com',
    character: 'family',
    telephone: ['0912345678', '03-XXXXX'],
    image: 'efewaef.jpg',
  };

  const [user, setUser] = useState({
    id: userData.id,
    name: userData.name,
    gender: userData.gender,
    password: userData.password,
    email: userData.email,
    character: userData.character,
    image: userData.image,
  });
  const handleUserUpdate = async (e) => {
    e.preventDefault();
    //TODO: 打api存入資料庫
    try {
      const response = await fetch(`${apiUrl}/api/user/update`, {
        method: 'PUT', // 或 'POST'，取決於你的 API 設計
        headers: {
          'Content-Type': 'application/json',
          // 如果需要驗證，添加驗證標頭
          // 'Authorization': `Bearer ${yourAuthToken}`,
        },
        body: JSON.stringify(user), // 轉換為 JSON 格式
      });
      if (response.ok) {
        const statusElement = document.querySelector('.status');
        if (statusElement) {
          statusElement.innerText = '更新成功';
        }
        document.querySelector('.status').innerText = '更新成功';
        console.log('User data updated successfully');
        // 如果需要處理後端返回的數據，使用下面的代碼
        // const result = await response.json();
        // console.log('Response from server:', result);
      } else {
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  const handleUserDetail = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  useEffect(() => {
    console.log('test', previewImage);
  }, [previewImage]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.detailBox}>
          <form className={styles.form} onSubmit={handleUserUpdate}>
            <div className={styles.leftBox}>
              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleUserDetail}
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleUserDetail}
                />
              </label>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleUserDetail}
                />
              </label>
              <label>
                <span>Character </span>
                <select
                  name="character"
                  onChange={handleUserDetail}
                  value={user.character}
                >
                  <option value="friend">Friend</option>
                  <option value="random">Random Browser</option>
                  <option value="family">Family</option>
                </select>
              </label>
              <div className={styles.labels}>
                <label htmlFor="male">
                  <input
                    id="male"
                    type="radio"
                    name="gender"
                    value="male"
                    checked={user.gender === 'male'}
                    onChange={handleUserDetail}
                  ></input>
                  <span>Male</span>
                </label>
                <label htmlFor="female">
                  <input
                    id="female"
                    type="radio"
                    name="gender"
                    value="female"
                    checked={user.gender === 'female'}
                    onChange={handleUserDetail}
                  ></input>
                  <span>Female</span>
                </label>
                <label htmlFor="null">
                  <input
                    id="null"
                    type="radio"
                    name="gender"
                    value="null"
                    checked={user.gender === 'null'}
                    onChange={handleUserDetail}
                  ></input>
                  <span>Null</span>
                </label>
              </div>
              <button>Save</button>
              <div className={`${styles.status} status`}></div>
            </div>
            <div className={styles.rightBox}>
              <h3>Personal Image</h3>
              <pre>upload retangle photo</pre>
              <div className={styles.previewBox}>
                {previewImage && (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    height={150}
                    width={150}
                    priority
                  />
                )}
              </div>
              <br />
              <label htmlFor="img">
                <span>Upload</span>
                <input
                  id="img"
                  type="file"
                  name="image"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
