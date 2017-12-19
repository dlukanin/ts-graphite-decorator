const {getClient} = require('../client/graphite');

const UNLOCK_TIMEOUT_MS = 60000;
// TODO fixme for multiple clients
let activeGraphiteClient;

let rpm = {};

function increaseCount(key) {
    rpm[key] = rpm[key] || 0;
    rpm[key]++;
}

setInterval(() => {
    if (Object.keys(rpm).length) {
        activeGraphiteClient.write(rpm, function(err) {
            if (err) {
                console.error('graphite client write error', err.message);
            }
        });
        rpm = {};
    }
}, UNLOCK_TIMEOUT_MS);

module.exports = function RPM(key, graphiteClient) {
    activeGraphiteClient = getClient(graphiteClient);

    return function(object, name, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args) {
            increaseCount(key, graphiteClient);

            let result = originalMethod.apply(this, args);
            if (result && typeof result.then === 'function') {
                return result.then((val) => {
                    return val;
                });
            }

            return result;
        };
    }
};