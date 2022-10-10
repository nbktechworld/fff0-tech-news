module.exports = {
  env: {
    clientUrl: 'http://localhost:3000',
  },
  images: {
    domains: [
      'localhost',
      'fff0-tech-news.s3.amazonaws.com',
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/articles',
        permanent: false
      }
    ];
  },
};
