# Pseudo Localizer

A tiny utility that brings harmony to content authors and developers.

## Why?

Most pseudo localization techniques mangle strings based on their ASCII values which creates two problems:

1. Pseudo localization doesn't work with non-ASCII encodings
2. Fuzzy matching doesn't work (ex: `/Hello/.test('Ḥḛḛḽḽṓṓ')` vs `/Hello/.test('_Hello--_')`)

`pseudo-localizer` works by taking the current string as-is and adds padding around the strings so fuzzy matches still behave properly.

## Install

```sh
npm i pseudo-localizer
```

## Usage

`pseudo-localizer` works in the browser, node, and deno. `pseudo-localizer` exports a single function that takes a string and options.

```js
import { pseudo } from 'pseudo-localizer';

pseudo('Hello'); // Hello--
pseudo('Hello', { prefix: '_' }); // _Hello--
```

## Options

| Name              | Type                  | Default Value           | Required | Description                                                |
| ----------------- | --------------------- | ----------------------- | -------- | ---------------------------------------------------------- |
| `mode`            | `'fixed' \| 'vowels'` | `'vowels'`              | No       | Set fixed to manually specify the string length multiplier |
| `prefix`          | `string`              |                         | No       | Set a prefix to use before the pseudo string               |
| `suffix`          | `string`              |                         | No       | Set a suffix to use after the pseudo string                |
| `pad`             | `string`              | `'-'`                   | No       | Set the pad character                                      |
| `vowels`          | `string[]`            | `[a,e,i,o,u,A,E,I,O,U]` | No       | Override the vowels list for non-English locales           |
| `fixedMultiplier` | `number`              | `0.3`                   | No       | In `fixed` mode, override the fixed multiplier.            |
