import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

// When listening to router transitions, if you use class-based:
// define componentDidMount and subscribe to events there
// define componentWillUnmount and unsubscribe there
// to acess the router, use withRouter higher-order component
// (router props is injected into App: this.props.router)
// class App extends React.Component {
//   ...
//   componentDidMount() {...}
//   componentWillUnmount() {...}
//   ...
// }
// export default withRouter(App)

function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    }

    const handleRouteChangeComplete = () => {
      setLoading(false);
    }

    const handleRouteChangeError = () => {
      handleRouteChangeComplete();
    }

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    }
  }, [router]);

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
            {loading && (
              <div className="spinner-container">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading</span>
                </Spinner>
              </div>
            )}
            <Component {...pageProps} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
