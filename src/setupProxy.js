const proxy = require('http-proxy-middleware');

var proxyTable = {
  '/api/service1': 'https://service1.api.com',
};

module.exports = function(app) {
  app.use(
    proxy('/api/', {
      target: 'https://sample.com',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api/service1/': '/',
      },
      proxyTable,
      logLevel: 'debug',
    }),
  );
};
