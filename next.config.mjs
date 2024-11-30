/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude 'web-worker' from server-side builds
      config.externals.push("web-worker");
    }
    return config;
  },
};

export default nextConfig;
