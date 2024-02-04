"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  useRef,
} from "react";

import {
  GAME_TYPES,
  PLAYER_TURNS,
  THINKING_TIME,
  checkGameState,
  getRandom,
  replace,
  findBestMove,
  findRandomMove,
  getRandomPlayerTurn,
} from "-/app/common";

interface GameState {
  position: string | null;
  iconType: number | null;
  isTie: boolean | null;
}

interface AppState {
  gameType: GAME_TYPES;
  currentIcon: number;
  playerTurn: PLAYER_TURNS;
  cells: (number | null)[];
  gameState: GameState;
}

interface AppContextProps extends AppState {
  initNewGame: (type: GAME_TYPES) => void;
  humanPlay: (index: number) => void;
  newGame: () => void;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const useAppContext = (): AppContextProps => useContext(AppContext);

let timeout: NodeJS.Timeout;

const initialState: AppState = {
  gameType: GAME_TYPES.TWO_PLAYERS,
  currentIcon: getRandom(0, 2),
  playerTurn: getRandomPlayerTurn(),
  cells: new Array(9).fill(null),
  gameState: {
    position: null,
    iconType: null,
    isTie: null,
  },
};

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(initialState);
  const stateFaster = useRef(initialState);

  useEffect(() => {
    initGame();
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const initGame = () => {
    const { gameType, playerTurn, cells } = stateFaster.current;
    if (
      gameType === GAME_TYPES.VERSUS_COMPUTER &&
      playerTurn === PLAYER_TURNS.PLAYER_2
    ) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const randomMove = findRandomMove(cells);
        computerPlay(randomMove);
      }, THINKING_TIME);
    }
  };

  const initNewGame = (type = initialState.gameType) => {
    const newState = {
      ...initialState,
      gameType: type,
      currentIcon: getRandom(0, 2),
      playerTurn: getRandomPlayerTurn(),
    };
    setState(newState);
    stateFaster.current = newState;
    initGame();
  };

  const newGame = () => initNewGame(stateFaster.current.gameType);

  const applyState = (index: number) => {
    const { cells, currentIcon, playerTurn } = stateFaster.current;
    const nextCells = replace(cells, index, currentIcon); // add icon in cell
    const newState = {
      ...stateFaster.current,
      cells: nextCells,
      gameState: checkGameState(nextCells),
      currentIcon: 1 - currentIcon,
      playerTurn:
        playerTurn === PLAYER_TURNS.PLAYER_1
          ? PLAYER_TURNS.PLAYER_2
          : PLAYER_TURNS.PLAYER_1,
    };
    stateFaster.current = newState;
    setState(newState);
  };

  const moveAfterHuman = () => {
    const {
      gameState: { position },
      gameType,
      playerTurn,
    } = stateFaster.current;
    if (
      !position &&
      gameType === GAME_TYPES.VERSUS_COMPUTER &&
      playerTurn === PLAYER_TURNS.PLAYER_2
    ) {
      setTimeout(makeAIMove, THINKING_TIME);
    }
  };

  const humanPlay = (index: number) => {
    const {
      gameState: { position },
      gameType,
      playerTurn,
      cells,
    } = stateFaster.current;
    if (
      !position &&
      (!cells[index] || cells[index] === 0) &&
      (gameType === GAME_TYPES.TWO_PLAYERS ||
        playerTurn === PLAYER_TURNS.PLAYER_1)
    ) {
      applyState(index);
      moveAfterHuman();
    }
  };

  const computerPlay = (move: number | null) => {
    const {
      gameState: { position },
      gameType,
      playerTurn,
    } = stateFaster.current;
    if (move === null) return console.error("aqui es el error");
    if (
      !position &&
      gameType === GAME_TYPES.VERSUS_COMPUTER &&
      playerTurn === PLAYER_TURNS.PLAYER_2
    ) {
      applyState(move);
    }
  };

  const makeAIMove = () => {
    const { cells, currentIcon } = stateFaster.current;
    const bestMove = findBestMove(cells, currentIcon);
    computerPlay(bestMove);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        initNewGame,
        humanPlay,
        newGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
