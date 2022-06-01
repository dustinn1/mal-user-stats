/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ["cdn.myanimelist.net"],
  },
};

module.exports = nextConfig;
