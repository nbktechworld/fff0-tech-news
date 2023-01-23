import React from 'react';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import styles from './AttachImageButton.module.scss';

import ImageGallery from './ImageGallery';

export default function AttachImageButton(props) {
  const [showAttachImageModal, setShowAttachImageModal] = React.useState(false);

  function hideAttachImageModal() {
    setShowAttachImageModal(false);
  }

  function onAttachImageClick(event) {
    setShowAttachImageModal(true);
  }

  function onImageSelect(image) {
    setShowAttachImageModal(false);
    props.onImageSelect(image);
  }

  return (
    <>
      <Button className="me-2" onClick={onAttachImageClick} variant="secondary">
        <Image /> Attach Image
      </Button>
      <Modal show={showAttachImageModal} onHide={hideAttachImageModal} centered dialogClassName={styles['attach-image-button__modal-dialog']}>
        <Modal.Header closeButton>
          Attach Image
        </Modal.Header>
        <Modal.Body>
          <ImageGallery articleId={props.articleId} onImageSelect={onImageSelect} />
        </Modal.Body>
      </Modal>
    </>
  );
}
