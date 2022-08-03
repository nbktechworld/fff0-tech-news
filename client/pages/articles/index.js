import { Card } from 'react-bootstrap';

import articles from '../../articles';

export default function ArticlesIndex(props) {
  return (
    <>
      <div className="mb-2">Articles</div>
      <div>
        {props.articles.map((article) => (
          <Card className="mb-2" key={article.id}>
            <Card.Body>
              {article.title}
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
