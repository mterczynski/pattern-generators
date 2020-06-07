import { Line } from "../types";
import { getRandomPointOnLine, getRandomArrayElement } from "../utils";

const lineCount = 900;
const maxLineLength = 300;

function getRandomAngle() {
  const angleCount = 8;
  return Math.floor(Math.random() * angleCount) * Math.PI / angleCount * 2;
}

export class LinePattern1 {
  private readonly lines: Line[] = [
    {
      start: {x: 0, y: 50},
      end: {x: 0, y: -50}
    }
  ];

  constructor(private readonly context: CanvasRenderingContext2D) {
    for(let i=0; i<lineCount-1; i++) {
      this.addLine();
    }
  }

  draw() {
    this.drawBackground();
    this.drawAllLines();
  }

  private addLine() {
    const startLine = this.getRandomLine();
    const startPoint = getRandomPointOnLine(startLine);
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

  private drawBackground() {
    this.context.fillStyle = "rgb(0,0,0)";
    this.context.fillRect(0, 0, innerWidth, innerHeight);
  }

  private getRandomLine() {
    return getRandomArrayElement(this.lines);
  }

  private drawAllLines() {
    const ctx = this.context;
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    ctx.strokeStyle = "rgba(3, 140, 252, 0.4)";

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
