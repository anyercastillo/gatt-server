const util = require('util');
const bleno = require('bleno');
const Characteristic = bleno.Characteristic;

function BodySensorLocationCharacteristic() {
    BodySensorLocationCharacteristic.super_.call(this, {
        uuid: '2A38',
        properties: ['read'],
        descriptors: []
    });

    this._value = new Buffer([0]);
};

util.inherits(BodySensorLocationCharacteristic, Characteristic);

BodySensorLocationCharacteristic.prototype.onReadRequest = function (offset, callback) {
    callback(this.RESULT_SUCCESS, this._value);
};

BodySensorLocationCharacteristic.prototype.updateValue = function (value) {
    console.log('EchoCharacteristic - updateValue: ' + value);

    this._value = new Buffer([value]);
}


module.exports = BodySensorLocationCharacteristic;
