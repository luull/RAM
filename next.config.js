/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/RAM', // Required for GitHub Pages deployment
  assetPrefix: '/RAM', // Ensures assets are prefixed correctly
  trailingSlash: true, // Ensures paths end with a slash
  env: {
    NEXT_PUBLIC_BASE_PATH: '/cinemago', // Makes it accessible in the app
  },
  images: {
    loader: 'default',
    path: '/RAM/_next/image', // Adjust the path for GitHub Pages
    domains: ["image.tmdb.org"], // For external images
  },
};

module.exports = nextConfig;
