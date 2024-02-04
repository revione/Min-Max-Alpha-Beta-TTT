"use client";

import { useMemo } from "react";
import { GAME_TYPES, PLAYER_TURNS, ICON_CHARS } from "-/app/common";
import { useAppContext } from "-/app/context";

const Info = () => {
  const { gameState, gameType, currentIcon, playerTurn } = useAppContext();

  const info = useMemo(() => {
    if (gameState.isTie) return "Tie!";

    if (gameType === GAME_TYPES.TWO_PLAYERS)
      return gameState.position
        ? `Player " ${ICON_CHARS[1 - currentIcon]} " wins!`
        : `It's player " ${ICON_CHARS[currentIcon]} " turn`;

    return gameState.position
      ? playerTurn === PLAYER_TURNS.PLAYER_1
        ? "Computer wins!"
        : "You win!"
      : playerTurn === PLAYER_TURNS.PLAYER_1
        ? "It's your turn."
        : "It's computer's turn.";
  }, [gameState, gameType, currentIcon, playerTurn]);

  return <h2 className="mb-5 text-xl font-normal">{info}</h2>;
};

export default Info;
