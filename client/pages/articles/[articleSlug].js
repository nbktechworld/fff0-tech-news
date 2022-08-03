import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';

import articles from '../../articles';

export default function ArticleSlug(props) {
  // const router = useRouter();

  return (
    <>
      <Card>
        <Card.Title>{props.article.title}</Card.Title>
        <Card.Body>
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
