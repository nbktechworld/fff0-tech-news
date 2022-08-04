import { Card } from 'react-bootstrap';
import Link from 'next/link';

import articles from '../../articles';

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

export async function getStaticProps() {
  return {
    props: {
      articles
    }
  }
}
