import './App.css';
import React, { Component } from 'react';
import Timers from './components/Timers';
import Clock from './components/Clock';

const audio = document.getElementById('beep');

export class App extends Component {
  constructor(props) {
    super(props);
    this.loop = undefined;
  }
  state = {
    breakCount: 5,
    sessionCount: 25,
    clockTimer: 25 * 60,
    currentTimer: 'Session',
    isPlaying: false,
  };

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  handleTimerPlayPause = () => {
    const { isPlaying } = this.state;

    if (isPlaying) {
      clearInterval(this.loop);
      this.setState({ isPlaying: false });
    } else {
      this.setState({ isPlaying: true });
      this.loop = setInterval(() => {
        const { clockTimer, currentTimer, breakCount, sessionCount } =
          this.state;

        if (clockTimer === 0) {
          this.setState({
            currentTimer: currentTimer === 'Session' ? 'Break' : 'Session',
            clockTimer:
              currentTimer === 'Session' ? breakCount * 60 : sessionCount * 60,
          });
          audio.play();
        } else {
          this.setState({ clockTimer: clockTimer - 1 });
        }
      }, 1000);
    }
  };

  handleRestart = () => {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockTimer: 25 * 60,
      currentTimer: 'Session',
      isPlaying: false,
    });
    clearInterval(this.loop);

    audio.pause();
    audio.currentTime = 0;
  };

  handleBreakDecrease = () => {
    const { breakCount } = this.state;
    if (breakCount >= 2) {
      this.setState({
        breakCount: breakCount - 1,
      });
    }
  };
  handleBreakIncrease = () => {
    const { breakCount } = this.state;
    if (breakCount < 60) {
      this.setState({
        breakCount: breakCount + 1,
      });
    }
  };
  handleSessionDecrease = () => {
    const { sessionCount } = this.state;
    if (sessionCount >= 2) {
      this.setState({
        clockTimer: (sessionCount - 1) * 60,
        sessionCount: sessionCount - 1,
      });
    }
  };
  handleSessionIncrease = () => {
    const { sessionCount } = this.state;
    if (sessionCount < 60) {
      this.setState({
        clockTimer: (sessionCount + 1) * 60,
        sessionCount: sessionCount + 1,
      });
    }
  };

  render() {
    const { breakCount, sessionCount, clockTimer, currentTimer, isPlaying } =
      this.state;

    const breakProps = {
      id: 'break',
      title: 'Break Length',
      count: breakCount,
      handleIncrease: this.handleBreakIncrease,
      handleDecrease: this.handleBreakDecrease,
    };

    const sessionProps = {
      id: 'session',
      title: 'Session Length',
      count: sessionCount,
      handleIncrease: this.handleSessionIncrease,
      handleDecrease: this.handleSessionDecrease,
    };

    const clockProps = {
      session: currentTimer,
      clockTimer: clockTimer,
      handlePlayPause: this.handleTimerPlayPause,
      handleReset: this.handleRestart,
      currentTimer: currentTimer,
      isPlaying: isPlaying,
    };

    return (
      <div className="app">
        <div className="timer-comp">
          <Timers {...breakProps} />
          <Timers {...sessionProps} />
        </div>
        <Clock {...clockProps} />
      </div>
    );
  }
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <div>
//         <Timers />
//         <Timers />
//       </div>
//       <div>CLOCK</div>
//     </div>
//   );
// }

// export default App;
