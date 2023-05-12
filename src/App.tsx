import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <label id="break-label" htmlFor="">Break Length</label>
      <label id="session-label" htmlFor="">Session Length</label>
      <input id="break-increment" type="button" value="" />
      <input id="break-decrement" type="button" value="" />
      <input id="session-increment" type="button" value="" />
      <input id="session-decrement" type="button" value="" />
      <div id="break-length" >5</div>
      <div id="session-length" >25</div>
      <label id="timer-label" htmlFor="">Session</label>
      <div id="time-left" ></div>
      <input id="start_stop" type="button" />
      <input id="reset" type="button" />
    </>
  )
}

export default App
