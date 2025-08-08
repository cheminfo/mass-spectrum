export interface Peak {
  mass: number;
  intensity: number;
  assignment: string;
}

export interface Position {
  x: number;
  y: number;
  dy?: string;
  dx?: string;
}

export interface Label {
  text: string;
  size: string;
  anchor: string;
  color: string;
  angle?: number;
  position: Position;
}

export interface Annotation {
  line: number;
  type: string;
  strokeColor: string;
  strokeWidth: number;
  fillColor: string;
  labels?: Label[];
  position?: Position[];
}

export interface GetAnnotationsOptions {
  fillColor?: string;
  strokeColor?: string;
  showAssignment?: boolean;
  showIntensity?: boolean;
  showMass?: boolean;
  creationFct?: (annotation: Annotation, peak: Peak) => void;
}

/**
 * Creates annotations for jsgraph that allows to display the result of peak picking
 * @param peaks - Array of peaks to create annotations for
 * @param options - Configuration options for the annotations
 * @returns Array of annotations
 */
export function getAnnotations(
  peaks: Peak[],
  options: GetAnnotationsOptions = {},
): Annotation[] {
  const { fillColor = 'green', strokeColor = 'red', creationFct } = options;

  const annotations = peaks.map((peak) => {
    const annotation: Annotation = {
      line: 1,
      type: 'rect',
      strokeColor,
      strokeWidth: 0,
      fillColor,
    };

    if (creationFct) {
      creationFct(annotation, peak);
    }

    annotationPeak(annotation, peak, options);

    return annotation;
  });

  return annotations;
}

function annotationPeak(
  annotation: Annotation,
  peak: Peak,
  options: GetAnnotationsOptions = {},
): void {
  const {
    showAssignment = true,
    showIntensity = true,
    showMass = true,
  } = options;
  const labels: Label[] = [];
  let line = 0;
  const shiftY = -3;

  if (showMass) {
    labels.push({
      text: `m/z: ${peak.mass?.toFixed(0)}`,
      size: '18px',
      anchor: 'left',
      color: 'green',
      position: {
        x: peak.mass,
        y: peak.intensity,
        dy: `${shiftY - line * 14}px`,
        dx: '3px',
      },
    });
    line++;
  }

  if (showIntensity) {
    labels.push({
      text: `${peak.intensity?.toFixed(0)}%`,
      size: '18px',
      anchor: 'left',
      color: 'green',
      position: {
        x: peak.mass,
        y: peak.intensity,
        dy: `${shiftY - line * 14}px`,
        dx: '3px',
      },
    });
    line++;
  }

  if (showAssignment && peak.assignment) {
    labels.push({
      text: peak.assignment,
      size: '18px',
      anchor: 'middle',
      color: 'red',
      position: {
        x: peak.mass,
        y: peak.intensity,
        dy: `${shiftY - line * 14}px`,
      },
    });
    line++;
  }

  annotation.labels = labels;
  annotation.position = [
    {
      x: peak.mass,
      y: peak.intensity,
      dy: '-2px',
      dx: '-1px',
    },
    {
      x: peak.mass,
      y: peak.intensity,
      dy: '-25px',
      dx: '1px',
    },
  ];
}
