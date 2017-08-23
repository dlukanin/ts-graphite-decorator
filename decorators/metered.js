const now = require('performance-now');
const UNLOCK_TIMEOUT_MS = 60000;

let locked = false;

function write(key, execTimeMs, graphiteClient) {
    const result = {};
    result[key] = execTimeMs;

    if (!locked) {
        locked = true;

        setTimeout(() => {locked = false}, UNLOCK_TIMEOUT_MS);

        graphiteClient.write(result, function(err) {
            if (err) {
                console.error('graphite client write error', err);
            }
        });
    }
}

module.exports = function Metered(key, graphiteClient) {
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