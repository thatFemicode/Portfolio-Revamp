const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let mode = "development";
let target = "web";
if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}
// const plugins = [
//   // new HtmlWebpackPlugin({
//   //   template: './src/index.html',
//   // }),
//   // new MiniCssExtractPlugin({
//   //   filename: '[name].[contenthash].css',
//   //   chunkFilename: '[id].css',
//   // }),
//   new MiniCssExtractPlugin(),
//   new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
// ];
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: "./src/index.html",
    minify: {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      removeComments: true,
    },
  }),
];
module.exports = {
  mode: mode,
  target: target,
  devtool: "source-map",

  entry: {
    main: "./src/js/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "images/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: "babel-loader",
          options: {
            /**
             * From the docs: When set, the given directory will be used
             * to cache the results of the loader. Future webpack builds
             * will attempt to read from the cache to avoid needing to run
             * the potentially expensive Babel recompilation process on each run.
             */
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(svg|png|jpg|gif|webp)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: plugins,
  devServer: {
    port: 7000,
    contentBase: "./dist",
    // hot: true,
  },
};
