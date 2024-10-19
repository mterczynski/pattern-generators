import { Line } from "../types";
import { getRandomPointOnLine, getRandomArrayElement, getLineLength } from "../utils";

function getRandomAngle() {
  const angleCount = 8;
  return Math.floor(Math.random() * angleCount) * Math.PI / angleCount * 2;
}

function getInitLinesArray() {
  return [{
    start: { x: 0, y: 500 },
    end: { x: 0, y: -500 }
  }];
}

export interface LineOptions {
  lineColor: string;
  lineCount: number;
}

export class LinePattern2 {
  private lines: Line[] = getInitLinesArray();

  constructor(
    private readonly context: CanvasRenderingContext2D,
    private options: LineOptions = {
      lineColor: "rgba(3, 255, 129, 0.4)",
      lineCount: 4000,
    }
  ) { }

  draw(options?: LineOptions): void {
    if (options) this.options = options;
    this.lines = getInitLinesArray();
    this.fillLinesArray();
    this.drawAllLines();
  }

  private fillLinesArray() {
    for (let i = 0; i < this.options.lineCount - 1; i++) {
      this.addLine();
    }
  }

  private addLine() {
    const startLine = this.getRandomLine();
    const startLineLength = getLineLength(startLine);
    const startPoint = getRandomPointOnLine(startLine);
    const angle = getRandomAngle();
    const newLineLength = startLineLength * 0.6;

    const endPoint = {
      x: startPoint.x + Math.sin(angle) * newLineLength,
      y: startPoint.y + Math.cos(angle) * newLineLength,
    }

    const newLine = {
      start: startPoint,
      end: endPoint
    };

    this.lines.push(newLine);
  }

  private getRandomLine() {
    return getRandomArrayElement(this.lines);
  }

  private drawAllLines() {
    const ctx = this.context;
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    ctx.strokeStyle = this.options.lineColor || "rgba(3, 255, 129, 0.4)";

    this.lines.forEach(line => {
      ctx.beginPath();
      ctx.moveTo(
        line.start.x + windowW / 2,
        line.start.y + windowH / 2
      );
      ctx.lineTo(
        line.end.x + windowW / 2,
        line.end.y + windowH / 2
      );
      ctx.stroke();
    })
  }
}
