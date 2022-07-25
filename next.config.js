/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    images: {
      allowFutureImage: true,
      unoptimized: true,
    },
  },
  images: {
    domains: ["cdn.myanimelist.net"],
  },
  async redirects() {
    return [
      {
        source: "/stats",
        destination: "/",
        permanent: true,
      },
      {
        source: "/stats/:username",
        destination: "/stats/:username/anime/overview",
        permanent: true,
      },
      {
        source: "/stats/:username/anime",
        destination: "/stats/:username/anime/overview",
        permanent: true,
      },
      {
        source: "/stats/:username/manga",
        destination: "/stats/:username/manga/overview",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
