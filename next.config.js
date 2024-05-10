/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.dummyjson.com",
      "i.stack.imgur.com",
      "res.cloudinary.com",
      "i.im.ge",
      "www.tncstore.vn",
      "hanoicomputercdn.com",
      "product.hstatic.net",
      "lh3.googleusercontent.com",
      "hoanghapccdn.com",
      "nguyencongpc.vn",
      "upload.wikimedia.org",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
