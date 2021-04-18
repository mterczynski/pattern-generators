import { Line } from "../types";
import { getRandomPointOnLine, getRandomArrayElement, getLineLength } from "../utils";

const lineCount = 50000;
const maxLineLength = 2000;

function getRandomAngle() {
  const angleCount = 32;
  return Math.floor(Math.random() * angleCount) * Math.PI / angleCount * 2;
}

function getInitLinesArray() {
  return [{
    start: {x: 0, y: maxLineLength/2},
    end: {x: 0, y: -maxLineLength/2}
  }];
}

export class LinePattern3 {
  private lines: Line[] = getInitLinesArray();

  constructor(private readonly context: CanvasRenderingContext2D) {}

  draw(lineColor?: {red: number, green: number, blue: number}) {
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
    const startLineLength = getLineLength(startLine);
    const startPoint = getRandomPointOnLine(startLine);
    const angle = getRandomAngle();
    const newLineLength = startLineLength * 0.8;

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

  private drawAllLines(lineColorArg?: {red: number, green: number, blue: number}) {
    const ctx = this.context;
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;

    let lineColor = lineColorArg || {red: 255, green: 108, blue: 72};

    this.lines.forEach(line => {
      const lineLength = getLineLength(line);
      const {red, green, blue} = lineColor;

      ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${lineLength/maxLineLength})`;

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
