import React from 'react';
import { CloudUpload } from 'react-bootstrap-icons';
import Image from 'next/image';
import Alert from 'react-bootstrap/Alert';

import styles from './ImageGallery.module.scss';
import useArticleImages from '../../hooks/useArticleImages';
import useArticleImageUpload from '../../hooks/useArticleImageUpload';

export default function ImageGallery(props) {
  const fileRef = React.createRef();
  const { images, imagesLoading, imagesError, addImages } = useArticleImages(props.articleId);
  const { imageUploading, imageUploadingError, uploadArticleImage } = useArticleImageUpload(props.articleId);

  function onAddImageClick(event) {
    fileRef.current.click();
  }

  function onFileChange(event) {
    const file = fileRef.current.files[0];

    uploadArticleImage(file)
      .then((createdImage) => {
        addImages([createdImage]);
      });

    fileRef.current.value = '';
  }

  return (
    <>
      <p>Select an existing image below or click Add to upload.</p>
      {imagesError && <Alert variant="danger">{imagesError}</Alert>}
      {imageUploadingError && <Alert variant="danger">{imageUploadingError}</Alert>}
      <div className={styles['image-gallery__images']}>
        <div className={`${styles["image-gallery__add-image"]} ${styles['image-gallery__image']}`} onClick={onAddImageClick}>
          <CloudUpload />
          Add
          {imageUploading && <><br />Loading</>}
          <input type="file" hidden ref={fileRef} onChange={onFileChange} disabled={imageUploading} />
        </div>
        {imagesLoading && (
          <div className={`${styles['image-gallery__loading-image']} ${styles['image-gallery__image']}`}>
            Loading<br />images<br />...
          </div>
        )}
        {images.map((image) => {
          return (
            <div key={image.id} className={styles['image-gallery__image']}>
              <Image src={image.url} alt="Gallery image" width={128} height={96} layout="fixed" />
            </div>
          );
        })}
      </div>
    </>
  );
}
