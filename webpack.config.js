const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const pkg = require('./package.json')
const {
  NODE_ENV = 'production'
} = process.env
const CLI = JSON.stringify(Object.keys(pkg.bin)[0]).replace(/"/g, '')

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: `${CLI}.js`,
    libraryExport: 'default'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ]
      }
    ]
  },
  externals: [
    nodeExternals()
  ],
  plugins: [
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(pkg.version),
      APP_NAME: JSON.stringify(pkg.name),
      APP_CLI: JSON.stringify(CLI),
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ],
  watch: NODE_ENV === 'development',
  devtool: NODE_ENV === 'development' && 'source-map'
}
