import React from 'react';
import up from '../assets/up-svgrepo-com.svg';
import down from '../assets/down-svgrepo-com.svg';

const Timers = props => {
  //   const id = props.title.toLowerCase();
  //   console.log(id);
  return (
    <div className="timer-container">
      <h2 id={`${props.id}-label`}>{props.title}</h2>
      <div className="btn-container">
        <button
          id={`${props.id}-increment`}
          onClick={props.handleIncrease}
          className="btn-up"
        >
          <img className="btn-up" src={up} alt="up" />
        </button>
        <span id={`${props.id}-length`} className="timer-number">
          {props.count}
        </span>
        <button
          id={`${props.id}-decrement`}
          onClick={props.handleDecrease}
          className="btn-down"
        >
          <img className="btn-down" src={down} alt="down" />
        </button>
      </div>
    </div>
  );
};

export default Timers;
