const HTTP_ADDRESS = 'https://tsa.websoft.ru';
const IS_SECURE = true;

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/xlocal_reader/': {
        target: 'https://tsa.websoft.ru/',
      },
    },
  },
};
