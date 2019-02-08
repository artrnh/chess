const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

const outputDirectory = 'public';

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce(
  (acc, item) => ({
    ...acc,
    [`process.env.${item}`]: JSON.stringify(env[item]),
  }),
  {}
);

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
        test: /\.svg$/,
        use: 'svg-sprite-loader',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Assets: path.resolve(__dirname, 'src/client/assets/'),
      Utils: path.resolve(__dirname, 'src/client/utils/'),
      Stores: path.resolve(__dirname, 'src/client/stores/'),
      Models: path.resolve(__dirname, 'src/client/models/'),
      Components: path.resolve(__dirname, 'src/client/components/'),
      Pages: path.resolve(__dirname, 'src/client/components/pages/'),
      Common: path.resolve(__dirname, 'src/client/components/common/'),
      Api: path.resolve(__dirname, 'src/client/api/'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(envKeys),
  ],
};
