// @ts-check
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary's base domain
      },
      {
        protocol: "https",
        hostname: "i.ibb.co", // ImgBB's base domain
      },
      {
        protocol: "https",
        hostname: "unlbefaczyrekurowmfs.supabase.co",
      },
      {
        protocol: "https",
        hostname: "mycloud.swisscom.ch",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  // Add this to ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;