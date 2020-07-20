require('app-module-path').addPath(__dirname);

const httpServer = require('api');
const peripheral = require('peripheral');

peripheral.advertise();
httpServer.start((service, characteristic, value) => {
    peripheral.process(service, characteristic, value);
});