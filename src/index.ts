import { getVowelAppend, getFixedAppend, VOWELS, expand } from './utils';

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
  vowels?: string[] | Set<string>;

  /**
   * The number of times to repeat `pad` when we find a vowel
   * that needs to be expanded.
   */
  letterMultiplier?: number;

  /**
   * When in fixed  mode, set the multiplier.
   */
  fixedMultiplier?: number;
};

export function pseudo(
  str: string,
  {
    mode = 'vowels',
    pad = '-',
    prefix = '',
    suffix = '',
    vowels = VOWELS,
    letterMultiplier = 1,
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
      ? getVowelAppend(str, vowels, expand(letterMultiplier)(pad))
      : getFixedAppend(str, fixedMultiplier, pad);

  return prefix + str + res + suffix;
}
