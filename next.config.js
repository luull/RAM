/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    basePath: '/cinemago',
    env: {
      NEXT_PUBLIC_BASE_PATH: '/cinemago', // Makes it available in client-side code
    },
    images: {
      domains: ["image.tmdb.org"],
    },
  };
  
  module.exports = nextConfig;
  