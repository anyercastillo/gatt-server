const util = require('util');
const bleno = require('bleno');
const BlenoPrimaryService = bleno.PrimaryService;
const BodySensorLocationCharacteristic = require('peripheral/heart-rate/body-sensor-location-characteristic');
const MeasurementCharacteristic = require('peripheral/heart-rate/measurement-characteristic');

const bodySensorLocationCharacteristic = new BodySensorLocationCharacteristic();
const measurementCharacteristic = new MeasurementCharacteristic();

function HeartRateService() {
    HeartRateService.super_.call(this, {
        uuid: '180D',
        characteristics: [
            bodySensorLocationCharacteristic,
            measurementCharacteristic
        ]
    });
}

util.inherits(HeartRateService, BlenoPrimaryService);

HeartRateService.prototype.process = function (characteristic, value) {
    switch (characteristic.toUpperCase()) {
        case measurementCharacteristic.uuid.toUpperCase():
            measurementCharacteristic.updateValue(value);
            break;

        case bodySensorLocationCharacteristic.uuid.toUpperCase():
            bodySensorLocationCharacteristic.updateValue(value);
            break;
    }
};

module.exports = HeartRateService;
