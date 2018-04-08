const path = require('path');

export default {
  entry: 'src/index.js',

  proxy: {
    '/proxy': {
      target: 'http://localhost:8080/',
      changeOrigin: true,
      pathRewrite: { '^/proxy': '' },
    },
  },

  extraBabelPlugins: [
    'transform-decorators-legacy',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
};
