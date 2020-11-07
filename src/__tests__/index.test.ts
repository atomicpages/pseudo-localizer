import tape from 'tape';
import { pseudo, PseudoLocalizerOptions } from '../index';

tape('Basic pseudo localize tests', t => {
    t.equal(pseudo('Hello'), 'Hello--', 'works with vowels');
    t.equal(pseudo('lynx'), 'lynx', 'works without vowels');

    t.equal(
        pseudo('Ahoy, matey!', { letterMultiplier: 3 }),
        'Ahoy, matey!------------',
        'supports a custom vowel multiplier'
    );

    t.throws(
        () => pseudo('Hello', { mode: 'fixed', fixedMultiplier: -1 }),
        'throws and fixedMultiplier is a negative number'
    );

    t.throws(() => pseudo('Hello', { pad: null }), 'throws when pad is null');
    t.throws(() => pseudo('Hello', { pad: '' }), 'throws when pad is an empty string');
    t.throws(() => pseudo('Hello', { pad: '123' }), 'throws when pad is more than one character');

    t.doesNotThrow(
        () => pseudo('Hello', { pad: undefined }),
        'does not throw when pad is undefined since default value is used'
    );

    t.doesNotThrow(() => pseudo('Hello', { pad: '\u1234' }), 'pad should work with unicode points');

    t.end();
});

tape('Fixed length tests', t => {
    const opts: PseudoLocalizerOptions = {
        mode: 'fixed',
        fixedMultiplier: 0.3, // expands by 30%
        prefix: '_',
        suffix: '_',
    };

    t.equal(pseudo('Hello', opts), '_Hello-_', 'supports fixed length expansion');

    t.equal(
        /Hello/.test(pseudo('Hello', opts)),
        true,
        'regex searching works after transformation'
    );

    t.equal(pseudo('to', opts), '_to_');
    t.equal(pseudo('internationalization', opts), '_internationalization------_');

    t.equal(
        pseudo('Hello', {
            mode: 'fixed',
            fixedMultiplier: 1.25,
        }).length,
        Math.floor(5 * 1.25) + 5,
        'equals the string length times the multiplier plus the original string length'
    );

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
