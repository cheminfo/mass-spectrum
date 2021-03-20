interface DataType {
  x: number[];
  y: number[];
}

export function getInfo({ x, y }: DataType) {
  let x0 = { x: x[0], y: y[0] };
  let y0 = { x: x[0], y: y[0] };
  let max = { x: x[0], y: y[0] };
  let power: DataType = { x, y: [] };
  for (let i = 0; i < x.length; i++) {
    if (Math.abs(y[i]) < Math.abs(y0.y)) {
      y0.x = x[i];
      y0.y = y[i];
    }
    if (Math.abs(x[i]) < Math.abs(x0.x)) {
      x0.x = x[i];
      x0.y = y[i];
    }
    power.y.push(x[i] * y[i]);
    if (x[i] * y[i] < max.x * max.y) {
      max.x = x[i];
      max.y = y[i];
    }
  }
  return { x0, y0, max, power };
}

export function toNumber(value: string) {
  return isNaN(Number(value)) ? value : Number(value);
}

interface SeriesType {
  data: number[];
  label: string;
  units?: string;
}

const units: Record<string, string> = {
  C: 'F',
  I: 'A',
  V: 'V',
  R: 'Ohm',
  G: 'S',
  Q: 'C',
  F: 'Hz',
  T: 's',
};
export function appendUnits(data: Record<string, SeriesType>) {
  for (const key in data) {
    const { label } = data[key];
    const unit = units[label.trim()[0].toUpperCase()] || undefined;
    if (unit) {
      const isDens = /dens/.exec(label);
      data[key].units = isDens !== null ? `${unit}/mm` : unit;
    }
  }
  return data;
}
