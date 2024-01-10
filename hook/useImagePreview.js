import { useState } from 'react';

const useImagePreview = () => {
  const [previewImage, setPreviewImage] = useState('/image/defaultPhoto.png');
  const [base64, setBase64] = useState('');
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileUrl = URL.createObjectURL(file);
        setPreviewImage(fileUrl);
        const base64String = reader.result;
        setBase64(base64String);
        console.log(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const clearPreview = () => {
    setPreviewImage('/image/defaultPhoto.png');
  };
  return { previewImage, base64, handleImageChange, clearPreview };
};

export default useImagePreview;
