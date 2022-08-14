import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ArticleForm from "../../../components/articles/ArticleForm";
import { withRouter } from 'next/router';
import Link from 'next/link';

class ArticleEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  get articleSlug() {
    return this.props.router.query.articleSlug;
  }

  async onSubmit(modifiedArticle) {
    const response = await fetch(`http://localhost:3001/articles/${this.articleSlug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(modifiedArticle),
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

  onSuccess(updatedArticle) {
    this.props.router.push(`/articles/${updatedArticle.articleSlug}`);
  }

  render() {
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item href="/articles" linkAs={Link}><a>Articles</a></Breadcrumb.Item>
          <Breadcrumb.Item href={`/articles/${this.props.router.query.articleSlug}`} linkAs={Link}><a>Article</a></Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <ArticleForm
          onSubmit={this.onSubmit}
          onSuccess={this.onSuccess}
          submitButtonText="Update"
          article={this.state.article}
        />
      </>
    )
  }
}

export default withRouter(ArticleEdit);