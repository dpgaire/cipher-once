/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
    {
      protocol: 'https',
      hostname: '**.googleusercontent.com',
    },
  ],
  },
}

export default nextConfig
