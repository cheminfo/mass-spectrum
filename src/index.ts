import type { MeasurementXY } from 'cheminfo-types';
import {
  JSGraph as OriginalJSGraph,
  peakPicking as originalPeakPicking,
} from 'common-spectrum';
import { xyObjectNormedY } from 'ml-spectra-processing';
import { Spectrum } from 'ms-spectrum';

import { getAnnotations } from './jsgraph/getAnnotations.ts';

export { AnalysesManager, Analysis, toJcamp } from 'common-spectrum';

export { fromText } from './from/fromText.ts';
export { fromJcamp } from './from/fromJcamp.ts';

export function autoPeakPicking(spectrum: MeasurementXY, options = {}) {
  const data = {
    x: spectrum.variables.x.data,
    y: spectrum.variables.y.data,
  };

  const msSpectrum = new Spectrum(data);
  const peaks = xyObjectNormedY(
    msSpectrum.getBestPeaks(options).filter((peak) => !peak.close),
    { value: 100, algorithm: 'max' },
  );

  return peaks.map((peak) => {
    return {
      mass: peak.x,
      intensity: peak.y,
    };
  });
}

export function peakPicking(
  spectrum: MeasurementXY,
  target: number,
  options: any,
) {
  const peak = originalPeakPicking(spectrum, target, options);
  if (!peak) return undefined;
  return {
    mass: peak.x,
    intensity: peak.y,
  };
}

export const JSGraph: typeof OriginalJSGraph & {
  getAnnotations: typeof getAnnotations;
} = { ...OriginalJSGraph, getAnnotations };
