/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['library.szmc.org.il'],
  },
  env: {
    ANALYZER_URL: process.env.ANALYZER_URL || 'http://localhost:8888',
  }
}

export default nextConfig