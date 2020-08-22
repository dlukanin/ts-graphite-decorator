# ts-graphite-decorator

Simple decorator collection for using it with [graphite](https://www.npmjs.com/package/graphite) package.

Decorators are written using **current typescript decorators implementation** and
you can easy integrate them in your typescript code.

You can get more info about typescript decorators on the [official typescript docs site](https://www.typescriptlang.org/docs/handbook/decorators.html).

Note that you should open graphite connection using graphite module (or it's own custom implementation) in your own code.

## Changelog
1.0.0 - Deps up. Error report enable.

0.0.7 - Now you can pass graphite connection string in decorator w/o client.

0.0.5, 0.0.6 - Some bugfixes

0.0.4 - Added logging interval - 60 sec (TODO - configure it)

0.0.2 & 0.0.3 - Some inner module fixes.

0.0.1 - Hello world! First version with Metered decorator.

## Usage

```typescript
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

```typescript
import {Metered} from 'ts-graphite-decorator';
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
test.rpmExample(); // graphite will get info about 1 rpm/min

```

Or

```typescript
import {Metered} from 'ts-graphite-decorator';

class Test {
    @RPM('key', 'plaintext://your-graphite-url:2003')
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
test.rpmExample(); // graphite will get info about 1 rpm/min

```

Check out the examples folder: https://github.com/dlukanin/ts-graphite-decorator/tree/master/examples

## License

MIT https://github.com/dlukanin/ts-graphite-decorator/blob/master/LICENSE