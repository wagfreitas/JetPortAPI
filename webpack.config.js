const path = require('path');

module.exports = {
  entry: './src/bin/server.js',
  // entry: path.resolve(__dirname, 'src') + '/bin/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
   
    filename: 'api.bundle.js'
  },
  target: 'node',
};