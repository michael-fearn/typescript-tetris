import { Point } from "./blocks";

export type Coordinate = [number, number];
export type Width = number;
export type Height = number;
export type Dimensions = [Width, Height];
export type PointDict = { [Pos1CommaPos2: string]: Point };
