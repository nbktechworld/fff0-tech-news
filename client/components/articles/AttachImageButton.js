import React from 'react';
import Button from 'react-bootstrap/Button';
import { CloudUpload, Image } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import styles from './AttachImageButton.module.scss';

export default function AttachImageButton(props) {
  const [showAttachImageModal, setShowAttachImageModal] = React.useState(true); // todo: turn back to false after dev

  const fileRef = React.createRef();

  function hideAttachImageModal() {
    setShowAttachImageModal(false);
  }

  function onAttachImageClick(event) {
    setShowAttachImageModal(true);
  }

  function onAddImageClick(event) {
    fileRef.current.click();
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
          <p>Select an existing image below or click Add to upload.</p>
          <div className={styles["attach-image-button__add-image"]} onClick={onAddImageClick}>
            <CloudUpload />
            Add
            <input type="file" hidden ref={fileRef} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
