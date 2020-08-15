import React from 'react';
import utils from '../utils';

function StarComponent(props) {
  return (
    <div className="bordered-box">
      {utils.range(1, props.count).map(starId => (
        <div className="star" key={starId}></div>
      ))}
    </div>
  );
}

export default StarComponent;