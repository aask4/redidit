module.exports = {
  parser: "babel-eslint",
  extends: "airbnb-base",
  plugins: ["react", "jsx-a11y", "import"],
  rules: {
    "linebreak-style": 0,
    "prefer-destructuring": ["error", {
      "array": false,
      "object": true
    }]
  }
};
