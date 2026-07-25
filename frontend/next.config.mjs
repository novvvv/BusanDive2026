/** @type {import('next').NextConfig} */
const nextConfig = {
  // 검증 빌드가 dev 서버의 .next를 오염시키지 않도록 분리 (NEXT_DIST_DIR=.next-verify pnpm build)
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
