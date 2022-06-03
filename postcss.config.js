module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-hover-media-feature": {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
