const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TestPlugin = require("./plugins/test-plugin.js");
const BannerWebpackPlugin = require("./plugins/banner-webpack-plugin.js");
const CleanWebpackPlugin = require("./plugins/clean-webpack-plugin.js");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].js",
    // clean: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: './loaders/test-loader.js'
      // },
      {
        test: /\.js$/,
        loader: "./loaders/clean-log-loader",
        // use: ["./loaders/demo/test-sync", "./loaders/demo/test-async"],
      },
      // {
      //   test: /\.js$/,
      //   loader: "./loaders/banner-loader",
      //   options: {
      //     author: "A",
      //   },
      // },
      {
        test: /\.js$/,
        loader: "./loaders/babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    // new TestPlugin(),
    new BannerWebpackPlugin({ author: "test2" }),
    new CleanWebpackPlugin(),
  ],
  mode: "development",
};
