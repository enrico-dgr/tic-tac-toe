function minimax(
  board: string[], 
  depth: number,
  isMaximizingPlayer: boolean
): number {
  // Base case - evaluate board
  if (depth === 0 || boardIsTerminal(board)) {
    return evaluateBoard(board);
  }

  // Maximizing player - find max value
  if (isMaximizingPlayer) {
    let maxEval: number = -Infinity;
    const possibleMoves: {position: number, symbol: string}[] = generatePossibleMoves(board);

    for (let move of possibleMoves) {
      // Recursively evaluate minimax
      let currentEval: number = minimax(applyMove(board, move), depth - 1, false);
      maxEval = Math.max(maxEval, currentEval);
    }
    return maxEval;

    // Minimizing player - find min value
  } else {
    let minEval: number = Infinity;
    const possibleMoves: {position: number, symbol: string}[] = generatePossibleMoves(board);

    for (let move of possibleMoves) {
      // Recursively evaluate minimax
      let currentEval: number = minimax(applyMove(board, move), depth - 1, true);
      minEval = Math.min(minEval, currentEval);
    }
    return minEval;
  }
}

function boardIsTerminal(board: string[]): boolean {
  // Check if board is full or someone has won
  return board.every((cell) => cell !== "") || !!checkForWinner(board);
}

function evaluateBoard(board: string[]): number {
  // Give a score if X wins, O wins, or draw
  const winner = checkForWinner(board);
  if (winner === "X") return 1;
  if (winner === "O") return -1;
  return 0;
}
/**
 * Generates an array of possible moves by putting X in each empty cell of the board.
 *
 * @param board - The current state of the board
 * @returns An array of possible moves
 */
function generatePossibleMoves(board: string[]): {position: number, symbol: string}[] {
  // Get array of empty cells with their index
  const emptyCells = board
    .map((cell, index) => (cell === "" ? index : null))
    .filter((cell) => cell !== null) as number[];

  // Generate moves by putting X in each empty cell
  const moves = emptyCells.map((index) => {
    return {
      position: index,
      symbol: "X"
    };
  });

  return moves;
}

/**
 * Returns a new board with the provided move applied.
 *
 * @param board - The current state of the board
 * @param move - The move to apply, containing position and symbol
 * @returns A new board with the move applied
 */
function applyMove(
  board: string[],
  move: { position: number; symbol: string }  
): string[] {
  const newBoard = [...board];
  newBoard[move.position] = move.symbol;
  return newBoard;
}
/**
 * Checks if there is a winner on the board.
 * 
 * @param board - The board array
 * @returns 'X', 'O', or '' if no winner
 */
function checkForWinner(board: string[]): string {

  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i * 3] === board[i * 3 + 1] && 
      board[i * 3] === board[i * 3 + 2] &&
      board[i * 3] !== ""
    ) {
      return board[i * 3];
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[i] === board[i + 3] &&
      board[i] === board[i + 6] &&
      board[i] !== ""  
    ) {
      return board[i];
    }
  }

  // Check diagonals
  if (board[0] === board[4] && board[0] === board[8] && board[0] !== "") {
    return board[0];
  }
  if (board[2] === board[4] && board[2] === board[6] && board[2] !== "") {
    return board[2];
  }

  return "";
}

export default minimax;
