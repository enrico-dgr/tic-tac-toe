/**
 * Returns a new board with the provided move applied.
 *
 * @param board - The current state of the board
 * @param move - The move to apply, containing position and symbol
 * @returns A new board with the move applied
 */
export function applyMove(board: Board, move: { position: number; symbol: string }): Board {
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
export function checkForWinner(board: Board): string {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i * 3] === board[i * 3 + 1] &&
      board[i * 3] === board[i * 3 + 2] &&
      board[i * 3] !== ''
    ) {
      return board[i * 3];
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (board[i] === board[i + 3] && board[i] === board[i + 6] && board[i] !== '') {
      return board[i];
    }
  }

  // Check diagonals
  if (board[0] === board[4] && board[0] === board[8] && board[0] !== '') {
    return board[0];
  }
  if (board[2] === board[4] && board[2] === board[6] && board[2] !== '') {
    return board[2];
  }

  return '';
}