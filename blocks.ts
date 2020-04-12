import { Coordinate } from "./types";
export class Point {
  public color: string;

  constructor(color: string) {
    this.color = color;
  }
}

export class BaseBlock {
  protected baseShape: Coordinate[];
  private orientation = 0;
  public color: string;

  get shape(): Coordinate[] {
    if (this.orientation === 90) {
      return this.baseShape.map(([pos1, pos2]) => [-pos2, pos1]);
    } else if (this.orientation === 180) {
      return this.baseShape.map(([pos1, pos2]) => [-pos1, -pos2]);
    } else if (this.orientation === 270) {
      return this.baseShape.map(([pos1, pos2]) => [pos2, -pos1]);
    } else {
      return this.baseShape;
    }
  }

  rotateClockwise() {
    this.orientation = this.orientation + 90;
    if (this.orientation === 360) this.orientation = 0;
  }
  rotateCounterClockwise() {
    this.orientation = this.orientation - 90;
    if (this.orientation < 0) this.orientation = 270;
  }
}

export class IBlock extends BaseBlock {
  protected baseShape: Coordinate[] = [
    [0, -1],
    [0, 0],
    [0, 1],
    [0, 2],
  ];
  color = "#00F0F0";
}

export class JBlock extends BaseBlock {
  protected baseShape: Coordinate[] = [
    [1, -1],
    [0, -1],
    [0, 0],
    [0, 1],
  ];
  color = "#0000F0";
}

export class LBlock extends BaseBlock {
  protected baseShape: Coordinate[] = [
    [0, -1],
    [0, 0],
    [0, 1],
    [1, 1],
  ];
  color = "#F0A000";
}

export class OBlock extends BaseBlock {
  protected baseShape: Coordinate[] = [
    [0, 0],
    [0, 1],
    [-1, 0],
    [-1, 1],
  ];
  color = "#F0F000";
}

export class SBlock extends BaseBlock {
  protected baseShape: Coordinate[] = [
    [0, -1],
    [0, 0],
    [1, 0],
    [1, 1],
  ];
  color = "#00F000";
}

export class ZBlock extends BaseBlock {
  protected baseShape: Coordinate[] = [
    [1, -1],
    [1, 0],
    [0, 0],
    [0, 1],
  ];
  color = "#F00000";
}

export class TBlock extends BaseBlock {
  protected baseShape: Coordinate[] = [
    [0, -1],
    [0, 0],
    [1, 0],
    [-1, 0],
  ];
  color = "#A000F0";
}

export function getRandomBlockInstance(): BaseBlock {
  const shapes = [TBlock, ZBlock, SBlock, LBlock, JBlock, IBlock, OBlock];
  return new shapes[Math.floor(Math.random() * shapes.length)]();
}
