/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/SansCraft-Network', // yahan tumhara GitHub repo ka naam
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
