const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api/', {
      target: 'https://backendapi.turing.com',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api/': '/',
      },
      logLevel: 'debug',
    }),
  );
};
