import { readFileSync } from 'fs';
import { join } from 'path';

import { fromJcamp } from '..';

test('fromJcamp', () => {
  const jcamp = readFileSync(
    join(__dirname, '../../testFiles/mass.jdx'),
    'utf8',
  );
  const analysis = fromJcamp(jcamp);
  const spectrum = analysis.spectra[0];
  expect(spectrum.variables.x.data).toHaveLength(37);
  expect(spectrum.variables.y.data).toHaveLength(37);
  expect(spectrum.meta.MF).toBe('C8H10');
  expect(spectrum.meta.MW).toBe(106);
});
