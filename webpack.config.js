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
      },
      {
        test: /\.svg$/,
        use: [
          "babel-loader",
          {
            loader: "react-svg-loader",
            options: {
              svgo: {
                plugins: [
                  { removeTitle: false }
                ],
                floatPrecision: 2
              }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: './demo'
  }
};


module.exports = config;
