export { calculateWinner, getLocation }

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getLocation(square) {
  const posObj = {
    0: 'row 1, column 1',
    1: 'row 1, column 2',
    2: 'row 1, column 3',
    3: 'row 2, column 1',
    4: 'row 2, column 2',
    5: 'row 2, column 3',
    6: 'row 3, column 1',
    7: 'row 3, column 2',
    8: 'row 3, column 3',
  }

  return posObj[square];
}
