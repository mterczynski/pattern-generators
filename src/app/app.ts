const lineCount = 50;
const maxLineLength = 100;

/**
 * `{x: 0, y: 0}` represents middle of the field
 */
interface Point {
  x: number
  y: number
}

interface Line {
  start: Point
  end: Point
}

function getRandomArrElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getLineLength(line: Line) {
  const {start, end} = line;
  return Math.sqrt((start.x - end.x) ** 2 + (start.y - end.y) ** 2);
}

function getRandomStartPoint(line: Line) {
  const lineXDelta = line.end.x - line.start.x;
  const lineYDelta = line.end.y - line.start.y;

  return {
    x: line.start.x + lineXDelta * Math.random(),
    y: line.start.y + lineYDelta * Math.random(),
  };
}

function getRandomAngle() {
  return Math.random() * 2 * Math.PI;
}

export class App {
  private readonly canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
  private readonly context = this.canvas.getContext('2d');
  private readonly lines: Line[] = [
    {
      start: {x: 0, y: 50},
      end: {x: 0, y: -50}
    }
  ];

  constructor() {
    for(let i=0; i<lineCount-1; i++) {
      this.addLine();
    }

    this.drawAllLines();
  }

  private addLine() {
    const startLine = this.getRandomLine();
    const startPoint = getRandomStartPoint(startLine);
    const angle = getRandomAngle();
    const lineLength = maxLineLength;

    const endPoint = {
      x: startPoint.x + Math.sin(angle) * maxLineLength,
      y: startPoint.y + Math.cos(angle) * maxLineLength,
    }

    const newLine = {
      start: startPoint,
      end: endPoint
    };

    this.lines.push(newLine);
  }

  private getRandomLine() {
    return getRandomArrElement(this.lines);
  }

  private drawAllLines() {
    const ctx = this.context;
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;

    this.canvas.width = windowW;
    this.canvas.height = windowH;


    this.lines.forEach(line => {
      ctx?.beginPath();
      ctx?.moveTo(
        line.start.x + windowW / 2,
        line.start.y + windowH / 2
      );
      ctx?.lineTo(
        line.end.x + windowW / 2,
        line.end.y + windowH / 2
      );
      ctx?.stroke();
    })
  }
}
