const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 动态生成入口和HTML插件
const PAGES_DIR = path.resolve(__dirname, 'src/pages');
const pages = fs.readdirSync(PAGES_DIR).filter(page => {
  const stat = fs.statSync(path.join(PAGES_DIR, page));
  return stat.isDirectory() && fs.existsSync(path.join(PAGES_DIR, page, 'index.js'));
});

const entries = {};
const htmlPlugins = pages.map(page => {
  entries[page] = path.join(PAGES_DIR, page, 'index.js');

  return new HtmlWebpackPlugin({
    template: path.join(PAGES_DIR, page, 'index.html'),
    filename: `${page}.html`,
    chunks: [page, 'vendors', 'common'] // 按需调整chunks
  });
});

module.exports = {
  mode:'production',
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].bundle.js',
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        },
        common: {
          minChunks: 2,
          name: 'common',
          priority: 5
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    ...htmlPlugins
  ]
};