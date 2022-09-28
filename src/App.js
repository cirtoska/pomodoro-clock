import React from "react";
import { useStateValue } from "./contexts/stateProvider";
import { useClock } from "./hooks/useClock";
import Break from "./components/Break";
import Session from "./components/Session";
import Controls from "./components/Controls";
import logo from "./files/pomodoro.png";
import Footer from "./components/Footer";

function App() {
  const [{ projectName, timerLabel }] = useStateValue();
  const clockValue = useClock();

  return (
    <main>
      <div className="timer">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1 className="title">{projectName}</h1>
        </div>
        <div className="main-clock">
          <h3 id="timer-label">{timerLabel}</h3>
          <h1 id="time-left">{clockValue}</h1>
        </div>
        <Controls />
        <div className="timer-controllers">
          <Break />
          <Session />
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default App;
