import React, { useState } from 'react';
import styles from './memberInfo.module.css';
import Image from 'next/image';
import { handleImageUpload } from '@/lib/uploadPhoto';
const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
export default function MemberInfo() {
  let userData = {
    id: 53,
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
  const defaultImg = '/image/9-1-600x600.jpg';
  const [selectedImage, setSelectedImage] = useState(defaultImg);
  const handleUserUpdate = async (e) => {
    e.preventDefault();
    console.log(user);
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
  // 預覽圖片
  const handleImageChange = (e) => {
    //選擇到的圖片內容
    const file = e.target.files[0];

    if (file) {
      // 讀取文件顯示預覽功能
      console.log(file);
      const reader = new FileReader();
      reader.onload = async () => {
        const fileUrl = URL.createObjectURL(file);
        setSelectedImage(fileUrl);
        // 將檔案照片名稱存入資料
        let imageUploadRes = await handleImageUpload(file);
        console.log(imageUploadRes, 'jiejf');
        setUser((prevUser) => ({
          ...prevUser,
          image: imageUploadRes
            ? imageUploadRes.uniqueFilename
            : prevUser.image,
          // 其他欄位的更新，例如 name, email, password, ...
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  //TODO: 上傳照片到後端
  // const handleImageUpload = async (selectedImage) => {
  //   if (!selectedImage) {
  //     console.error('No image selected');
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append('image', selectedImage); //
  //   try {
  //     const response = await fetch(
  //       `https://2df8-2001-b011-5c06-f0fa-718a-8fa0-9099-4d68.ngrok-free.app/api/upload`,
  //       {
  //         method: 'POST',
  //         body: formData,
  //       }
  //     );

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log('Image uploaded successfully:', result);
  //       console.log(response, 'fejiajfei');
  //       setUser({ ...user, image: result.uniqueFilename }); // 注意這裡的屬性名稱可能需要根據後端返回的 JSON 資料進行調整
  //       // Handle the response from the server if needed
  //     } else {
  //       console.error('Failed to upload image');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };
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
                {selectedImage && (
                  <Image
                    src={selectedImage}
                    alt="Preview"
                    height={200}
                    width={200}
                    // style={{ maxWidth: '100%' }}
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
      {/* <div className={styles.container}>
        <div className={styles.detailBox}>feafeafe {userData.name}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.detailBox}>feafeafe {userData.name}</div>
      </div> */}
    </>
  );
}
