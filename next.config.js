/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bật rõ ràng App Router. Mặc dù mặc định trong Next.js 14+,
  // việc khai báo rõ ràng có thể giúp Vercel phát hiện đúng cấu trúc.
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
