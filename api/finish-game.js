import { games } from "./store.js";

export default function handler(req, res) {
  const { game_id, winner } = req.body;

  const game = games[game_id];

  if (!game) {
    return res.status(404).json({
      error: "Jogo não encontrado",
    });
  }

  game.status = "finished";
  game.winner = winner;

  res.status(200).json({
    success: true,
    message: "Jogo finalizado",
  });
}