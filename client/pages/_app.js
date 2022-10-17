import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';
import './articles/index.scss';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import { ExclamationCircle } from 'react-bootstrap-icons';
import Head from 'next/head';
import SEO from '../components/SEO';

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
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const router = useRouter();

  const onNotificationClose = () => {
    setShowNotification(false);
  };

  const showAppNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage('');
    }, 5000);
  };

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
      <SEO image="abc" />
      {/* <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index,follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
      </Head> */}
      {showNotification && (
        <Toast className="position-fixed app-notification" onClose={onNotificationClose}>
          <Toast.Header>
            <ExclamationCircle className="me-2" />
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{notificationMessage}</Toast.Body>
        </Toast>
      )}
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
            <Component {...pageProps} showAppNotification={showAppNotification} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
