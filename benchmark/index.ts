import benchmark from 'benchmark';
import { pseudo } from '../src/index';

const suite = new benchmark.Suite('pseudo-localizer');

suite.add('basic pseudo localization', () => pseudo('Hello, there!'));

suite.add('pseudo localization with letter multiplier', () =>
    pseudo('Hello, there!', { letterMultiplier: 3 })
);

suite.add('pseudo localization with expanded vowels', () => {
    pseudo('Eigðu góðan dag', {
        vowels: [
            'A',
            'a',
            'Á',
            'á',
            'E',
            'e',
            'É',
            'é',
            'I',
            'i',
            'Í',
            'í',
            'O',
            'o',
            'Ó',
            'ó',
            'U',
            'u',
            'Ú',
            'ú',
            'Y',
            'y',
            'Ý',
            'ý',
            'Æ',
            'æ',
            'Ö',
            'ö',
        ],
    });
});

suite.add('fixed mode pseudo localization', () => pseudo('Hello, there!', { mode: 'fixed' }));

suite.on('cycle', e => {
    console.log(e.target.toString());
});

suite.run();
