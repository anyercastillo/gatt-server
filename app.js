require('app-module-path').addPath(__dirname);

const httpServer = require('api/server.js');

httpServer.start()