module.exports = {
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
