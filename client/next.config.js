module.exports = {
  images: {
    domains: [
      'localhost'
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
