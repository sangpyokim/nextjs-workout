const withPlugins = require('next-compose-plugins')

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  // scope: '/app',
  sw: 'service-worker.js',
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true, // fouc
  },
  images: {
    domains: ['firebasestorage.googleapis.com'], // 이곳에 에러에서 hostname 다음 따옴표에 오는 링크를 적으면 된다.
  },
}

module.exports = async (phase) => {
  const defaultConfig = {}
  return withPlugins([withBundleAnalyzer, withPWA], nextConfig)(phase, {
    defaultConfig,
  })
  // return withPlugins([], nextConfig)(phase, { undefined }); // also works
}
