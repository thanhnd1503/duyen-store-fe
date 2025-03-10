import type { NextConfig } from "next";
import withLess from "next-with-less";

const nextConfig: NextConfig = withLess({
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
  compiler: {
    styledComponents: true, // Nếu bạn dùng styled-components
  },
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        "@primary-color": "#1DA57A", // Tuỳ chỉnh màu chủ đạo
      },
      javascriptEnabled: true,
    },
  },
});

export default nextConfig;
