import { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPlay, faStop, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

type BreakProps = {
  _break: number;
  setBreak: (_break: number) => void;
}

function Break({_break, setBreak}: BreakProps) {
  return (
    <div id="break">
      <label id="break-label" htmlFor="break">Break Length</label>
      <button id="break-decrement" type="button">
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
      <div id="break-length">{_break}</div>
      <button id="break-increment">
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  )
}

type SessionProps = {
  session: number;
  setSession: (session: number) => void;
}

function Session({session, setSession}: SessionProps) {
  return (
    <div id="session">
      <label id="session-label" htmlFor="break">Break Length</label>
      <button id="session-decrement">
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
      <div id="session-length">{session}</div>
      <button id="session-increment">
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  )
}

type TimerProps = {
  _break: number;
  session: number;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function Timer({_break, session, isActive, setIsActive}: TimerProps) {
  const switchActive = () => {
    setIsActive((prev) => !prev)
  }

  return (
    <div id="timer">
      <label id="timer-label" htmlFor="">Session</label>
      <div id="time-left" >25:00</div>
      <button id="start_stop" onClick={switchActive}>
        {isActive
          ? <FontAwesomeIcon icon={faStop} />
          : <FontAwesomeIcon icon={faPlay} />}
      </button>
      <button id="reset">
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
    </div>
  )
}

function App() {
  const [session, setSession] = useState(25);
  const [_break, setBreak] = useState(5);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div id="title">25 + 5 Clock</div>
      <Break _break={_break} setBreak={setBreak}></Break>
      <Session session={session} setSession={setSession}></Session>
      <Timer _break={_break} session={session} isActive={isActive} setIsActive={setIsActive}></Timer>
      <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </>
  )
}

export default App;
