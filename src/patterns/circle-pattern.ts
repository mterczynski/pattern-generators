import { Point } from "../types";

interface Circle {
  center: Point;
  radius: number;
  color: string;
}

export interface CircleOptions {
  circleCount: number;
  maxRadius: number;
  colorScheme: 'rainbow' | 'warm' | 'cool' | 'monochrome';
  alpha: number;
}

function getRandomAngle() {
  return Math.random() * Math.PI * 2;
}

function getRandomRadius(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getColorByScheme(scheme: string, index: number, total: number, alpha: number): string {
  const hue = (index / total) * 360;
  
  switch (scheme) {
    case 'rainbow':
      return `hsla(${hue}, 70%, 60%, ${alpha})`;
    case 'warm':
      return `hsla(${(hue % 60) + 20}, 80%, 65%, ${alpha})`;
    case 'cool':
      return `hsla(${(hue % 120) + 180}, 75%, 55%, ${alpha})`;
    case 'monochrome':
      const lightness = 30 + (index / total) * 40;
      return `hsla(220, 30%, ${lightness}%, ${alpha})`;
    default:
      return `hsla(${hue}, 70%, 60%, ${alpha})`;
  }
}

export class CirclePattern {
  private circles: Circle[] = [];

  constructor(
    private readonly context: CanvasRenderingContext2D,
    private options: CircleOptions = {
      circleCount: 150,
      maxRadius: 300,
      colorScheme: 'rainbow',
      alpha: 0.3
    }
  ) { }

  draw(options?: CircleOptions): void {
    if (options) this.options = options;
    this.circles = [];
    this.generateCircles();
    this.drawAllCircles();
  }

  private generateCircles() {
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    const centerX = windowW / 2;
    const centerY = windowH / 2;

    // Generate concentric circles with fractal-like distribution
    for (let i = 0; i < this.options.circleCount; i++) {
      const angle = getRandomAngle();
      const distance = Math.pow(Math.random(), 0.7) * (Math.min(windowW, windowH) / 3);
      
      const center: Point = {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance
      };

      // Create radius that decreases with distance from center
      const maxPossibleRadius = this.options.maxRadius * (1 - distance / (Math.min(windowW, windowH) / 3));
      const radius = getRandomRadius(5, Math.max(10, maxPossibleRadius));

      const color = getColorByScheme(
        this.options.colorScheme, 
        i, 
        this.options.circleCount, 
        this.options.alpha
      );

      this.circles.push({ center, radius, color });
    }

    // Add some smaller detail circles for fractal effect
    const detailCount = Math.floor(this.options.circleCount * 0.3);
    for (let i = 0; i < detailCount; i++) {
      const parentCircle = this.circles[Math.floor(Math.random() * this.circles.length)];
      const angle = getRandomAngle();
      const distance = parentCircle.radius * (0.3 + Math.random() * 0.4);
      
      const center: Point = {
        x: parentCircle.center.x + Math.cos(angle) * distance,
        y: parentCircle.center.y + Math.sin(angle) * distance
      };

      const radius = parentCircle.radius * (0.1 + Math.random() * 0.3);
      const color = getColorByScheme(
        this.options.colorScheme, 
        i + this.options.circleCount, 
        this.options.circleCount + detailCount, 
        this.options.alpha * 1.5
      );

      this.circles.push({ center, radius, color });
    }
  }

  private drawAllCircles() {
    const ctx = this.context;
    
    // Sort circles by radius (largest first) for better layering
    this.circles.sort((a, b) => b.radius - a.radius);

    this.circles.forEach(circle => {
      ctx.beginPath();
      ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, Math.PI * 2);
      ctx.fillStyle = circle.color;
      ctx.fill();
      
      // Add subtle stroke for definition
      ctx.strokeStyle = circle.color.replace(/[\d\.]+\)$/g, `${this.options.alpha * 0.8})`);
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }
}