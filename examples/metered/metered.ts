import {Metered} from '../../index';
import * as graphite from 'graphite';

const client = graphite.createClient('plaintext://your-graphite-url:2003');

class Test {
    @Metered('features.test.key', client)
    public meteredExample() {
        console.log('started method');
        for (let i = 0; i <= 100; i++) {
            let foo = i + Math.random();
        }

        console.log('ended method');

        return true;
    }

    @Metered('some.test.key', client)
    public meteredPromiseExample() {
        console.log('started promise method');
        return new Promise((resolve, reject) => {
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