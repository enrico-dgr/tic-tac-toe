import minimax, {
  getEmptyCells,
  generatePossibleBoards,
  boardsAreEqual,
  boardIsTerminal,
  evaluatePlayer,
  findBoardDiffs,
  generatePossibleMoves
} from '../minimax';

describe('boardIsTerminal', () => {
  it('returns true if there is a winner', () => {
    const board = ['X', 'X', 'X', '', '', '', '', '', ''];
    expect(boardIsTerminal(board)).toBe(true);
  });

  it('returns true if board is full', () => {
    const board = ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O'];
    expect(boardIsTerminal(board)).toBe(true);
  });

  it('returns false if no winner and board not full', () => {
    const board = ['X', 'O', 'X', '', '', '', '', '', ''];
    expect(boardIsTerminal(board)).toBe(false);
  });
});

describe('evaluatePlayer', () => {
  it('returns 1 if player is winner', () => {
    const board = ['X', 'X', 'X', '', '', '', '', '', ''];
    const evaluation = evaluatePlayer(board, 'X');
    expect(evaluation).toBe(1);
  });

  it('returns 0 if no winner', () => {
    const board = ['X', 'O', 'X', '', '', '', '', '', ''];
    const evaluation = evaluatePlayer(board, 'X');
    expect(evaluation).toBe(0);
  });

  it('returns -1 if other player is winner', () => {
    const board = ['O', 'O', 'O', '', '', '', '', '', ''];
    const evaluation = evaluatePlayer(board, 'X');
    expect(evaluation).toBe(-1);
  });
});

describe('generatePossibleMoves', () => {
  it('returns array of moves for symbol in empty cells', () => {
    const board = ['', '', 'X', 'O', '', '', '', '', ''];
    const moves = generatePossibleMoves(board, 'X');

    expect(moves).toEqual([
      { position: 0, symbol: 'X' },
      { position: 1, symbol: 'X' },
      { position: 4, symbol: 'X' },
      { position: 5, symbol: 'X' },
      { position: 6, symbol: 'X' },
      { position: 7, symbol: 'X' },
      { position: 8, symbol: 'X' }
    ]);
  });

  it('returns empty array if no empty cells', () => {
    const board = ['O', 'X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];
    const moves = generatePossibleMoves(board, 'X');

    expect(moves).toEqual([]);
  });
});

describe('boardsAreEqual', () => {
  it('returns true if boards are identical', () => {
    const board1 = ['X', 'O', 'X', 'O', 'X', '', '', '', ''];
    const board2 = ['X', 'O', 'X', 'O', 'X', '', '', '', ''];

    expect(boardsAreEqual(board1, board2)).toBe(true);
  });

  it('returns false if boards differ', () => {
    const board1 = ['X', 'O', 'X', 'O', 'X', '', '', '', ''];
    const board2 = ['X', 'O', 'X', 'O', 'O', '', '', '', ''];

    expect(boardsAreEqual(board1, board2)).toBe(false);
  });
});

describe('findBoardDiffs', () => {
  it('returns array of differences between boards', () => {
    const board1 = ['X', '', 'O', 'X', 'O', '', '', '', ''];
    const board2 = ['X', 'O', 'O', 'X', 'O', '', '', '', ''];

    const diffs = findBoardDiffs(board1, board2);

    expect(diffs).toEqual([
      {
        position: 1,
        symbol1: '',
        symbol2: 'O'
      }
    ]);
  });

  it('returns empty array if boards are identical', () => {
    const board1 = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    const board2 = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

    const diffs = findBoardDiffs(board1, board2);

    expect(diffs).toEqual([]);
  });
});

describe('generatePossibleBoards', () => {
  it('generates all possible boards for X and O', () => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const symbols = ['X', 'O'];
    const possibleBoards = generatePossibleBoards(board, symbols);

    expect(possibleBoards).toHaveLength(36);
  });
  it('does not duplicate identical boards', () => {
    const board = ['X', '', '', '', '', '', '', '', ''];
    const symbols = ['O'];
    const possibleBoards = generatePossibleBoards(board, symbols);

    possibleBoards.forEach((possibleBoard) => {
      expect(
        possibleBoards.filter((otherBoard) => boardsAreEqual(possibleBoard, otherBoard))
          .length
      ).toBe(1);
    });
  });

  it('generates one board when only one move is possible', () => {
    const board = ['X', 'O', 'X', 'X', 'O', '', 'O', 'X', 'O'];
    const symbols = ['X', 'O'];
    const possibleBoards = generatePossibleBoards(board, symbols);

    expect(possibleBoards).toHaveLength(1);
  });

  it('Return the same board if no moves are possible', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'O'];
    const symbols = ['X', 'O'];
    const possibleBoards = generatePossibleBoards(board, symbols);

    expect(possibleBoards).toHaveLength(1);
    expect(possibleBoards[0]).toEqual(board);
  });
});

describe('getEmptyCells', () => {
  it('returns indexes of empty cells', () => {
    const board = ['', 'X', 'O', '', 'X', 'O', '', '', ''];
    const emptyCells = getEmptyCells(board);
    expect(emptyCells).toEqual([0, 3, 6, 7, 8]);
  });

  it('returns empty array if no empty cells', () => {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    const emptyCells = getEmptyCells(board);
    expect(emptyCells).toEqual([]);
  });
});

describe('minimax', () => {
  it('returns the optimal move for X on an empty board', () => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const { move } = minimax({
      board,
      depth: 4,
      symbol: 'X',
      symbols: ['X', 'O']
    });

    expect(move).toEqual({
      position: 0,
      symbol: 'X'
    });
  });

  it('returns the optimal move for O when X has taken the center', () => {
    const board = ['', '', '', '', 'X', '', '', '', ''];
    const { move } = minimax({
      board,
      depth: 4,
      symbol: 'O',
      symbols: ['X', 'O']
    });

    expect(move).toEqual({
      position: 1,
      symbol: 'O' 
    });
  });

    it('detects a winning move and takes it', () => {
    const board = ['O', 'X', 'O', '', '', '', 'X', '', ''];
    const { move } = minimax({
      board,
      depth: 4,
      symbol: 'X',
      symbols: ['X', 'O']
    });

    expect(move).toEqual({
      position: 7,  
      symbol: 'X'
    });
  });

  it("blocks opponent's winning move", () => {
    const board = ['X', 'O', '', '', 'O', '', '', '', 'X'];
    const { move } = minimax({
      board,
      depth: 4,
      symbol: 'X',
      symbols: ['X', 'O']
    });

    expect(move).toEqual({
      position: 2,
      symbol: 'X'
    });
  });

  it('evaluates future moves to a specified depth', () => {
    const board = ['X', '', 'O', '', '', '', '', '', ''];
    const { move } = minimax({
      board,
      depth: 3,
      symbol: 'X',
      symbols: ['X', 'O']
    });

    expect(move).toEqual({
      position: 4,
      symbol: 'X'
    });
  });
});
