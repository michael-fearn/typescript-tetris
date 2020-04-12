import { Point } from "./blocks";

export type Coordinate = [number, number];
export type Height = number;
export type Width = number;
export type Dimensions = [Height, Width];
export type PointDict = { [Pos1CommaPos2: string]: Point };
export type PointIndex = { [height: string]: {[width: string]: true}}