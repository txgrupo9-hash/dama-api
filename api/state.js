import { games } from "./store.js";

export default function handler(req, res) {
  const { game_id } = req.query;

  const game = games[game_id];

  if (!game) {
    return res.status(404).json({
      error: "Jogo não encontrado",
    });
  }

  res.status(200).json({
    success: true,
    game,
  });
}