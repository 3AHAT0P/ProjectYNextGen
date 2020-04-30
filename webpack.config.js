// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = [
  {
    entry: './src/uiThread/index.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@/common': path.resolve(__dirname, 'src/common/'),
        '@/logicThread': path.resolve(__dirname, 'src/logicThread/'),
        '@/uiThread': path.resolve(__dirname, 'src/uiThread/'),
      },
    },
    output: {
      filename: 'uiThread.js',
      path: path.resolve(__dirname, 'dist'),
    },
  },
  {
    entry: './src/logicThread/index.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@/common': path.resolve(__dirname, 'src/common/'),
        '@/logicThread': path.resolve(__dirname, 'src/logicThread/'),
        '@/uiThread': path.resolve(__dirname, 'src/uiThread/'),
      },
    },
    output: {
      filename: 'logicThread.js',
      path: path.resolve(__dirname, 'dist'),
    },
  },
];