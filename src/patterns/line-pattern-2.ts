import { Line } from "../types";
import { getRandomPointOnLine, getRandomArrayElement } from "../utils";

const lineCount = 900;
const maxLineLength = 300;

function getRandomAngle() {
  const angleCount = 8;
  return Math.floor(Math.random() * angleCount) * Math.PI / angleCount * 2;
}

function getInitLinesArray() {
  return [{
    start: {x: 0, y: 50},
    end: {x: 0, y: -50}
  }];
}

export class LinePattern2 {
  private lines: Line[] = getInitLinesArray();

  constructor(private readonly context: CanvasRenderingContext2D) {}

  draw(lineColor?: string) {
    this.lines = getInitLinesArray();
    this.fillLinesArray();
    this.drawAllLines(lineColor);
  }

  private fillLinesArray() {
    for(let i=0; i<lineCount-1; i++) {
      this.addLine();
    }
  }

  private addLine() {
    const startLine = this.getRandomLine();
    const startPoint = getRandomPointOnLine(startLine);
    const angle = getRandomAngle();

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
    return getRandomArrayElement(this.lines);
  }

  private drawAllLines(lineColor?: string) {
    const ctx = this.context;
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    ctx.strokeStyle = lineColor || "rgba(3, 140, 252, 0.4)";

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
