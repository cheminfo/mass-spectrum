import { readFileSync } from 'fs';
import { join } from 'path';

import { fromText } from '../fromText';

describe('fromText', () => {
  it('mass1.txt', () => {
    let text = readFileSync(join(__dirname, '../../../testFiles/mass1.txt'));
    let analysis = fromText(text, {
      title: 'This is the title',
    });
    let spectrum = analysis.getXYSpectrum({ index: 0 });

    expect(spectrum.variables.x.data).toHaveLength(40270);
    expect(spectrum.variables.x.label).toStrictEqual('m/z');

    expect(spectrum.variables.y.data).toHaveLength(40270);
    expect(spectrum.variables.y.label).toStrictEqual('Relative intensity');

    expect(spectrum.title).toBe('This is the title');
    expect(spectrum.dataType).toBe('MASS SPECTRUM');
    expect(Object.keys(spectrum.meta)).toHaveLength(0);
  });
  it('mass2.csv', () => {
    let text = readFileSync(join(__dirname, '../../../testFiles/mass2.csv'));
    let analysis = fromText(text, {
      title: 'This is the title',
    });
    let spectrum = analysis.getXYSpectrum({ index: 0 });

    expect(spectrum.variables.x.data).toHaveLength(146669);
    expect(spectrum.variables.x.label).toStrictEqual('m/z');

    expect(spectrum.variables.y.data).toHaveLength(146669);
    expect(spectrum.variables.y.label).toStrictEqual('Relative intensity');

    expect(spectrum.title).toBe('This is the title');
    expect(spectrum.dataType).toBe('MASS SPECTRUM');
    expect(Object.keys(spectrum.meta)).toHaveLength(2);
  });
  it('mass3.asc', () => {
    let text = readFileSync(join(__dirname, '../../../testFiles/mass3.asc'));
    let analysis = fromText(text, {
      title: 'This is the title',
    });
    let spectrum = analysis.getXYSpectrum({ index: 0 });

    expect(spectrum.variables.x.data).toHaveLength(5653);
    expect(spectrum.variables.x.label).toStrictEqual('m/z');

    expect(spectrum.variables.y.data).toHaveLength(5653);
    expect(spectrum.variables.y.label).toStrictEqual('Relative intensity');

    expect(spectrum.title).toBe('This is the title');
    expect(spectrum.dataType).toBe('MASS SPECTRUM');
    expect(Object.keys(spectrum.meta)).toHaveLength(0);
  });
  it('mass4.spectrum', () => {
    let text = readFileSync(
      join(__dirname, '../../../testFiles/mass4.spectrum'),
    );
    let analysis = fromText(text, {
      title: 'This is the title',
    });
    let spectrum = analysis.getXYSpectrum({ index: 0 });

    expect(spectrum.variables.x.data).toHaveLength(5653);
    expect(spectrum.variables.x.label).toStrictEqual('m/z');

    expect(spectrum.variables.y.data).toHaveLength(5653);
    expect(spectrum.variables.y.label).toStrictEqual('Relative intensity');

    expect(spectrum.title).toBe('This is the title');
    expect(spectrum.dataType).toBe('MASS SPECTRUM');
    expect(Object.keys(spectrum.meta)).toHaveLength(18);
  });
});
