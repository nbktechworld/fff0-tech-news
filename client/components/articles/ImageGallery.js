import React from 'react';
import { CloudUpload } from 'react-bootstrap-icons';

import styles from './ImageGallery.module.scss';

export default function ImageGallery(props) {
  const fileRef = React.createRef();

  function onAddImageClick(event) {
    fileRef.current.click();
  }

  function onFileChange(event) {
    const file = fileRef.current.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch(`http://localhost:3001/articles/${props.articleId}/images`, {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <>
      <p>Select an existing image below or click Add to upload.</p>
      <div className={styles["image-gallery__add-image"]} onClick={onAddImageClick}>
        <CloudUpload />
        Add
        <input type="file" hidden ref={fileRef} onChange={onFileChange} />
      </div>
    </>
  );
}
