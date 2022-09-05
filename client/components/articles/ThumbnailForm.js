import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import { withRouter } from 'next/router'

class ThumbnailForm extends React.Component {
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

  render() {
    return (
      <Form method="POST" action={`http://localhost:3001/articles/${this.articleSlug}/images`} enctype="multipart/form-data">
        <Form.Group controlId="article_thumbnailUrl">
          <Form.Label>Thumbnail</Form.Label>
          <Form.Control type="file" name="articleImage" />
        </Form.Group>
        <div className="mb-2">
          <div>Preview</div>
          {!this.hasThumbnail() && (
            <p>There is no thumbnail.</p>
          )}
          <Image src={this.hasThumbnail() ? this.props.article.thumbnailUrl : '/thumbnail_placeholder.png'} width="128" height="96" alt="Thumbnail Preview" />
        </div>
        <Button type="submit">Save Thumbnail</Button>
      </Form>
    )
  }
}

export default withRouter(ThumbnailForm)
