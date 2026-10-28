/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Proxy: todo lo que empieza con /api/ se reenvía al backend (puerto 3001). Así no hay problemas de CORS.
  async rewrites() {
    return [{ source: '/api/:path*', destination: 'http://localhost:3001/api/:path*' }];
  },
};

export default nextConfig;
