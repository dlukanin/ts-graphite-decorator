import { getClient } from '../graphite.client';
import GraphiteClient from "graphite";

const UNLOCK_TIMEOUT_MS = 60000;

// TODO: fixme for multiple clients
let activeGraphiteClient: GraphiteClient;

let rpm = {};

function increaseCount(key: string): void {
    rpm[key] = rpm[key] || 0;
    rpm[key]++;
}

setInterval(() => {
    if (Object.keys(rpm).length) {
        activeGraphiteClient.write(rpm, function(err) {
            if (err) {
                console.error('[ts-graphite-decorator] graphite client write error', err.message);
            }
        });
        rpm = {};
    }
}, UNLOCK_TIMEOUT_MS);

export function RPM(key: string, graphiteClient: GraphiteClient): MethodDecorator {
    activeGraphiteClient = getClient(graphiteClient);

    return function(object: Record<string, any>, name: string, descriptor: PropertyDescriptor): void {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args): any {
            increaseCount(key);

            const result = originalMethod.apply(this, args);
            if (result && typeof result.then === 'function') {
                return result.then((val) => {
                    return val;
                });
            }

            return result;
        };
    }
}
