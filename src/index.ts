import type { MeasurementXY } from 'cheminfo-types';
import {
  JSGraph as OriginalJSGraph,
  peakPicking as originalPeakPicking,
} from 'common-spectrum';
import { xyMaxY, xyObjectNormedY } from 'ml-spectra-processing';
import { Spectrum } from 'ms-spectrum';

import { getAnnotations } from './jsgraph/getAnnotations.ts';

export { AnalysesManager, Analysis, toJcamp } from 'common-spectrum';

export { fromText } from './from/fromText.ts';
export { fromJcamp } from './from/fromJcamp.ts';

export function autoPeakPicking(spectrum: MeasurementXY, options = {}) {
  options = {
    threshold: 0.1,
    numberSlots: 20,
    numberCloseSlots: 40,
    ...options,
  };
  const data = {
    x: spectrum.variables.x.data,
    y: spectrum.variables.y.data,
  };

  const msSpectrum = new Spectrum(data);
  // we need to know the global best peaks to know his intensity and set it to 100
  const minMaxX = msSpectrum.minMaxX();
  const maxY = msSpectrum
    .getBestPeaks({
      ...options,
      from: minMaxX.min,
      to: minMaxX.max,
    })
    .sort((a, b) => b.y - a.y)[0]?.y;
  const maxRatio = maxY ? 100 / maxY : 1;

  const peaks = msSpectrum.getBestPeaks(options);

  return peaks.map((peak) => {
    return {
      mass: peak.x,
      intensity: peak.y * maxRatio,
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
