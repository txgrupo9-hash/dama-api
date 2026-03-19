import { games } from "./store.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const game_id = Math.random().toString(36).substring(2, 10);

  const board = Array(8).fill(null).map(() => Array(8).fill(""));

  // peças iniciais (dama)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 === 1) board[i][j] = "p2";
    }
  }

  for (let i = 5; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 === 1) board[i][j] = "p1";
    }
  }

  games[game_id] = {
    board,
    turn: "p1",
    players: [],
  };

  return res.status(200).json({
    success: true,
    game_id,
    board,
  });
}
// deploy trigger