import type { TextData } from 'cheminfo-types';
import { fromJcamp as commonFromJcamp } from 'common-spectrum';

import { spectrumCallback } from './utils/spectrumCallback.ts';

/**
 * Creates a new Analysis from a SPC buffer
 * @param jcamp
 * @param [options={}]
 * @param [options.id=Math.random()]
 * @param [options.label=options.id] - human redeable label
 * @param [options.spectrumCallback] - a callback to apply on variables when creating spectrum. Default will add a and t
 * @returns - New class element with the given data
 */
export function fromJcamp(jcamp: TextData, options = {}) {
  return commonFromJcamp(jcamp, { ...options, spectrumCallback });
}
