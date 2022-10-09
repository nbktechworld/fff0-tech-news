import { useRouter } from 'next/router';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { PencilSquare } from 'react-bootstrap-icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Head from 'next/head';

export default function ArticleSlug(props) {
  // const router = useRouter();

  return (
    <>
      <Head>
        <title>{props.article.title}</title>
        <meta name="description" content={props.article.excerpt} />
      </Head>
      <div className="d-flex justify-content-between">
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} href="/articles">
            <a>Articles</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <a>Article</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Link href={`/articles/${props.article.slug}/edit`} passHref>
          <Button as="a" size="sm" className="align-self-start">
            <PencilSquare className="me-2" />Edit
          </Button>
        </Link>
      </div>
      {props.articleError && (
        <Alert variant="danger">
          {props.articleError}
        </Alert>
      )}
      {props.article && (
        <Card>
          <Card.Body>
            <Card.Title>{props.article.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{props.article.excerpt}</Card.Subtitle>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{props.article.body}</ReactMarkdown>
          </Card.Body>
        </Card>
      )}
    </>
  )
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
      }
    }
    else {
      props.articleError = `${response.status} ${response.statusText}`;
    }
  }

  return {
    props
  }
}
