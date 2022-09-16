module.exports = {
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
