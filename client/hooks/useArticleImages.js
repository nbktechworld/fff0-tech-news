import React from 'react';

export default function useArticleImages(articleId) {
  const [images, setImages] = React.useState([]);
  const [imagesLoading, setImagesLoading] = React.useState(true);
  const [imagesError, setImagesError] = React.useState('');
  const [imageRemoving, setImageRemoving] = React.useState(false);
  const [imageRemovingError, setImageRemovingError] = React.useState('');

  function addImages(newImages) {
    setImages([...images, ...newImages]);
  }

  async function removeImage(imageId) {
    setImageRemoving(true);
    setImageRemovingError('');
    try {
      const response = await fetch(`http://localhost:3001/articles/${articleId}/images/${imageId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const responseJson = await response.json();
        throw new Error(responseJson.error);
      }
      setImages(images.filter((image) => image.id !== imageId));
      setImageRemoving(false);
    }
    catch (error) {
      setImageRemovingError(error.message);
      setImageRemoving(false);
    }
  }

  React.useEffect(() => {
    (async function() {
      try {
        const response = await fetch(`http://localhost:3001/articles/${articleId}/images`);
        const images = await response.json();
        setImages(images);
        setImagesLoading(false);
      }
      catch (error) {
        setImagesError(error.message);
        setImagesLoading(false);
      }
    })();
  }, [JSON.stringify(images)]);

  return { imageRemoving, imageRemovingError, images, imagesLoading, imagesError, addImages, removeImage };
};
