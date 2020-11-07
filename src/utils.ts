import { PseudoLocalizerOptions } from '.';

export const expand = (multiplier: number) => (pad: string): string => {
    let newPad = '';

    for (let i = 0; i < multiplier; i++) {
        newPad += pad;
    }

    return newPad;
};

export function getVowelAppend(
    str: string,
    vowels: PseudoLocalizerOptions['vowels'],
    pad: PseudoLocalizerOptions['pad']
): string {
    let append = '';

    for (let i = 0; i < str.length; i++) {
        if (vowels.indexOf(str[i]) > -1) {
            append += pad;
        }
    }

    return append;
}

export function getFixedAppend(
    str: string,
    fixedMultiplier: PseudoLocalizerOptions['fixedMultiplier'],
    pad: PseudoLocalizerOptions['pad']
): string {
    const newLength = Math.floor(str.length * fixedMultiplier);
    let append = '';

    for (let i = 0; i < newLength; i++) {
        append += pad;
    }

    return append;
}

export const VOWELS = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
