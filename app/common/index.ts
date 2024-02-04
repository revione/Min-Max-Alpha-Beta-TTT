// Constants
export const THINKING_TIME = 500;
export const ICON_PLACEHOLDER = "I";
export const ICON_CHARS = ["O", "X"];

// Enums
export enum GAME_TYPES {
  TWO_PLAYERS = "TWO_PLAYERS",
  VERSUS_COMPUTER = "VERSUS_COMPUTER",
}

export enum ICON_TYPES {
  O,
  X,
}

export enum PLAYER_TURNS {
  PLAYER_1 = "PLAYER_1",
  PLAYER_2 = "PLAYER_2",
}

// Winning Patterns
export const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Horizontales
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Verticales
  [0, 4, 8],
  [2, 4, 6], // Diagonales
];

// Utility functions

type Cells = (number | null)[];

// Random number generation
export const getRandom = (start: number, end: number): number =>
  start + Math.floor(Math.random() * (end - start));

export const getRandomPlayerTurn = () =>
  getRandom(0, 2) === 0 ? PLAYER_TURNS.PLAYER_1 : PLAYER_TURNS.PLAYER_2;

const getEmptyCells = (cells: Cells) =>
  cells
    .map((value, index) => [value, index])
    .filter((item) => item[0] === null);

const isMoveLeft = (cells: Cells) => getEmptyCells(cells).length > 0;

const determineWinningPosition = (patternIndex: number) => {
  if (patternIndex >= 0 && patternIndex <= 2) return `h h${patternIndex}`;
  if (patternIndex >= 3 && patternIndex <= 5) return `v v${patternIndex - 3}`;
  return `d${patternIndex - 6}`;
};

const winnerPattern = ([a, b, c]: number[], cells: Cells) =>
  cells[a] !== null && cells[a] === cells[b] && cells[a] === cells[c];

// Game state check
export const checkGameState = (cells: Cells) => {
  for (let i = 0; i < winPatterns.length; i++) {
    const pattern = winPatterns[i];
    if (winnerPattern(pattern, cells))
      return {
        position: determineWinningPosition(i),
        iconType: cells[pattern[0]],
        isTie: null,
      };
  }

  return {
    position: null,
    iconType: null,
    isTie: isMoveLeft(cells) ? null : true,
  };
};

// Cell manipulation functions
export const replace = (cells: Cells, position: number, icon: number) => [
  ...cells.slice(0, position),
  icon,
  ...cells.slice(position + 1, cells.length),
];

export const findRandomMove = (cells: Cells) => {
  const emptyCells = getEmptyCells(cells);
  if (emptyCells.length > 0) {
    const randomIndex = getRandom(0, emptyCells.length);
    const randomMove = emptyCells[randomIndex][1];
    return randomMove;
  }
  return null;
};

// Minimax algorithm
const evaluate = (cells: Cells, icon: number) => {
  for (let i = 0; i < winPatterns.length; i++) {
    const pattern = winPatterns[i];
    if (winnerPattern(pattern, cells)) {
      return cells[pattern[0]] === icon ? 10 : -10; // 10 = Computer win || -10 Human win
    }
  }
  return 0;
};

let data: any = [];
let iDea: any = null;

const noNull = (cell: null | number) =>
  cell === null ? "-" : ICON_CHARS[cell];

const spaces = (depth: number) => Array(depth + 1).join("  ");

const cells3 = (cells: Cells, ini: number) =>
  `${noNull(cells[ini])} | ${noNull(cells[ini + 1])} | ${noNull(
    cells[ini + 2]
  )}`;

const cellTree = (cells: Cells, depth: number) =>
  `
${spaces(depth)}${cells3(cells, 0)}
${spaces(depth)}${cells3(cells, 3)}
${spaces(depth)}${cells3(cells, 6)}
`;

const minimax = (
  cells: Cells,
  depth: number,
  alpha: number,
  beta: number,
  icon: number,
  isMax: boolean
) => {
  const score = evaluate(cells, icon);
  const noMoreMoves = !isMoveLeft(cells);

  data[iDea].tree = `${data[iDea].tree}
${cellTree(cells, depth)}
${spaces(
  depth
)}depth: ${depth}, score: ${score}, alpha ${alpha}, beta ${beta} ${
    score === 10
      ? "Computer win"
      : score === -10
        ? "Human win"
        : noMoreMoves
          ? "No more moves"
          : ""
  }`;

  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (noMoreMoves) return 0;

  const lengthCells = cells.length;
  let best;

  if (isMax) {
    best = -Infinity;
    for (let i = 0; i < lengthCells; i++) {
      if (cells[i] === null) {
        const nextBoard = replace(cells, i, icon);
        const nextScore = minimax(
          nextBoard,
          depth + 1,
          alpha,
          beta,
          icon,
          !isMax
        );
        best = Math.max(best, nextScore);
        alpha = Math.max(alpha, nextScore);
        data[iDea].tree += ` nextScore: ${nextScore}, alpha: ${alpha}`;
        if (beta <= alpha) data[iDea].tree += ` break`;
        if (beta <= alpha) break;
      }
    }
  } else {
    best = Infinity;
    for (let i = 0; i < lengthCells; i++) {
      if (cells[i] === null) {
        const nextBoard = replace(cells, i, 1 - icon);
        const nextScore = minimax(
          nextBoard,
          depth + 1,
          alpha,
          beta,
          icon,
          !isMax
        );
        best = Math.min(best, nextScore);
        beta = Math.min(beta, nextScore);
        data[iDea].tree += ` nextScore: ${nextScore}, beta: ${beta}`;
        if (beta <= alpha) data[iDea].tree += ` break`;
        if (beta <= alpha) break;
      }
    }
  }

  return best;
};

export const findBestMove = (cells: Cells, icon: number) => {
  let bestScore = -Infinity;
  let bestMove = null;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === null) {
      const newBoard = replace(cells, i, icon);
      data[i] = {};
      iDea = i;
      data[iDea].tree = `   Tree Human: ${noNull(icon - 1)}  Computer: ${noNull(
        icon
      )} 
${cellTree(cells, 0)}
${spaces(0)}tablero de incio.
${cellTree(newBoard, 0)}
${spaces(0)}tablero de comienzo de ideas.`;
      const moveScore = minimax(newBoard, 0, -Infinity, +Infinity, icon, false);
      data[i] = {
        ...data[i],
        cells,
        newBoard,
        moveScore,
        bestMove,
        bestScore,
        iDea,
      };
      // console.log(data);
      if (moveScore > bestScore) {
        bestScore = moveScore;
        bestMove = i;
      }
    }
  }
  return bestMove;
};
