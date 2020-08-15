import React from 'react';

function PlayAgainComponent(props) {
  return (
    <div className="bordered-box">
      <h2 style={{color: props.gameStatus === 'won'?"green":"red"}}>
        {props.gameStatus === 'won' ? 'Nice!' : 'Game Over!'}
      </h2>
      <button onClick={() => props.onClick()}>
        Play Again
      </button>
    </div>
  );
}

export default PlayAgainComponent;