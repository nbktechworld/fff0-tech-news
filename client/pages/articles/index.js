import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import articles from '../../articles';

export default function ArticlesIndex(props) {
  return (
    <Container>
      <Row className="justify-content-lg-center">
        <Col lg={6}>
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
        </Col>
      </Row>
    </Container>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles
    }
  }
}
