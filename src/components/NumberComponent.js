import React from 'react';
import utils from '../utils';

function NumberComponent (props) {
  const colors = {
    available: 'grey',
    used: 'green',
    candidate: 'blue',
    wrong: 'red'
  };
  
  return (
    <button className="number"
            onClick={() => props.onClick(props.num, props.status)} 
            style={{ backgroundColor: colors[props.status]}}>
      {props.num}
    </button>
  );
}

export default NumberComponent;