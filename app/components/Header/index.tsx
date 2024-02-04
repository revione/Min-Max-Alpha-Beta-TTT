"use client";

import { GAME_TYPES } from "-/app/common";
import { useAppContext } from "-/app/context";

const buttons = [
  {
    label: "2 Players",
    type: GAME_TYPES.TWO_PLAYERS,
  },
  {
    label: "vs Computer",
    type: GAME_TYPES.VERSUS_COMPUTER,
  },
];

const Button = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    className={`text-white px-6 py-3 rounded focus:outline-none 
                ${isActive ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"}`}
    onClick={onClick}
  >
    {label}
  </button>
);

const Header = () => {
  const { gameType, initNewGame, newGame } = useAppContext();

  return (
    <div className="flex flex-col justify-center items-center mt-4 gap-6">
      <h1 className="text-3xl font-extrabold text-white">Min Max Logic</h1>
      <div className="flex justify-center">
        {buttons.map(({ label, type }) => (
          <Button
            key={type}
            label={label}
            isActive={gameType === type}
            onClick={() => initNewGame(type)}
          />
        ))}
      </div>
      <button
        className="text-white px-8 py-4 rounded-full bg-green-500 hover:bg-green-700 focus:outline-none transition duration-300"
        onClick={newGame}
      >
        New Game
      </button>
    </div>
  );
};

export default Header;
