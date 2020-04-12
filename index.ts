type Coordinate = [number, number];

class BaseBlock {
  protected baseShape: Coordinate[];
  color: string;
  orientation = 0;

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

class IBlock extends BaseBlock {
  protected baseShape: Coordinate[] = [
    [-1, 0],
    [0, 0],
    [1, 0],
    [2, 0],
  ];
  color = "#00F0F0";
}
class JBlock extends BaseBlock {
  protected baseShape: Coordinate[] = [
    [-1, 1],
    [-1, 0],
    [0, 0],
    [1, 0],
  ];
  color = "#0000F0";
}

class LBlock extends BaseBlock {
  protected baseShape: Coordinate[] = [
    [-1, 0],
    [0, 0],
    [1, 0],
    [1, 1],
  ];
  color = "#F0A000";
}

class OBlock extends BaseBlock {
  protected baseShape: Coordinate[] = [
    [0, 0],
    [1, 0],
    [0, -1],
    [1, -1],
  ];
  color = "#F0F000";
}

class SBlock extends BaseBlock {
  protected baseShape: Coordinate[] = [
    [-1, 0],
    [0, 0],
    [0, 1],
    [1, 1],
  ];
  color = "#00F000";
}

class ZBlock extends BaseBlock {
  protected baseShape: Coordinate[] = [
    [-1, 1],
    [0, 1],
    [0, 0],
    [1, 0],
  ];
  color = "#F00000";
}

class TBlock extends BaseBlock {
  protected baseShape: Coordinate[] = [
    [-1, 0],
    [0, 0],
    [0, 1],
    [0, -1],
  ];
  color = "#A000F0";
}