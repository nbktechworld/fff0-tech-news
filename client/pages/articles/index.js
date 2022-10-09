import { Card, Pagination } from 'react-bootstrap';
import Link from 'next/link';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function ArticlesIndex(props) {
  const router = useRouter();

  const renderPagination = () => {
    const paginationItems = [];

    for (let page = 1; page <= props.articles.meta.totalPages; page++) {
      paginationItems.push((
        <Link href={`?page=${page}`} passHref key={page}>
          <Pagination.Item active={page === parseInt(router.query.page, 10)}>
            {page}
          </Pagination.Item>
        </Link>
      ))
    }

    return (
      <Pagination>
        {paginationItems}
      </Pagination>
    )
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-2">
        Articles
        <Link href="/articles/new" passHref>
          <Button as={"a"} variant="primary" size="sm">
            New article
          </Button>
        </Link>
      </div>
      {props.articlesError && (
        <Alert variant="danger">
          {props.articlesError}
        </Alert>
      )}
      <div>
        {props.articles.items.length === 0 && (
          <p>There are no articles.</p>
        )}
        {props.articles.items.map((article) => (
          <Card className="mb-2" key={article.id}>
            <Card.Body className="d-flex">
              <div className="me-3">
                <Image src={article.thumbnailUrl || "/thumbnail_placeholder.png"} alt="Thumbnail Placeholder" width="128" height="96" />
              </div>
              <div>
                <Link href={`/articles/${article.slug}`}>
                  <a>{article.title}</a>
                </Link>
                <div>{article.excerpt}</div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      {renderPagination()}
    </>
  )
}

export async function getServerSideProps(context) {
  const queryParameters = context.query.page ? `?page=${context.query.page}` : '';
  const response = await fetch(`http://localhost:3001/articles${queryParameters}`);

  const props = {
    articles: {
      meta: {},
      items: []
    }
  };
  if (response.ok) {
    props.articles = await response.json();
  }
  else {
    props.articlesError = `${response.status} ${response.statusText}`;
  }

  return {
    props: props
  }
}
