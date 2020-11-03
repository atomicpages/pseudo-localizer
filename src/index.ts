export type Resource = Record<string, any>;

export type PseudoLocalizerOptions = {
    /**
     * Set to `fixed` to manually specify a padding ratio. Use
     * `vowels` to let vowels dictate the length of the pseudo
     * localized string.
     */
    mode?: 'fixed' | 'vowels';

    /**
     * Custom prefix to use before the pseudo localized string.
     */
    prefix?: string;

    /**
     * Custom suffix to use after the pseudo localized string.
     */
    suffix?: string;

    /**
     * The string to use for padding. Any UTF-8 value is accepted.
     */
    pad?: string;

    /**
     * An array of vowels to use when `mode` is set to `vowels`.
     */
    vowels?: string[];

    /**
     * When in fixed  mode, set the multiplier.
     */
    fixedMultiplier?: number;
};

function getVowelAppend(
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

function getFixedAppend(
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

export function pseudo(
    str: string,
    {
        mode = 'vowels',
        pad = '-',
        prefix = '',
        suffix = '',
        vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'],
        fixedMultiplier = 0.3,
    }: PseudoLocalizerOptions = {}
): string {
    if (mode === 'fixed' && fixedMultiplier < 0) {
        throw new Error('fixedMultiplier option must be greater than zero');
    }

    if (!pad.length || pad.length > 1) {
        throw new Error('pad option must be a single character');
    }

    const res =
        mode === 'vowels'
            ? getVowelAppend(str, vowels, pad)
            : getFixedAppend(str, fixedMultiplier, pad);

    return prefix + str + res + suffix;
}
