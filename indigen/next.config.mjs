/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/stories',
        destination: '/privacy',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
