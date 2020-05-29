const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const bundleDir = path.join(__dirname, "dist");

module.exports = {
  //   entry: "./src/index.tsx",
  entry: "./src/index.js",
  output: {
    path: bundleDir,
    publicPath: ".",
    filename: "bundle.js",
  },
  plugins: [
    // Re-generate index.html with injected script tag.
    // The injected script tag contains a src value of the
    // filename output defined above.
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
    }),
  ],
};
