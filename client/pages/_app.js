import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App({ Component, pageProps }) {
  return (
    <>
      <header>
        <Navbar bg="dark" variant="light">
          <Container>
            <Navbar.Brand href="/" as={Link}>
              <a className="text-bg-dark">Tech News</a>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </header>
      <Container as="main" className="pt-1">
        <Row className="justify-content-lg-center">
          <Col lg={6}>
            <Component {...pageProps} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
