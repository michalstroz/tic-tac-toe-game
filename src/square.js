import React from 'react';

function Square(props) {
  let setColor = props.win
    ? 'winner-squares'
    : ''
  return (<button className={`square ${setColor}`} onClick={props.onClick}>{props.value}</button>);
}

export default Square;
