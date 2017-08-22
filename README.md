# ts-graphite-decorator

Simple decorator collection for using it with [graphite](https://www.npmjs.com/package/graphite) package.

Decorators are written using **current typescript decorators implementation** and
you can easy integrate them in your typescript code.

You can get more info about typescript decorators on the [official typescript docs site](https://www.typescriptlang.org/docs/handbook/decorators.html).

Note that you should open graphite connection using graphite module (or it's own custom implementation) in your own code.

## Changelog

0.0.1 - Hello world! First version with Metered decorator.

## Usage

```
import {Metered} from 'ts-graphite-decorator';
import * as graphite from 'graphite';

const client = graphite.createClient('plaintext://your-graphite-url:2003');

class Test {
    @Metered('some.test.key', client)
    public meteredExample() {
        console.log('started method');
        for (let i = 0; i <= 100; i++) {
            let foo = i + Math.random();
        }

        console.log('ended method');

        return true;
    }
}

const test = new Test();
test.meteredExample(); // graphite got some info about your method exec time

```

Check out the examples folder: https://github.com/dlukanin/ts-graphite-decorator/tree/master/examples

## License

MIT https://github.com/dlukanin/ts-graphite-decorator/blob/master/LICENSE