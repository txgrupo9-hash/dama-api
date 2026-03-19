import { games } from "./store.js";

export default function handler(req, res) {
  const gameId = Math.random().toString(36).substring(2, 10);

  const board = [
    ["", "p2", "", "p2", "", "p2", "", "p2"],
    ["p2", "", "p2", "", "p2", "", "p2", ""],
    ["", "p2", "", "p2", "", "p2", "", "p2"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["p1", "", "p1", "", "p1", "", "p1", ""],
    ["", "p1", "", "p1", "", "p1", "", "p1"],
    ["p1", "", "p