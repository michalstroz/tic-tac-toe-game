import React from 'react';
import Square from './square';

class Board extends React.Component {

  highlightSquares(index) {
    const arr = this.props.win;
    return arr && arr.indexOf(index) !== -1;
  }

  renderSquare(i) {
    return (<Square key={i} win={this.highlightSquares(i)} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>);
  }

  renderBoard(row, column) {
    const board = [];
    let cellNumber = 0;

    for (let i = 0; i < row; i++) {
      const cells = [];

      for (let j = 0; j < column; j++) {
        cells.push(this.renderSquare(cellNumber));
        cellNumber++;
      }
      board.push(<div key={i} className="board-row">{cells}</div>);
    }
    return board;
  }

  render() {

    return (<div>{this.renderBoard(3, 3)}</div>);
  }
}

export default Board;
