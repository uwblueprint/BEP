const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const bundleDir = path.join(__dirname, "dist");

module.exports = {
  entry: "./src/index.jsx",
  devtool: 'inline-source-map',
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
  module: {
    rules: [
      //css-loader
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      //babel-loader
      {
        test: /\.(m?js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      //source-map loader
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      //ts-loader
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js', '.html' ],
  }
};
