import { Point, BaseBlock, getRandomBlockInstance } from "./blocks";
import { Dimensions, PointDict} from  './types'
export class Board {
  dimensions: Dimensions;
  private activeBlock: BaseBlock;
  private activateBlockPosition: Coordinates;
  public NextBlock: BaseBlock;
  points: PointDict = {};

  constructor(dimensions: Dimensions) {
    this.dimensions = dimensions;
    this.activeBlock = getRandomBlockInstance();
    this.NextBlock = getRandomBlockInstance();
  }
  get activeBlockCoordinates() {
    return this.activeBlock.shape.map((coordinate) => {
      return [
        this.activateBlockPosition[0] - coordinate[0],
        this.activateBlockPosition[1] - coordinate[1],
      ];
    });
  }

  get matrix() {
    const matrix: Point[][] = [];
    for (let height = 0; height < this.dimensions[1]; height++) {
      matrix.push([]);
      for (let width = 0; width < this.dimensions[0]; width++) {
        matrix[height][width] = this.points[String([width, height])];
      }
    }
    return matrix;
  }

  public moveBlockDown() {
    if (this.shouldBecomePoints()) {
      this.convertBlockToPoints();
      this.removeFullRows();
    } else {
      --this.activateBlockPosition[1];
    }
  }
  public moveBlockLeft() {
    if (!this.willPassWall) --this.activateBlockPosition[0];
  }
  public moveBlockRight() {
    if (!this.willPassWall) ++this.activateBlockPosition[0];
  }
  private willPassWall() {
    return this.activeBlockCoordinates
      .map((coordinate) =>
        0 > coordinate[0] && coordinate[0] < this.dimensions[0] ? true : false
      )
      .some((bool) => bool);
  }

  private shouldBecomePoints() {
    return this.activeBlockCoordinates
      .map(
        (coordinate) =>
          !!this.points[String(coordinate)] ||
          coordinate[1] > this.dimensions[1]
      )
      .some((bool) => bool);
  }
  convertBlockToPoints() {
    for (let coordinate of this.activeBlockCoordinates) {
      this.points[String(coordinate)] = new Point(this.activeBlock.color);
    }
    this.activeBlock = this.NextBlock;
    this.NextBlock = getRandomBlockInstance();
  }

  removeFullRows() {
    const newMatrix = this.matrix.filter((row) => row.every((point) => point));
    const rowsNeeded = this.dimensions[1] - newMatrix.length;

    for (let row = 0; row < rowsNeeded; row++) {
      newMatrix.unshift([]);
    }

    if (rowsNeeded) {
      this.points = newMatrix.reduce((points, row, height) => {
        const morePoints = row.reduce((rowPoints, point, width) => {
          if (point) {
            rowPoints[String([width, height])] = point;
          }
          return rowPoints;
        }, {} as PointDict);
        return { ...points, ...morePoints };
      }, {} as PointDict);
    }
  }
}
