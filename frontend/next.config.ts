import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fake-ecommerce-five.vercel.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.kabum.com.br',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
