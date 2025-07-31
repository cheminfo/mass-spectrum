import type { TextData } from 'cheminfo-types';
import { Analysis } from 'common-spectrum';
import { ensureString } from 'ensure-string';
import { parseXYAndKeepInfo } from 'xy-parser';

export function fromText(blob: TextData, options: any = {}) {
  const text = ensureString(blob);
  const { title } = options;

  const { data, info } = parseXYAndKeepInfo(text, {
    bestGuess: true,
    ...options,
  });

  const spectrum = {
    x: {
      data: data.x,
      units: 'm/z',
      label: 'm/z',
    },
    y: {
      data: data.y,
      units: '',
      label: 'Relative intensity',
    },
  };
  const meta: Record<string, any> = {};
  let index = 1;

  for (const item of info) {
    meta[`Info ${index++}`] = item.value;
  }

  const analysis = new Analysis();
  analysis.pushSpectrum(spectrum, {
    dataType: 'MASS SPECTRUM',
    title,
    meta,
  });
  return analysis;
}
