import { getClient } from '../graphite.client';
import Now from 'performance-now';

const UNLOCK_TIMEOUT_MS = 60000;

const locked = {};

function write(key: string, execTimeMs: string, graphiteClient: any): void {
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

export function Metered(key: string, graphiteClient: any): MethodDecorator {
    graphiteClient = getClient(graphiteClient);

    return function(object: Record<string, any>, name: string, descriptor: PropertyDescriptor): void {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args): any {
            const start = Now();
            const result = originalMethod.apply(this, args);
            if (result && typeof result.then === 'function') {
                return result.then((val) => {
                    const execTimeMs = (Now() - start).toFixed(3);
                    write(key, execTimeMs, graphiteClient);

                    return val;
                });
            }

            const execTimeMs = (Now() - start).toFixed(3);
            write(key, execTimeMs, graphiteClient);
            return result;
        };
    }
}
