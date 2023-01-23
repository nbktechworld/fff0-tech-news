import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { PencilSquare } from 'react-bootstrap-icons';
import SEO from '../../components/SEO';
import MarkdownRegion from '../../components/MarkdownRegion';

export default function ArticleSlug(props) {
  const metaImage = props.article.thumbnailUrl || `${process.env.clientUrl}/thumbnail_placeholder.png`;
  return (
    <>
      <SEO
        title={props.article.title}
        description={props.article.excerpt}
        image={metaImage}
        type="article"
      />
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
            <MarkdownRegion>{props.article.body}</MarkdownRegion>
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
