import { useRouter } from 'next/router';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

import articles from '../../articles';

export default function ArticleSlug(props) {
  // const router = useRouter();

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} href="/articles">
          <a>Articles</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          <a>Article</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Card.Body>
          <Card.Title>{props.article.title}</Card.Title>
          {props.article.body}
        </Card.Body>
      </Card>
    </>
  )
}

export async function getStaticProps(context) {
  const article = articles.find((article) => {
    return article.slug === context.params.articleSlug;
  });

  if (!article) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      article: article
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: articles.map((article) => ({
      params: {
        articleSlug: article.slug,
      },
    })),
    fallback: false 
  }
}
