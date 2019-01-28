import React from 'react';
import Board from './board';
import {calculateWinner, getLocation} from './functions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          location: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      order: true
    };
    this.sortMoves = this.sortMoves.bind(this);
  }

  sortMoves() {
    this.setState({
      order: !this.state.order
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext
      ? 'X'
      : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
          location: getLocation(i)
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move
        ? 'Go to move #' + move
        : 'Go to game start';

      const currLoc = step.location
        ? step.location
        : "";

      let buttonClass = move === this.state.stepNumber
        ? 'boldLastMove'
        : '';

      return (<li key={move}>
        <button className={buttonClass} onClick={() => this.jumpTo(move)}>{desc + " " + currLoc}</button>
      </li>);
    });

    let sortInfo = "DESC";
    if (!this.state.order) {
      moves.reverse();
      sortInfo = "ASC";
    }
    console.log(this.state.stepNumber)
    let status;
    if (winner.winner) {
      status = "Winner: " + winner.winner;
    } else if (this.state.stepNumber === 9) {
      status = "Nobody has won";
    } else {
      status = 'Next player: ' + (
        this.state.xIsNext
        ? 'X'
        : 'O');
    }

    return (<div className="game">
      <div className="game-board">
        <Board squares={current.squares} win={winner && winner.line} onClick={(i) => this.handleClick(i)}/>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button className="sort-button" onClick={this.sortMoves}>{sortInfo}</button>
        <ol>{moves}</ol>
      </div>
    </div>);
  }
}

export default Game;
