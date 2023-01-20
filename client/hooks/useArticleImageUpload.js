import React from 'react';

export default function useArticleImageUpload(articleId) {
  const [imageUploading, setImageUploading] = React.useState(false);
  const [imageUploadingError, setImageUploadingError] = React.useState('');

  function uploadArticleImage(file) {

    const formData = new FormData();
    formData.append('image', file);
    setImageUploading(true);
    setImageUploadingError('');

    return fetch(`http://localhost:3001/articles/${articleId}/images`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((createdImage) => {
        
        if (createdImage.error) {
          throw new Error(createdImage.error);
        }

        setImageUploading(false);

        return createdImage;
      })
      .catch((error) => {
        setImageUploadingError(error.message);
        setImageUploading(false);
      })
  }

  return { imageUploading, imageUploadingError, uploadArticleImage };
}
