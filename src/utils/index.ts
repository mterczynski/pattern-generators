import { Line } from "../types";

export function getRandomArrayElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getLineLength(line: Line) {
  const {start, end} = line;
  return Math.sqrt((start.x - end.x) ** 2 + (start.y - end.y) ** 2);
}

export function getRandomPointOnLine(line: Line) {
  const lineXDelta = line.end.x - line.start.x;
  const lineYDelta = line.end.y - line.start.y;

  return {
    x: line.start.x + lineXDelta * Math.random(),
    y: line.start.y + lineYDelta * Math.random(),
  };
}
