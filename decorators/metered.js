const now = require('performance-now');

function write(key, execTimeMs, graphiteClient) {
    const result = {};
    result[key] = execTimeMs;

    graphiteClient.write(result, function(err) {
        if (err) {
            console.error('graphite client write error', err);
        }
    });
}

module.exports = function Metered(key, graphiteClient) {
    return function(method, name, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args) {
            const start = now();
            let result = originalMethod(args);
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