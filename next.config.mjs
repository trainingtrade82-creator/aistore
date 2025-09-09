/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This is required to allow the Next.js dev server to accept requests from the
    // Firebase Studio environment.
    allowedDevOrigins: [
      '6000-firebase-studio-1757301959728.cluster-xpmcxs2fjnhg6xvn446ubtgpio.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
