import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { fromText } from '../fromText.ts';

describe('fromText', () => {
  it('mass1.txt', () => {
    const text = readFileSync(
      join(import.meta.dirname, './testFiles/mass1.txt'),
    );
    const analysis = fromText(text, {
      title: 'This is the title',
    });
    const spectrum = analysis.getXYSpectrum({ index: 0 });

    expect(spectrum?.variables.x.data).toHaveLength(40270);
    expect(spectrum?.variables.x.label).toBe('m/z');

    expect(spectrum?.variables.y.data).toHaveLength(40270);
    expect(spectrum?.variables.y.label).toBe('Relative intensity');

    expect(spectrum?.title).toBe('This is the title');
    expect(spectrum?.dataType).toBe('MASS SPECTRUM');
    expect(Object.keys(spectrum?.meta ?? {})).toHaveLength(0);
  });

  it('mass2.csv', () => {
    const text = readFileSync(
      join(import.meta.dirname, './testFiles/mass2.csv'),
    );
    const analysis = fromText(text, {
      title: 'This is the title',
    });
    const spectrum = analysis.getXYSpectrum({ index: 0 });

    expect(spectrum?.variables.x.data).toHaveLength(146669);
    expect(spectrum?.variables.x.label).toBe('m/z');

    expect(spectrum?.variables.y.data).toHaveLength(146669);
    expect(spectrum?.variables.y.label).toBe('Relative intensity');

    expect(spectrum?.title).toBe('This is the title');
    expect(spectrum?.dataType).toBe('MASS SPECTRUM');
    expect(Object.keys(spectrum?.meta ?? {})).toHaveLength(2);
  });

  it('mass3.asc', () => {
    const text = readFileSync(
      join(import.meta.dirname, './testFiles/mass3.asc'),
    );
    const analysis = fromText(text, {
      title: 'This is the title',
    });
    const spectrum = analysis.getXYSpectrum({ index: 0 });

    expect(spectrum?.variables.x.data).toHaveLength(5653);
    expect(spectrum?.variables.x.label).toBe('m/z');

    expect(spectrum?.variables.y.data).toHaveLength(5653);
    expect(spectrum?.variables.y.label).toBe('Relative intensity');

    expect(spectrum?.title).toBe('This is the title');
    expect(spectrum?.dataType).toBe('MASS SPECTRUM');
    expect(Object.keys(spectrum?.meta ?? {})).toHaveLength(0);
  });

  it('mass4.spectrum', () => {
    const text = readFileSync(
      join(import.meta.dirname, './testFiles/mass4.spectrum'),
    );
    const analysis = fromText(text, {
      title: 'This is the title',
    });
    const spectrum = analysis.getXYSpectrum({ index: 0 });

    expect(spectrum?.variables.x.data).toHaveLength(5653);
    expect(spectrum?.variables.x.label).toBe('m/z');

    expect(spectrum?.variables.y.data).toHaveLength(5653);
    expect(spectrum?.variables.y.label).toBe('Relative intensity');

    expect(spectrum?.title).toBe('This is the title');
    expect(spectrum?.dataType).toBe('MASS SPECTRUM');
    expect(Object.keys(spectrum?.meta ?? {})).toHaveLength(18);
  });
});
