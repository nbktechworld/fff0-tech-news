import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function ArticlesIndex(props) {
  return (
    <>
      <div className="mb-2">Articles</div>
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
  const articles = await response.json();

  return {
    props: {
      articles
    }
  }
}
