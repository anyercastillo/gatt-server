const util = require('util');
const bleno = require('bleno');
const Characteristic = bleno.Characteristic;

function MeasurementCharacteristic() {
    MeasurementCharacteristic.super_.call(this, {
        uuid: '2A37',
        properties: ['notify'],
        descriptors: []
    });

    this._value = new Buffer([0, 60]);
    this._updateValueCallback = null;
};

util.inherits(MeasurementCharacteristic, Characteristic);

MeasurementCharacteristic.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
    console.log('EchoCharacteristic - onSubscribe');

    this._updateValueCallback = updateValueCallback;
};

MeasurementCharacteristic.prototype.onUnsubscribe = function () {
    console.log('EchoCharacteristic - onUnsubscribe');

    this._updateValueCallback = null;
};

MeasurementCharacteristic.prototype.updateValue = function (value) {
    console.log('EchoCharacteristic - updateValue: ' + value);

    this._value = new Buffer([0, value]);

    if (this._updateValueCallback) {
        this._updateValueCallback(this._value);
    }
}

module.exports = MeasurementCharacteristic;
