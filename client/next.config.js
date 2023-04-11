module.exports = {
  env: {
    clientUrl: 'http://localhost:3000',
  },
  images: {
    domains: [
      'localhost',
      `${process.env.AWS_S3_BUCKET}.s3.amazonaws.com`,
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
