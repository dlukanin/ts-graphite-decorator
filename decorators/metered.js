const {getClient} = require('../client/graphite');
const now = require('performance-now');
const UNLOCK_TIMEOUT_MS = 60000;

let locked = {};

function write(key, execTimeMs, graphiteClient) {
    const result = {};
    result[key] = execTimeMs;

    if (!locked[key]) {
        locked[key] = true;

        setTimeout(() => {locked[key] = false}, UNLOCK_TIMEOUT_MS);

        graphiteClient.write(result, function(err) {
            if (err) {
                // temp disable error reporting
                // console.error('graphite client write error', err.message);
            }
        });
    }
}

module.exports = function Metered(key, graphiteClient) {
    graphiteClient = getClient(graphiteClient);

    return function(object, name, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args) {
            const start = now();
            let result = originalMethod.apply(this, args);
            if (result && typeof result.then === 'function') {
                return result.then((val) => {
                    const execTimeMs = (now() - start).toFixed(3);
                    write(key, execTimeMs, graphiteClient);

                    return val;
                });
            }

            const execTimeMs = (now() - start).toFixed(3);
            write(key, execTimeMs, graphiteClient);
            return result;
        };
    }
};