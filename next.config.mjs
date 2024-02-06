/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'frontendapiapp.blob.core.windows.net',
      port: '',
    }]
  }
};

export default nextConfig;
