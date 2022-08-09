import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class ArticlesNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: '',
      title: '',
      body: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    console.log({
      slug: this.state.slug,
      title: this.state.title,
      body: this.state.body
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
      </Form>
    )
  }
}

export default ArticlesNew;
