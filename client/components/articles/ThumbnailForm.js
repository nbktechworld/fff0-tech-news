import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import { withRouter } from 'next/router'
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

class ThumbnailForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      submissionMessage: '',
      submissionError: '',
      submitting: false,
    };

    this.fileInput = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
    this.onThumbnailImageChange = this.onThumbnailImageChange.bind(this);
  }

  get articleSlug() {
    return this.props.router.query.articleSlug;
  }

  hasThumbnail() {
    if (!this.props.article.thumbnailUrl) {
      return false;
    }
    if (this.props.article.thumbnailUrl.startsWith('/')) {
      return true;
    }
    if (/^https?:\/\//.test(this.props.article.thumbnailUrl)) {
      return true;
    }

    return false;
  }

  async onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    this.setState({
      submissionMessage: '',
      submitting: true,
    }, async () => {
      const formData = new FormData();
      const fileInput = this.fileInput.current;

      if (!fileInput || fileInput.files.length === 0) {
        return;
      }

      formData.append(fileInput.name, fileInput.files[0]);
      const response = await fetch(form.action, {
        method: form.method,
        body: formData
      });

      this.setState({
        submitting: false
      }, async () => {
        if (response.ok) {
          const responseJson = await response.json();
          fileInput.value = ''
          this.setState({
            selectedFile: null,
            submissionMessage: 'Thumbnail was saved!',
          }, () => {
            this.props.onSuccess(responseJson);
          })
        }
        else {
          // handle errors here
          const responseJson = await response.json();
          this.setState({
            submissionError: responseJson.error,
          });
        }
      })
    });
  }

  onThumbnailImageChange(event) {
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  render() {
    const selectedFile = this.fileInput.current && this.fileInput.current.files.length > 0 ? this.fileInput.current.files[0] : null;

    return (
      <Form method="POST" action={`http://localhost:3001/articles/${this.articleSlug}/thumbnail-images`} encType="multipart/form-data" onSubmit={this.onSubmit}>
        <Form.Group controlId="article_thumbnailUrl">
          <Form.Label>Thumbnail</Form.Label>
          <Form.Control type="file" name="articleImage" onChange={this.onThumbnailImageChange} ref={this.fileInput} accept="image/*" />
        </Form.Group>
        <div className="mb-2 d-flex">
          <div>
            <div>Preview (Before)</div>
            {!this.hasThumbnail() && (
              <p>There is no thumbnail.</p>
            )}
            <Image src={this.hasThumbnail() ? this.props.article.thumbnailUrl : '/thumbnail_placeholder.png'} width="128" height="96" alt="Thumbnail Preview" />
          </div>
          {selectedFile && (
            <div className="ms-3">
              <div>Replace with (After upload)</div>
              <Image src={URL.createObjectURL(selectedFile)} width="128" height="96" alt="Replacement Thumbnail Preview" />
            </div>
          )}
        </div>
        <div className="d-flex align-items-center">
          <Button type="submit" disabled={this.state.submitting}>Save Thumbnail</Button>
          {this.state.submissionMessage && (
            <span className="ms-2"><CheckCircleFill /> {this.state.submissionMessage}</span>
          )}
          {this.state.submissionError && (
            <span className="ms-2"><XCircleFill /> {this.state.submissionError}</span>
          )}
        </div>
      </Form>
    )
  }
}

export default withRouter(ThumbnailForm)
