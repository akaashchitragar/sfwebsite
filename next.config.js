/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  poweredByHeader: false,
  eslint: {
    // Disable eslint during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable typescript checking during build to avoid memory issues
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 