import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ArticleForm from "../../../components/articles/ArticleForm";
import { withRouter } from 'next/router';
import Link from 'next/link';
import Alert from 'react-bootstrap/Alert';
import ThumbnailForm from "../../../components/articles/ThumbnailForm";

class ArticleEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: props.article
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onThumbnailFormSuccess = this.onThumbnailFormSuccess.bind(this);
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
    this.props.router.push(`/articles/${updatedArticle.slug}`);
    this.props.showAppNotification('Article updated successfully!');
  }

  onThumbnailFormSuccess({ thumbnailUrl }) {
    this.setState({
      article: {
        ...this.state.article,
        thumbnailUrl,
      }
    });
  }

  render() {
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item href="/articles" linkAs={Link}>Articles</Breadcrumb.Item>
          <Breadcrumb.Item href={`/articles/${this.props.router.query.articleSlug}`} linkAs={Link}>Article</Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
        {this.props.articleError ? (
          <Alert variant="danger">{this.props.articleError}</Alert>
        ) : (
          <>
            <ArticleForm
              onSubmit={this.onSubmit}
              onSuccess={this.onSuccess}
              submitButtonText="Update"
              article={this.state.article}
            />
            <h2 className="mt-3">Article Thumbnail</h2>
            <ThumbnailForm
              article={this.state.article}
              onSuccess={this.onThumbnailFormSuccess}
            />
          </>
        )}
      </>
    )
  }
}

export async function getServerSideProps(context) {
  const response = await fetch(`http://localhost:3001/articles/${context.params.articleSlug}`);

  const props = {};
  if (response.ok) {
    props.article = await response.json();
  }
  else {
    if (response.status === 404) {
      return {
        notFound: true
      };
    }
    else {
      props.articleError = `${response.status} ${response.statusText}`;
    }
  }

  return ({
    props
  });
}

export default withRouter(ArticleEdit);