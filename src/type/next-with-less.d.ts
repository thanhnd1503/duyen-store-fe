declare module "next-with-less" {
  import type { NextConfig } from "next";
  const withLess: (config: NextConfig) => NextConfig;
  export default withLess;
}
