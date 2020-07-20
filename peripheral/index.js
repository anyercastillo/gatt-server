const bleno = require('bleno');
const HeartRateService = require('peripheral/heart-rate');
const heartRateService = new HeartRateService();

function advertise() {
    bleno.on('stateChange', function (state) {
        console.log('on -> stateChange: ' + state + ' heartRateService.uuid=' + heartRateService.uuid);

        if (state === 'poweredOn') {
            bleno.startAdvertising('Mock Device', [heartRateService.uuid]);
        } else {
            bleno.stopAdvertising();
        }
    });

    bleno.on('advertisingStart', function (error) {
        console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

        if (!error) {
            bleno.setServices([heartRateService], function (error) {
                console.log('setServices: ' + (error ? 'error ' + error : 'success'));
            });
        }
    });
}

function process(service, characteristic, value) {
    if (service.toUpperCase() === heartRateService.uuid.toUpperCase()) {
        heartRateService.process(characteristic, value);
    }
}

exports.process = process;
exports.advertise = advertise;
