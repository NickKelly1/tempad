module.exports = {
  reactStrictMode: true,
  // use svgr instead of "inline-react-svg"
  // "inline-react-svg" does not support refs
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
}
