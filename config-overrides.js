const fs = require("fs")
const path = require("path")
const { override, overrideDevServer, useBabelRc } = require("customize-cra")

function webpackdevserver() {
  return {
    contentBase: "public",
    port: 55444,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "certificates/cert.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "certificates/cert.crt")),
      ca: fs.readFileSync(path.resolve(__dirname, "certificates/cert.pem")),
    },
    historyApiFallback: true,
    proxy: {
      "/api/**": {
        target: "http://127.0.0.1:50500",
        secure: true,
        changeOrigin: true,
        ws: true,
        headers: {
          Host: "127.0.0.1:50500",
          Referer: "http://127.0.0.1:50500",
          Origin: "http://127.0.0.1:50500",
        },
      },
    },
  }
}

module.exports = {
  webpack: override(useBabelRc()),
  devServer: overrideDevServer(webpackdevserver),
}
