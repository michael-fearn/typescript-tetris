import { Board } from "./board";

export const blockEvents = new Event("");

export class Game {
  board: Board;
  timer;

  constructor() {
    this.board = new Board([10, 16]);
  }
}
