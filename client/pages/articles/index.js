import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Alert from 'react-bootstrap/Alert';

export default function ArticlesIndex(props) {
  return (
    <>
      <div className="mb-2">Articles</div>
      {props.articlesError && (
        <Alert variant="danger">
          {props.articlesError}
        </Alert>
      )}
      <div>
        {props.articles.map((article) => (
          <Card className="mb-2" key={article.id}>
            <Card.Body>
              <Link href={`/articles/${article.slug}`}>
                <a>{article.title}</a>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3001/articles');

  const props = {
    articles: []
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
