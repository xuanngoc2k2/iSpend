/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trong Next.js 14+, App Router (thư mục app/) thường được bật mặc định
  // nếu thư mục 'app' tồn tại. Việc thêm file cấu hình này giúp Vercel
  // và Next.js nhận diện cấu trúc dự án dễ dàng hơn, đặc biệt khi app/
  // nằm trong thư mục src/.
  // experimental: {
  //   appDir: true, // Cờ này có thể cần thiết cho các phiên bản Next.js cũ hơn hoặc để rõ ràng hơn.
  // },
};

module.exports = nextConfig;
