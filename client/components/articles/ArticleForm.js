import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownToolbar from '../MarkdownToolbar';
import { Image } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';

class ArticleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: this.getInitialArticleValues(),
      showAttachImageModal: false,
      showPreview: false,
      submissionError: null,
      submitting: false,
      validated: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
    this.onTogglePreview = this.onTogglePreview.bind(this);
    this.onHeadingClick = this.onHeadingClick.bind(this);
    this.onBoldClick = this.onBoldClick.bind(this);
    this.onAttachImageClick = this.onAttachImageClick.bind(this);
    this.hideAttachImageModal = this.hideAttachImageModal.bind(this);

    this.bodyRef = React.createRef();
  }

  getInitialArticleValues() {
    return {
      slug: this.props.article ? this.props.article.slug : '',
      title: this.props.article ? this.props.article.title : '',
      excerpt: this.props.article ? this.props.article.excerpt : '',
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
      this.changeField(fieldName, event.target.value);
    };
  }

  changeField(fieldName, value) {
    this.setState({
      article: {
        ...this.state.article,
        [fieldName]: value
      }
    });
  }

  hideAttachImageModal() {
    this.setState({
      showAttachImageModal: false,
    });
  }

  onAttachImageClick(event) {
    this.setState({
      showAttachImageModal: true
    });
  }

  onBoldClick(event) {
    const { selectionStart, selectionEnd, value } = this.bodyRef.current;

    const newValue = value.slice(0, selectionStart) + '**' + value.slice(selectionStart, selectionEnd) + '**' + value.slice(selectionEnd);

    this.changeField('body', newValue);
  }

  onHeadingClick(event) {
    const { selectionStart } = this.bodyRef.current;
    const { value } = this.bodyRef.current;

    let insertionIndex = selectionStart;
    let runningIndex = selectionStart;

    //  0123 4 56
    // "abc\nd'ef"
    while (runningIndex > 0) {
      runningIndex--;
      if (value.charAt(runningIndex) === '\n') {
        break;
      }
      insertionIndex = runningIndex;
    }

    const newValue = value.slice(0, insertionIndex) + '# ' + value.slice(insertionIndex);

    this.changeField('body', newValue);
    this.bodyRef.current.focus();
  }

  onTogglePreview(event) {
    this.setState({
      showPreview: !this.state.showPreview,
    });
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
        <Form.Group controlId="article_excerpt">
          <Form.Label>Excerpt</Form.Label>
          <Form.Control as="textarea" onChange={this.onFieldChange('excerpt')} value={this.state.article.excerpt} required maxLength={256} rows="3" />
        </Form.Group>
        <Form.Group controlId="article_body">
          <Form.Label>Body</Form.Label>
          <div className="d-flex justify-content-between mb-1">
            <div>
              <MarkdownToolbar htmlFor="article_body" />
            </div>
            <div>
              <Button className="me-2" onClick={this.onAttachImageClick}>
                <Image /> Attach Image
              </Button>
              <Modal show={this.state.showAttachImageModal} onHide={this.hideAttachImageModal} centered>
                <Modal.Header closeButton>
                  Attach Image
                </Modal.Header>
                <Modal.Body>This is the modal</Modal.Body>
              </Modal>
              <ToggleButton
                type="checkbox"
                variant="outline-secondary"
                checked={this.state.showPreview}
                onChange={this.onTogglePreview}
                id="article-form-body-preview-toggle"
              >
                Preview
              </ToggleButton>
            </div>
          </div>
          {this.state.showPreview ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} className="article-form__body-preview">
              {this.state.article.body}
            </ReactMarkdown>
          ) : (
            <Form.Control as="textarea" onChange={this.onFieldChange('body')} value={this.state.article.body} required maxLength={4096} rows="7" ref={this.bodyRef} />
          )}
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
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
