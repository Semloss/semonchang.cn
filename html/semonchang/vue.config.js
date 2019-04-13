module.exports = {
  // 修改的配置
  // 将baseUrl: '/api',改为baseUrl: '/',
  publicPath: "/",
  devServer: {
    proxy: {
      "/api": {
        target: "http://132.232.71.113",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
