/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@7f/db'],
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;