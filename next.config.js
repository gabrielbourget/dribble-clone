/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"]
  },
  experimental: {
    serverComponentsExternalPackages: ["cloudinary", "graphql-request"]
  }
}

module.exports = nextConfig
