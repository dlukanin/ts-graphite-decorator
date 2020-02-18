import * as Graphite from 'graphite';
import { Metered } from '../../src/index';

const client = Graphite.createClient('plaintext://your-graphite-url:2003');

class Test {
    @Metered('key', client)
    public meteredExample(): boolean {
        console.log('started method');
        for (let i = 0; i <= 100; i++) {
            // const foo = i + Math.random();
        }

        console.log('ended method');

        return true;
    }

    @Metered('some.test.key', client)
    public meteredPromiseExample(): Promise<boolean> {
        console.log('started promise method');
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('ended promise method');
                resolve(true)
            }, 1000);
        });
    }
}

const test = new Test();
test.meteredExample();
test.meteredPromiseExample();
