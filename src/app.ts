import { LinePattern1 } from "./patterns/line-pattern-1";

export class App {
  private readonly canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
  private readonly context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

  private readonly patterns = {
    line1: new LinePattern1(this.context)
  }

  constructor() {
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;

    this.patterns.line1.draw();
  }
}
