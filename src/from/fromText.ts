import { Analysis } from 'common-spectrum';
// @ts-ignore
import { parseXY } from 'xy-parser';

export function fromText(text: string | ArrayBufferView, options: any = {}) {
  const { title } = options;
  if (ArrayBuffer.isView(text)) {
    let decoder = new TextDecoder('utf8');
    text = decoder.decode(text);
  }

  const { data, info } = parseXY(text, {
    bestGuess: true,
    keepInfo: true,
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
  let meta = {};
  let index = 1;
  // @ts-ignore
  info.forEach((line: any) => (meta[`Info ${index++}`] = line.value));
  const analysis = new Analysis();
  analysis.pushSpectrum(spectrum, {
    dataType: 'MASS SPECTRUM',
    title,
    meta,
  });
  return analysis;
}
