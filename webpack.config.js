const { resolve } = require("path");

const config = {
  entry: "./demo/demo.js",
  output: {
    path: resolve(__dirname, "demo"),
    filename: "demo.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: './demo'
  }
};


module.exports = config;
