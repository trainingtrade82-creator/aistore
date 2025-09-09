/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.google.com',
            },
            {
                protocol: 'https',
                hostname: 'img-prod-cms-rt-microsoft-com.akamaized.net',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            }
        ]
    }
};

export default nextConfig;
