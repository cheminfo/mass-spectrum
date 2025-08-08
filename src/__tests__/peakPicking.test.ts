import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { autoPeakPicking, fromJcamp, fromText } from '../index.js';

test('Peak Picking from JCAMP-DX. We ensure max peak intensity is 100', () => {
  const jcamp = readFileSync(
    join(import.meta.dirname, './data/mass.jdx'),
    'utf8',
  );
  const analysis = fromJcamp(jcamp);
  const spectrum = analysis.spectra[0];

  // Perform peak picking
  const peaks = autoPeakPicking(spectrum);

  expect(peaks).toHaveLength(8);

  const maxIntensity = Math.max(...peaks.map((peak) => peak.intensity));

  expect(maxIntensity).toBe(100);
});

test('Peak Picking from TEXT. We ensure max peak intensity is 100', () => {
  const text = readFileSync(
    join(import.meta.dirname, './data/mass1.txt'),
    'utf8',
  );
  const analysis = fromText(text);
  const spectrum = analysis.spectra[0];

  // Perform peak picking
  const peaks = autoPeakPicking(spectrum);

  expect(peaks).toHaveLength(6);

  const maxIntensity = Math.max(...peaks.map((peak) => peak.intensity));

  expect(maxIntensity).toBe(100);
});
