const now = require('performance-now');

module.exports = function Metered(key, graphiteConnection) {
    return function(method, name, descriptor) {
        const originalMethod = descriptor.value;

        const start = now();
        const result = Promise.resolve(originalMethod());
        const end = now();

        const execTimeMs = (start - end).toFixed(3);

        graphiteConnection.write({key: execTimeMs}, function(err) {
            if (err) {
                console.error('graphite client write error', err);
            }
        });

        return result;
    }
};