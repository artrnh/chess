const path = require('path');
const webpack = require('webpack');

const outputDirectory = 'public';

module.exports = {
  entry: ['@babel/polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Utils: path.resolve(__dirname, 'src/client/utils/'),
      Stores: path.resolve(__dirname, 'src/client/stores/'),
      Components: path.resolve(__dirname, 'src/client/components/'),
      Pages: path.resolve(__dirname, 'src/client/components/pages/'),
      Common: path.resolve(__dirname, 'src/client/components/common/'),
    },
  },
  devServer: {
    port: 3000,
    open: true,
    contentBase: './public',
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  plugins: [new webpack.NamedModulesPlugin()],
};
