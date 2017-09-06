import {RPM} from '../../index';
import * as graphite from 'graphite';

const client = graphite.createClient('plaintext://your-graphite-url:2003');

class Test {
    @RPM('key', client)
    public rpmExample() {
        console.log('started method');
        for (let i = 0; i <= 100; i++) {
            let foo = i + Math.random();
        }

        console.log('ended method');

        return true;
    }
}

const test = new Test();
test.rpmExample();
test.rpmExample();
test.rpmExample();
test.rpmExample();
setTimeout(() => {
    test.rpmExample();
    test.rpmExample();
}, 60000)