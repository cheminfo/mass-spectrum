import type { MeasurementXYVariables } from 'cheminfo-types';
import { xNormed } from 'ml-spectra-processing';

/**
 * We will force maxY to 100
 * @param variables - The variables object containing x and y data
 * @returns - The modified variables object with y data normalized
 */
export function spectrumCallback(
  variables: MeasurementXYVariables,
): MeasurementXYVariables {
  variables.y.data = xNormed(variables.y.data, {
    algorithm: 'max',
    value: 100,
  });
  return variables;
}
