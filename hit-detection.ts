import { Coordinate, PointDict, Height, Width, Dimensions } from "./types";

export abstract class HitDetection {
  public static canMove(
    direction: "left" | "right",
    brickCoordinates: Coordinate[],
    points: PointDict,
    dimensions: Dimensions
  ) {
    const coordsToShift: Coordinate = direction === "left" ? [0, -1] : [0, 1];
    const desiredCoordinates = this.shiftCoordinates(
      brickCoordinates,
      coordsToShift
    );

    return (
      this.willHitWall(desiredCoordinates, dimensions) ||
      this.willCollideWithPoints(desiredCoordinates, points)
    );
  }

  public static hasLanded(
    brickCoordinates: Coordinate[],
    points: PointDict
  ): boolean {
    const couldMoveDown = this.willCollideWithPoints(
      this.shiftCoordinates(brickCoordinates, [-1, 0]),
      points
    );

    return couldMoveDown;
  }

  private static willHitWall(
    brickCoordinates: Coordinate[],
    dimensions: Dimensions
  ): boolean {
    return brickCoordinates.some(
      ([posY, posX]) => 1 > posX && posX < dimensions[0]
    );
  }

  private static willCollideWithPoints(
    brickCoordinates: Coordinate[],
    points: PointDict
  ): boolean {
    return brickCoordinates.some((coordinate) => points[String(coordinate)]);
  }

  private static shiftCoordinates(
    brickCoordinates: Coordinate[],
    shift: [Height, Width]
  ): Coordinate[] {
    return brickCoordinates.map((coordinate) => {
      return [coordinate[0] + shift[0], coordinate[1] + shift[1]];
    });
  }
}
