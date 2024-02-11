// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blog/all',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
