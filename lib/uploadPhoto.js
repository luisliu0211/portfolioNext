const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
// 上傳一張照片
export const handleImageUpload = async (selectedImage) => {
  if (!selectedImage) {
    console.error('No image selected');
    return;
  }
  const formData = new FormData();
  formData.append('image', selectedImage); //
  try {
    const response = await fetch(`${apiUrl}/api/upload`, {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      const result = await response.json();
      console.log('Image uploaded successfully:', result);
      return result;
    } else {
      console.error('Failed to upload image');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};
