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
  return {
    props: {
      article: articles[0]
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          articleSlug: articles[0].slug,
        },
      },
      {
        params: {
          articleSlug: articles[1].slug,
        },
      },
    ],
    fallback: false 
  }
}