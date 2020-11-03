import tape from 'tape';
import { pseudo, PseudoLocalizerOptions } from '../index';

tape('Basic pseudo localize tests', t => {
    t.equal(pseudo('Hello'), 'Hello--');
    t.equal(pseudo('lynx'), 'lynx');

    t.throws(() => pseudo('Hello', { mode: 'fixed', fixedMultiplier: -1 }));
    t.throws(() => pseudo('Hello', { pad: null }));
    t.throws(() => pseudo('Hello', { pad: '123' }));

    t.end();
});

tape('Fixed length tests', t => {
    const opts: PseudoLocalizerOptions = {
        mode: 'fixed',
        fixedMultiplier: 0.3,
        prefix: '_',
        suffix: '_',
    };

    t.equal(pseudo('Hello', opts), '_Hello-_');
    t.equal(/Hello/.test(pseudo('Hello', opts)), true);

    t.equal(pseudo('to', opts), '_to_');
    t.equal(pseudo('internationalization', opts), '_internationalization------_');

    t.end();
});

tape('UTF-8 string tests', t => {
    const opts: PseudoLocalizerOptions = {
        vowels: ['あ', 'い', 'う', 'え', 'お'],
        pad: '\u4E0A',
    };

    t.equal(pseudo('おかあさん', opts), 'おかあさん\u4E0A\u4E0A');
    t.equal(pseudo('すうがく', opts), 'すうがく\u4E0A');

    t.end();
});
