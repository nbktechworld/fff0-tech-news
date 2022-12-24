import React from 'react';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import styles from './AttachImageButton.module.scss';

import ImageGallery from './ImageGallery';

export default function AttachImageButton(props) {
  const [showAttachImageModal, setShowAttachImageModal] = React.useState(true); // todo: turn back to false after dev

  function hideAttachImageModal() {
    setShowAttachImageModal(false);
  }

  function onAttachImageClick(event) {
    setShowAttachImageModal(true);
  }

  return (
    <>
      <Button className="me-2" onClick={onAttachImageClick} variant="secondary">
        <Image /> Attach Image
      </Button>
      <Modal show={showAttachImageModal} onHide={hideAttachImageModal} centered>
        <Modal.Header closeButton>
          Attach Image
        </Modal.Header>
        <Modal.Body>
          <ImageGallery />
        </Modal.Body>
      </Modal>
    </>
  );
}
