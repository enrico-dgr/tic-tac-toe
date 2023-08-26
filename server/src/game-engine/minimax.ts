import { applyMove, checkForWinner } from './logic';

/**
 * Evaluates the best move for the current player using the minimax algorithm.
 *
 * @param board - The current state of the board.
 * @param depth - The maximum depth to evaluate future moves.
 * @param symbol - The symbol of the current player.
 * @param symbols - The symbols for both players.
 * @param isMaximizingPlayer - Whether the current player is the maximizing player.
 * @returns Object containing the evaluation for the best move and the best move itself.
 */
const minimax = ({
  board,
  symbol,
  symbols,
  depth = 0,
  isMaximizingPlayer = true
}: {
  board: Board;
  symbol: string;
  symbols: string[];
  depth?: number;
  isMaximizingPlayer?: boolean;
}): { eval: number; move?: Move } => {
  // Base case - evaluate board
  if (depth < 1 || boardIsTerminal(board)) {
    return { eval: evaluatePlayer(board, symbol) };
  }

  const isMoveOfSymbol = (diff: Diff): boolean => diff.symbol2 === symbol;

  const possibleBoards = generatePossibleBoards(board, symbols);

  // Maximizing player - find max value
  if (isMaximizingPlayer) {
    let maxEval = -Infinity;
    let bestMove: Move | undefined;

    for (let possibleBoard of possibleBoards) {
      // Recursively evaluate minimax
      let currentEval = minimax({
        board: possibleBoard,
        depth: depth - 1,
        symbol,
        symbols,
        isMaximizingPlayer: false
      }).eval;

      if (currentEval > maxEval) {
        maxEval = currentEval;

        const diff = findBoardDiffs(board, possibleBoard).find(isMoveOfSymbol);

        if (diff) {
          bestMove = {
            position: diff.position,
            symbol: diff.symbol2
          };
        }
      }
    }

    return { eval: maxEval, move: bestMove };

    // Minimizing player - find min value
  } else {
    let minEval = Infinity;
    let worstMove: Move | undefined;

    for (let possibleBoard of possibleBoards) {
      // Recursively evaluate minimax
      let currentEval = minimax({
        board: possibleBoard,
        depth: depth - 1,
        symbol,
        symbols
      }).eval;

      if (currentEval < minEval) {
        minEval = currentEval;

        const diff = findBoardDiffs(board, possibleBoard).find(isMoveOfSymbol);

        if (diff) {
          worstMove = {
            position: diff.position,
            symbol: diff.symbol2
          };
        }
      }
    }

    return { eval: minEval, move: worstMove };
  }
};

export function boardIsTerminal(board: Board): boolean {
  // Check if board is full or someone has won
  return board.every((cell) => cell !== '') || !!checkForWinner(board);
}

export const evaluatePlayer = (board: Board, symbol: string) => {
  const winner = checkForWinner(board);

  if (winner === symbol) {
    return 1;
  } else if (winner === '') {
    return 0;
  }

  return -1;
};

/**
 * Generates an array of possible moves by putting symbol in each empty cell of the board.
 *
 * @param board - The current state of the board
 * @param symbol - Symbol that can make moves
 * @returns An array of possible moves
 */
export function generatePossibleMoves(board: Board, symbol: string): Move[] {
  const emptyCells = getEmptyCells(board);

  // Generate moves by putting each `symbol` in each empty cell
  const moves: Move[] = emptyCells.map((index) => ({
    position: index,
    symbol
  }));

  return moves;
}

/**
 * Checks if two boards are equal
 *
 * @param board1 - The first board to compare
 * @param board2 - The second board to compare
 * @returns True if the boards are equal, false otherwise
 */
export const boardsAreEqual = (board1: Board, board2: Board): boolean => {
  return board1.every((cell, index) => cell === board2[index]);
};

/**
 * Finds differences between two boards
 *
 * @param board1 - The first board
 * @param board2 - The second board
 * @returns An array containing the indices of cells that differ between the boards
 */
export const findBoardDiffs = (board1: Board, board2: Board): Diff[] => {
  const diffs: Diff[] = [];

  board1.forEach((cell1, index) => {
    const cell2 = board2[index];

    if (cell1 !== cell2) {
      diffs.push({
        position: index,
        symbol1: cell1,
        symbol2: cell2
      });
    }
  });

  return diffs;
};

/**
 * Generates all possible boards from the given board and symbols
 *
 * @param board - The current board state
 * @param symbols - The symbols that can make moves
 * @returns An array of all possible boards
 */
export const generatePossibleBoards = (board: Board, symbols: string[]): Board[] => {
  // Initialize empty array to store possible boards
  const possibleBoards: Board[] = [];

  if (symbols.length < 1 || boardIsTerminal(board)) {
    return [board];
  }

  // Symbols move by array order
  const currentSymbol = symbols.slice(0, 1)[0];

  // Generate possible moves for current symbol
  let possibleMoves: Move[] = generatePossibleMoves(board, currentSymbol);

  // Get remaining symbols that can make moves
  const remainingSymbols = symbols.slice(1);

  // Recursively generate possible boards for each move
  const generatePossibleBoardsFromMove = (move: Move) => {
    const boardWithMove = applyMove(board, move);

    return generatePossibleBoards(boardWithMove, remainingSymbols);
  };

  // Helper function to add board if it is not already added
  const pushIfNewBoard = (possibleBoard: Board): void => {
    const boardIsADuplicate = (pushedBoard: Board): boolean =>
      boardsAreEqual(pushedBoard, possibleBoard) ||
      boardsAreEqual(pushedBoard, possibleBoard.slice().reverse());

    if (!possibleBoards.find(boardIsADuplicate)) {
      possibleBoards.push(possibleBoard);
    }
  };

  // Generate and add possible boards for each move
  const pushNewPossibleBoards = (move: Move) => {
    const generatedPossibleBoards = generatePossibleBoardsFromMove(move);
    generatedPossibleBoards.forEach(pushIfNewBoard);
  };

  if (possibleMoves.length < 1) {
    possibleBoards.push(board);
  } else {
    // Generate possible boards for each possible move
    possibleMoves.forEach(pushNewPossibleBoards);
  }

  return possibleBoards;
};

/**
 * Get an array with the indexes of empty cells
 */
export function getEmptyCells(board: Board) {
  return board
    .map((cell, index) => (cell === '' ? index : null))
    .filter((cell) => cell !== null) as number[];
}

export default minimax;
