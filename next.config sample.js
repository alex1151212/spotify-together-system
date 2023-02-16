/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  env: {
    SPOTIFY_CLIENT_ID: "",
    SPOTIFY_CLIENT_SECRET: "",
    SPOTIFY_CALLBACK: "",
    SPOTIFY_API_URL: "",
    SPOTIFY_ENDPOINT_URL: "",
    HOST_URL: ""
  }
}

module.exports = nextConfig
