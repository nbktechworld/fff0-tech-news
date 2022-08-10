import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Alert from 'react-bootstrap/Alert';

class ArticlesNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: '',
      title: '',
      body: '',
      submissionError: null,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    this.setState({
      submissionError: null
    }, async () => {
      const articleBody = {
        slug: this.state.slug,
        title: this.state.title,
        body: this.state.body
      };
      // Make POST /articles
      let response;
      try {
        response = await fetch('http://localhost:3001/articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(articleBody)
        });

        if (response.ok) {
          const createdArticle = await response.json();
        }
        else {
          const responseText = (await response.text()).trim();
          let submissionError = `${response.status} ${response.statusText}`;
          if (responseText !== '') {
            const errorResponse = JSON.parse(responseText);
            if (errorResponse.error) {
              submissionError = errorResponse.error;
            }
          }
          this.setState({
            submissionError: submissionError,
          });
        }
      }
      catch (error) {
        this.setState({
          submissionError: error.message
        });
      }
      // Navigate to /articles/${createdArticle.id}

      // If you want to do the Promise - then approach
      // .then((response) => {
      //   return response.json();
      // }).then((createdArticle) => {
      //   // redirect to the article that was created
      // })
      // .catch((error) => {
      //
      // });
    });
  }

  render() {
    console.log(this.state)

    return (
      <Form onSubmit={this.onSubmit}>
        <Breadcrumb>
          <Breadcrumb.Item href="/articles" linkAs={Link}><a>Articles</a></Breadcrumb.Item>
          <Breadcrumb.Item active>New</Breadcrumb.Item>
        </Breadcrumb>
        <Form.Group controlId="article_slug">
          <Form.Label>Slug</Form.Label>
          <Form.Control type="text" onChange={(event) => {
            this.setState({ slug: event.target.value })
          }} value={this.state.slug} />
        </Form.Group>
        <Form.Group controlId="article_title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" onChange={(event) => {
            this.setState({ title: event.target.value })
          }} value={this.state.title} />
        </Form.Group>
        <Form.Group controlId="article_body">
          <Form.Label>Body</Form.Label>
          <Form.Control as="textarea" onChange={(event) => {
            this.setState({ body: event.target.value })
          }} value={this.state.body} />
        </Form.Group>
        <Button className="mt-3" type="submit">Create</Button>
        {this.state.submissionError && (
          <Alert variant="danger" className="mt-3">
            {this.state.submissionError}
          </Alert>
        )}
      </Form>
    )
  }
}

export default ArticlesNew;
