import { Dimensions, PointDict, PointIndex, Coordinate, Height } from "./types";
import { BaseBlock, Point } from "./blocks";
import { HitDetection } from "./hit-detection";
export class Board {
  public dimensions: Dimensions;
  private points: PointDict = {};
  public pointsIndex: PointIndex = {};
  private brick: BaseBlock;
  private brickPosition: Coordinate;

  constructor(dimensions: Dimensions) {
    this.dimensions = dimensions;
  }

  get positionedBrickShape(): Coordinate[] {
    const shape = this.brick.shape.map((coordinate) => {
      const positionedCoordinates: Coordinate = [
        this.brickPosition[0] + coordinate[0],
        this.brickPosition[1] + coordinate[1],
      ];
      return positionedCoordinates;
    });

    return shape;
  }

  public nextBrick(brick: BaseBlock, brickPosition: Coordinate): void {
    this.brick = brick;
    this.brickPosition = brickPosition;
  }

  public moveBlockLeft(): void {
    if (
      HitDetection.canMove(
        "left",
        this.positionedBrickShape,
        this.points,
        this.dimensions
      )
    ) {
      --this.brickPosition[1];
    }
  }
  public moveBlockRight(): void {
    if (
      HitDetection.canMove(
        "right",
        this.positionedBrickShape,
        this.points,
        this.dimensions
      )
    ) {
      ++this.brickPosition[1];
    }
  }

  public moveBlockDown(): void {
    if (HitDetection.hasLanded(this.positionedBrickShape, this.points)) {
      const affectedRows = this.positionedBrickShape
        .map((coordinate) => coordinate[0])
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
      affectedRows.forEach(this.removeRow);
      this.convertBrickToPoints();
    }
  }

  private convertBrickToPoints(): void {
    this.positionedBrickShape.forEach((coordinate) => {
      this.indexPoint(coordinate);
      this.points[String(coordinate)] = new Point(this.brick.color);
    });
  }
  private indexPoint(coordinate: Coordinate): void {
    let heightIndex = this.pointsIndex[String(coordinate[0])];

    heightIndex = heightIndex ? heightIndex : {};
    heightIndex[String(coordinate[1])] = true;
  }

  removeRow(row: Height): void {
    const pointsInRow = Object.keys(this.pointsIndex[row]).map(Number);
    const boardWidth = this.dimensions[1];
    if (pointsInRow.length === boardWidth) {
      delete this.pointsIndex[row];
      pointsInRow.forEach(
        (position) => delete this.points[String([row, position])]
      );
      this.shiftRowsDown(row);
    }
  }

  private shiftRowsDown(row: Height) {
    // Shift all Point indexes
    Object.keys(this.pointsIndex)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach((posY) => {
        if (posY > row) {
          this.pointsIndex[posY - 1] = this.pointsIndex[posY];
        }
      });

    // Shift all Points
    const newPoints: PointDict = {};
    for (const coordinateString in this.points) {
      const [posY, posX] = coordinateString
        .split(",")
        .map(Number) as Coordinate;

      if (posY > row) {
        newPoints[String([posY - 1, posX])] = this.points[coordinateString];
      } else {
        newPoints[coordinateString] = this.points[coordinateString];
      }
    }
  }
}
