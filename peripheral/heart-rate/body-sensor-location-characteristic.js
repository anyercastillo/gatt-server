const util = require('util');
const bleno = require('bleno');
const Characteristic = bleno.Characteristic;

function BodySensorLocationCharacteristic() {
    BodySensorLocationCharacteristic.super_.call(this, {
        uuid: '2A38',
        properties: ['read'],
        descriptors: []
    });
};

util.inherits(BodySensorLocationCharacteristic, Characteristic);

BodySensorLocationCharacteristic.prototype.onReadRequest = function (offset, callback) {
    const HAND = 4;
    callback(this.RESULT_SUCCESS, new Buffer([HAND]));
};

module.exports = BodySensorLocationCharacteristic;
