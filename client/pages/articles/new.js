import React from 'react';
import Link from 'next/link';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { withRouter } from 'next/router';
import ArticleForm from '../../components/articles/ArticleForm';

class ArticlesNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  async onSubmit(article) {
    // Make POST /articles
    const response = await fetch('http://localhost:3001/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article)
    });

    if (response.ok) {
      return response.json();
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
      throw new Error(submissionError);
    }
  }

  onSuccess(createdArticle) {
    this.props.router.push(`/articles/${createdArticle.slug}`);
  }

  render() {
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item href="/articles" linkAs={Link}><a>Articles</a></Breadcrumb.Item>
          <Breadcrumb.Item active>New</Breadcrumb.Item>
        </Breadcrumb>
        <ArticleForm onSubmit={this.onSubmit} onSuccess={this.onSuccess} />
      </>
    )
  }
}

export default withRouter(ArticlesNew);
