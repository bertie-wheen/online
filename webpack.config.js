const CopyPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
const path = require('path')

module.exports = (env, argv) => {
  const mode = argv.mode === 'production' ? 'p' : 'd'

  const assets_path = path.resolve(__dirname, 'assets')
  const source_path = path.resolve(__dirname, 'source')
  const output_path = path.resolve(__dirname, 'output', mode)

  return {
    devServer: {
      compress: true,
      open: true,
      port: 9999,
      static: {
        directory: output_path,
      },
      watchFiles: [
        'source/**/*.*',
      ],
    },
    entry: path.resolve(source_path, 'js', '.js'),
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            'css-loader',
          ]
        },
        {
          test: /\.html$/i,
          type: 'asset/resource',
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new HtmlMinimizerPlugin(),
      ],
    },
    output: {
      path: output_path,
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(assets_path, 'favicons', '.ico'),
            to: path.resolve(output_path, 'favicon.ico'),
          },
          {
            from: path.resolve(assets_path, 'fonts', 'unifont', '14.0.01', '.woff2'),
            to: path.resolve(output_path, 'fonts', 'unifont.woff2'),
          },
          {
            from: path.resolve(source_path, 'css', '.css'),
            to: path.resolve(output_path, 'style.css'),
          },
          {
            from: path.resolve(source_path, 'html', '.html'),
            to: path.resolve(output_path, 'index.html'),
          },
        ],
      }),
    ],
  }
}
