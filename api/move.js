import { games } from "./store.js";

function isInside(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function getPlayer(piece) {
  if (!piece) return null;
  return piece.startsWith("p1") ? "p1" : "p2";
}

export default function handler(req, res) {
  const { game_id, from, to, player } = req.body;

  const game = games[game_id];

  if (!game) {
    return res.status(404).json({ error: "Jogo não encontrado" });
  }

  if (game.turn !== player) {
    return res.status(400).json({ error: "Não é seu turno" });
  }

  const [fx, fy] = from;
  const [tx, ty] = to;

  if (!isInside(fx, fy) || !isInside(tx, ty)) {
    return res.status(400).json({ error: "Posição inválida" });
  }

  const piece = game.board[fx][fy];

  if (!piece) {
    return res.status(400).json({ error: "Sem peça na origem" });
  }

  if (getPlayer(piece) !== player) {
    return res.status(400).json({ error: "Peça não pertence ao jogador" });
  }

  if (game.board[tx][ty] !== "") {
    return res.status(400).json({ error: "Destino ocupado" });
  }

  const dx = tx - fx;
  const dy = ty - fy;

  // movimento diagonal obrigatório
  if (Math.abs(dx) !== Math.abs(dy)) {
    return res.status(400).json({ error: "Movimento inválido" });
  }

  // movimento simples
  if (Math.abs(dx) === 1) {
    game.board[tx][ty] = piece;
    game.board[fx][fy] = "";
  }

  // captura
  else if (Math.abs(dx) === 2) {
    const midX = (fx + tx) / 2;
    const midY = (fy + ty) / 2;

    const midPiece = game.board[midX][midY];

    if (!midPiece || getPlayer(midPiece) === player) {
      return res.status(400).json({ error: "Captura inválida" });
    }

    game.board[midX][midY] = "";
    game.board[tx][ty] = piece;
    game.board[fx][fy] = "";
  } else {
    return res.status(400).json({ error: "Movimento inválido" });
  }

  // promoção para dama
  if (piece === "p1" && tx === 0) {
    game.board[tx][ty] = "p1k";
  }

  if (piece === "p2" && tx === 7) {
    game.board[tx][ty] = "p2k";
  }

  // troca turno
  game.turn = game.turn === "p1" ? "p2" : "p1";

  return res.status(200).json({
    success: true,
    board: game.board,
    turn: game.turn,
  });
}