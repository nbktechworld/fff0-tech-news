import React from 'react';

export default function useArticleImages(articleId) {
  const [images, setImages] = React.useState([]);
  const [imagesLoading, setImagesLoading] = React.useState(true);
  const [imagesError, setImagesError] = React.useState('');

  function addImages(newImages) {
    setImages([...images, ...newImages]);
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

  return { images, imagesLoading, imagesError, addImages };
};
