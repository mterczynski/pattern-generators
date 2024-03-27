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
    this.addInputChangeListeners()
  }

  private draw() {
    this.drawBackground();
    console.log(this.getColorInputValues())

    const firstColor = this.getColorInputValues()[0]!
    const secondColor = this.getColorInputValues()[1]!
    const alpha = this.getAlphaValue()
    const lineCount = (document.getElementById('input-line-count') as HTMLInputElement).valueAsNumber;

    this.patterns.line2.draw({ lineColor: `rgba(${firstColor.r}, ${firstColor.g}, ${firstColor.b}, ${alpha})`, lineCount });
    this.patterns.line2.draw({ lineColor: `rgba(${secondColor.r}, ${secondColor.g}, ${secondColor.b}, ${alpha})`, lineCount });
  }

  private drawBackground() {
    const backgroundColor = (document.getElementById('color-background') as HTMLInputElement).value!
    this.context.fillStyle = backgroundColor;
    this.context.fillRect(0, 0, innerWidth, innerHeight);
  }

  private addGenerateButtonListener() {
    const button = document.getElementById('button-generate')

    button?.addEventListener('click', () => {
      this.draw()
    })
  }

  private getColorInputValues() {
    function hexToRgb(hex: string) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    return [
      (document.getElementById('color-input-1') as HTMLInputElement).value,
      (document.getElementById('color-input-2') as HTMLInputElement).value,
    ].map(v => hexToRgb(v))
  }

  private getAlphaValue() {
    return (document.getElementById('alpha-input') as HTMLInputElement).value
  }

  private addInputChangeListeners() {
    (document.getElementById('alpha-input') as HTMLInputElement).addEventListener('change', () => this.draw());
    (document.getElementById('color-input-1') as HTMLInputElement).addEventListener('change', () => this.draw());
    (document.getElementById('color-input-2') as HTMLInputElement).addEventListener('change', () => this.draw());
    (document.getElementById('color-background') as HTMLInputElement).addEventListener('change', () => this.draw());
    (document.getElementById('input-line-count') as HTMLInputElement).addEventListener('change', () => this.draw());
  }

  private addDownloadButtonListener() {
    const button = document.getElementById('button-download')
    const canvas = document.getElementById('main-canvas') as HTMLCanvasElement

    button?.addEventListener('click', () => {
      if (!canvas) {
        return
      }
      const link = document.createElement('a');
      link.download = 'line-art.jpg';
      link.href = canvas.toDataURL()
      link.click();
    })
  }
}
