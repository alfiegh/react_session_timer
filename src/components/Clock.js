import React from 'react';
import playbtn from '../assets/iconmonstr-video-15(1).svg';
import reset from '../assets/power-cycle-svgrepo-com.svg';
import pause from '../assets/iconmonstr-media-control-49.svg';

const Clock = props => {
  const convertToTime = count => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="clock-component">
      <div className="session-time">
        <h1 id="timer-label">{props.session}</h1>
        <span id="time-left" className="session-set-timer">
          {convertToTime(props.clockTimer)}
        </span>
      </div>
      <div className="clock-btn-container">
        <button
          id="start_stop"
          onClick={props.handlePlayPause}
          className="btn-play"
        >
          <img
            className="btn-play"
            src={props.isPlaying ? pause : playbtn}
            alt="play"
          />
        </button>
        <button id="reset" onClick={props.handleReset} className="btn-reset">
          <img className="btn-reset" src={reset} alt="reset" />
        </button>
      </div>
    </div>
  );
};

export default Clock;
