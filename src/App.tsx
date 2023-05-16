import { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPlay, faArrowsRotate, faPause } from '@fortawesome/free-solid-svg-icons';

type BreakProps = {
  _break: number;
  setBreak: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
}

function Break({_break, setBreak, isActive}: BreakProps) {
  const increment = () => {
    if(_break < 60) setBreak(prev => prev + 1);
  }
  const decrement = () => {
    if(_break > 1) setBreak(prev => prev - 1);
  }

  return (
    <div id="break">
      <label id="break-label" htmlFor="break">Break Length</label>
      <button id="break-decrement" onClick={decrement}>
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
      <div id="break-length">{_break}</div>
      <button id="break-increment" onClick={increment}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  )
}

type SessionProps = {
  session: number;
  setSession: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
}

function Session({session, setSession, isActive}: SessionProps) {
  const increment = () => {
    if(session < 60) setSession(prev => prev + 1)
  }
  const decrement = () => {
    if(session > 1) setSession(prev => prev - 1)
  }
  return (
    <div id="session">
      <label id="session-label" htmlFor="break">Break Length</label>
      <button id="session-decrement" onClick={decrement}>
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
      <div id="session-length">{session}</div>
      <button id="session-increment" onClick={increment}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  )
}

type TimerProps = {
  _break: number;
  setBreak: React.Dispatch<React.SetStateAction<number>>;
  session: number;
  setSession: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function Timer({_break, setBreak, session, setSession, isActive, setIsActive}: TimerProps) {
  const [timer, setTimer] = useState(session * 60);
  
  const switchActive = () => {
    setIsActive((prev) => !prev);
  }

  const reset = () => {
    setBreak(5);
    setSession(25);
    setTimer(session * 60);
    const sound : HTMLAudioElement | null = document.getElementById("beep") as HTMLAudioElement;
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  const padTime = (time: number) => {
    return (new Array(3).join("0") + time.toString()).slice(-2);
  }

  useEffect(() => {
    let interval: number | undefined = undefined;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  return (
    <div id="timer">
      <label id="timer-label" htmlFor="">Session</label>
      <div id="time-left" >
        {padTime(Math.floor(timer / 60)) + ":" + padTime(timer % 60)}
      </div>
      <button id="start_stop" onClick={switchActive}>
        {isActive
          ? <FontAwesomeIcon icon={faPause} />
          : <FontAwesomeIcon icon={faPlay} />}
      </button>
      <button id="reset" onClick={reset}>
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
      <Break _break={_break} setBreak={setBreak} isActive={isActive}></Break>
      <Session session={session} setSession={setSession} isActive={isActive}></Session>
      <Timer _break={_break} setBreak={setBreak} session={session} setSession={setSession} isActive={isActive} setIsActive={setIsActive}></Timer>
    </>
  )
}

export default App;
