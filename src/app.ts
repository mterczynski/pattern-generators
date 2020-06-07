import { LinePattern1 } from "./patterns/line-pattern-1";
import { LinePattern2 } from "./patterns/line-pattern-2";

export class App {
  private readonly canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
  private readonly context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

  private readonly patterns = {
    line1: new LinePattern1(this.context),
    line2: new LinePattern2(this.context),
  }

  constructor() {
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;

    this.drawBackground();
    this.patterns.line2.draw();
  }

  private drawBackground() {
    this.context.fillStyle = "rgb(0,0,0)";
    this.context.fillRect(0, 0, innerWidth, innerHeight);
  }
}
