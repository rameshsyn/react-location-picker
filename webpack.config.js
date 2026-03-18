const path = require('path');

module.exports = {
  entry: './demo/demo.tsx',
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: 'demo.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      // Allow demo to import from the src directory directly
      'react-location-picker': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'demo'),
    },
    compress: true,
    port: 9000,
  },
  mode: 'development',
};
