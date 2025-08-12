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

export function peakPicking(spectrum: MeasurementXY, target: number) {
  const peak = originalPeakPicking(spectrum, target, {
    xVariable: 'x',
    yVariable: 'y',
    optimize: false,
    // we could optimize the peaks but it depends of the width
    // and also if it is continuous or not. Not obvious
    // if we optimize we need to add this parameters for high res spectrum
    //   shape: { kind: 'gaussian', fwhm: 0.01 },
    max: true,
  });
  if (!peak) return undefined;
  return {
    mass: peak.x,
    intensity: peak.y,
  };
}

export const JSGraph: typeof OriginalJSGraph & {
  getAnnotations: typeof getAnnotations;
} = { ...OriginalJSGraph, getAnnotations };
