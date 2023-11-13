import { LinePattern1 } from "./patterns/line-pattern-1";
import { LinePattern2 } from "./patterns/line-pattern-2";
import { LinePattern3 } from "./patterns/line-pattern-3";

export class App {
  private readonly canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
  private readonly context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

  private readonly patterns = {
    line1: new LinePattern1(this.context),
    line2: new LinePattern2(this.context),
    line3: new LinePattern3(this.context),
  }

  constructor() {
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;

    this.draw()
    this.addGenerateButtonListener()
    this.addDownloadButtonListener()
  }

  private draw() {
    this.drawBackground();
    this.patterns.line2.draw("rgba(3, 149, 240, 0.4)");
    this.patterns.line2.draw("rgba(0, 255, 128, 0.4)");
    // this.patterns.line2.draw("rgba(200, 30, 60, 0.4)");
    // this.patterns.line3.draw({red: 255, green: 255, blue: 255});
    // this.patterns.line3.draw({red: 0, green: 0, blue: 0});
    // this.patterns.line3.draw({red: 3, green: 149, blue: 240});
  }

  private drawBackground() {
    this.context.fillStyle = "rgb(0,0,0)";
    this.context.fillRect(0, 0, innerWidth, innerHeight);
  }

  private addGenerateButtonListener() {
    const button = document.getElementById('button-generate')

    button?.addEventListener('click', () => {
      this.draw()
    })
  }

  private addDownloadButtonListener() {
    const button = document.getElementById('button-download')
    const canvas = document.getElementById('main-canvas') as HTMLCanvasElement

    button?.addEventListener('click', () => {
      if (!canvas) {
        return
      }
      const link = document.createElement('a');
      link.download = 'blue-green-line-art.jpg';
      link.href = canvas.toDataURL()
      link.click();
    })
  }
}
