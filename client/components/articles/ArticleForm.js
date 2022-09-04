import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class ArticleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: this.getInitialArticleValues(),
      submissionError: null,
      submitting: false,
      validated: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
  }

  getInitialArticleValues() {
    return {
      slug: this.props.article ? this.props.article.slug : '',
      title: this.props.article ? this.props.article.title : '',
      body: this.props.article ? this.props.article.body : '',
      thumbnailUrl: this.props.article ? this.props.article.thumbnailUrl : '',
    }
  }

  onResetClick(event) {
    const shouldReset = confirm('Are you sure?');

    if (shouldReset) {
      this.setState({
        article: this.getInitialArticleValues()
      });
    }
  }

  async onSubmit(event) {
    event.preventDefault();

    if (event.currentTarget.checkValidity() === false) {
      this.setState({ validated: true });
      return;
    }

    this.setState({
      submissionError: null,
      submitting: true,
    }, async () => {
      try {
        const response = this.props.onSubmit && await this.props.onSubmit(this.state.article);

        this.setState({
          submitting: false,
        }, () => {
          this.props.onSuccess && this.props.onSuccess(response);
        })
      }
      catch (error) {
        this.setState({
          submissionError: error.message,
          submitting: false
        });
      }
    });
  }

  onFieldChange(fieldName) {
    return (event) => {
      this.setState({
        article: {
          ...this.state.article,
          [fieldName]: event.target.value
        }
      });
    };
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} noValidate validated={this.state.validated}>
        <Form.Group controlId="article_slug">
          <Form.Label>Slug</Form.Label>
          <Form.Control type="text" onChange={this.onFieldChange('slug')} value={this.state.article.slug} required maxLength={128} pattern="[a-z0-9-]+" aria-describedby="article_slug_hint_text" />
          <Form.Text id="article_slug_hint_text">Use lowercase letters, numbers, or a hyphen</Form.Text>
        </Form.Group>
        <Form.Group controlId="article_title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" onChange={this.onFieldChange('title')} value={this.state.article.title} required maxLength={128} />
          <Form.Control.Feedback type="invalid">
            Keep the title between 1 and 128 characters.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="article_body">
          <Form.Label>Body</Form.Label>
          <Form.Control as="textarea" onChange={this.onFieldChange('body')} value={this.state.article.body} required maxLength={4096} rows="7" />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="article_thumbnailUrl">
          <Form.Label>Thumbnail URL</Form.Label>
          <Form.Control type="text" onChange={this.onFieldChange('thumbnailUrl')} value={this.state.article.thumbnailUrl} maxLength={4096} />
        </Form.Group>
        <div className="mt-3">
          <Button type="submit" disabled={this.state.submitting}>{this.props.submitButtonText || 'Create'}</Button>
          <Button className="ms-2" type="button" onClick={this.onResetClick} disabled={this.state.submitting} variant="secondary">Reset Form</Button>
        </div>
        {this.state.submissionError && (
          <Alert variant="danger" className="mt-3">
            {this.state.submissionError}
          </Alert>
        )}
      </Form>
    );
  }
}

export default ArticleForm;
