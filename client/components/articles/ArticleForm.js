import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class ArticleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {
        slug: props.article ? props.article.slug : '',
        title: props.article ? props.article.title : '',
        body: props.article ? props.article.body : '',
      },
      submissionError: null,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    this.setState({
      submissionError: null
    }, async () => {
      try {
        const response = this.props.onSubmit && await this.props.onSubmit(this.state.article);
        this.props.onSuccess && this.props.onSuccess(response);
      }
      catch (error) {
        this.setState({
          submissionError: error.message
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
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="article_slug">
          <Form.Label>Slug</Form.Label>
          <Form.Control type="text" onChange={this.onFieldChange('slug')} value={this.state.article.slug} />
        </Form.Group>
        <Form.Group controlId="article_title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" onChange={this.onFieldChange('title')} value={this.state.article.title} />
        </Form.Group>
        <Form.Group controlId="article_body">
          <Form.Label>Body</Form.Label>
          <Form.Control as="textarea" onChange={this.onFieldChange('body')} value={this.state.article.body} />
        </Form.Group>
        <Button className="mt-3" type="submit">{this.props.submitButtonText || 'Create'}</Button>
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
