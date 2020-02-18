import { RPM } from '../../src/index';

class Test {
    @RPM('key', 'plaintext://your-graphite-url:2003')
    public rpmExample(): boolean {
        console.log('started method');
        for (let i = 0; i <= 100; i++) {
            // const foo = i + Math.random();
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
}, 60000);
