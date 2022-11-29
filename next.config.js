/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
})

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['d205bpvrqc9yn1.cloudfront.net'], // 이곳에 에러에서 hostname 다음 따옴표에 오는 링크를 적으면 된다.
  },
}
module.exports = withPWA({
  nextConfig,
})
