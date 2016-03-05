const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');
const serveStatic = require('serve-static');
const path = require('path');
const host = '0.0.0.0';
const port = 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true, // With hot reloading
  inline: false,
  historyApiFallback: true,
  quiet: true, // Without logging
  proxy: {
    '*': `http://localhost:${port + 1}`
  }
}).listen(port, host, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server started');
    console.log(`Listening at ${host}:${port}`);
  }
});

const app = express();
app.use(serveStatic(__dirname));
app.get('/app.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-data.json'));
});

app.listen(port + 1, host, (err, result) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening at ${host}:${port + 1}`);
});

