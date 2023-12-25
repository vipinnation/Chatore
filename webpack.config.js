const path = require('path');
const { NODE_ENV = 'development' } = process.env;
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './server.ts',
  mode: "production",
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.server.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.yaml'],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.yaml$/, // Add a rule for YAML files
        use: ['json-loader', 'yaml-loader'],
      },
    ],
  },
  plugins: [

    new CopyWebpackPlugin({
      patterns: [
        // { from: './api-doc/api.yaml', to: '.' },
        // { from: './app/emails/templates', to: 'templates' },
        { from: './views', to: 'views' }],
    }),
  ],
  stats: {
    errorDetails: true, // Enable error details in the build output
  },
  // Exclude the 'dist' folder from being processed by Webpack
  watchOptions: {
    ignored: /dist/,
  },
};
