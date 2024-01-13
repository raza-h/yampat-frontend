const path = require("path");

module.exports = {
  entry: "./src/index.js", // Update with the path to your entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Update with the desired output directory
  },
  resolve: {
    fallback: {
      util: require.resolve("util"),
      path: require.resolve("path-browserify"),
    },
  },
};
