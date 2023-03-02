/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
})

module.exports = async (phase) => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    compiler: {
      styledComponents: true,
    },
    images: {
      domains: [
        'firebasestorage.googleapis.com',
        'd205bpvrqc9yn1.cloudfront.net',
      ], // 이곳에 에러에서 hostname 다음 따옴표에 오는 링크를 적으면 된다.
    },
  }
  const defaultConfig = {}
  return withPlugins([], nextConfig, withPWA)(phase, { defaultConfig })
  // return withPlugins([], nextConfig)(phase, { undefined }); // also works
}
