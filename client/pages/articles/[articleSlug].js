import { useRouter } from 'next/router';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

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

export async function getServerSideProps(context) {
  const response = await fetch(`http://localhost:3001/articles/${context.params.articleSlug}`);
  const article = await response.json();

  if (response.status === 404) {
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
