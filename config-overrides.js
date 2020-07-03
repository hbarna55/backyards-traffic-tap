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
  }
}

module.exports = {
  webpack: override(useBabelRc()),
  devServer: overrideDevServer(webpackdevserver),
}
