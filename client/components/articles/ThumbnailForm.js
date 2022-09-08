import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import { withRouter } from 'next/router'

class ThumbnailForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
    };

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

  onThumbnailImageChange(event) {
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  render() {
    return (
      <Form method="POST" action={`http://localhost:3001/articles/${this.articleSlug}/images`} encType="multipart/form-data">
        <Form.Group controlId="article_thumbnailUrl">
          <Form.Label>Thumbnail</Form.Label>
          <Form.Control type="file" name="articleImage" onChange={this.onThumbnailImageChange} />
        </Form.Group>
        <div className="mb-2 d-flex">
          <div>
            <div>Preview (Before)</div>
            {!this.hasThumbnail() && (
              <p>There is no thumbnail.</p>
            )}
            <Image src={this.hasThumbnail() ? this.props.article.thumbnailUrl : '/thumbnail_placeholder.png'} width="128" height="96" alt="Thumbnail Preview" />
          </div>
          {this.state.selectedFile && (
            <div className="ms-3">
              <div>Replace with (After upload)</div>
              <Image src={URL.createObjectURL(this.state.selectedFile)} width="128" height="96" alt="Replacement Thumbnail Preview" />
            </div>
          )}
        </div>
        <Button type="submit">Save Thumbnail</Button>
      </Form>
    )
  }
}

export default withRouter(ThumbnailForm)
