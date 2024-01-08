import { useState } from 'react';

const useImagePreview = () => {
  const [previewImage, setPreviewImage] = useState('/image/defaultPhoto.png');
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileUrl = URL.createObjectURL(file);
        setPreviewImage(fileUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  const clearPreview = () => {
    setPreviewImage('/image/defaultPhoto.png');
  };
  return { previewImage, handleImageChange, clearPreview };
};

export default useImagePreview;
