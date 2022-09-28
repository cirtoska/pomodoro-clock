import React, { useEffect, useRef } from "react";
import { FaPlay, FaRedo, FaPause } from "react-icons/fa";
import { useStateValue } from "../contexts/stateProvider";
import { actionTypes } from "../reducer";
import { useClock } from "../hooks/useClock";

const Controls = () => {
  const [
    {
      projectName,
      timerValue,
      breakValue,
      sessionValue,
      timerLabel,
      busyIndicator,
    },
  ] = useStateValue();
  const [state, dispatch] = useStateValue();

  const clockValue = useClock();
  const beepSound = "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3";
  const audioSoundRef = useRef();

  const handleReset = () => {
    dispatch({
      ...state,
      type: actionTypes.RESET_TIMERS,
    });
    audioSoundRef.current.pause();
    audioSoundRef.current.time = 0;
  };

  const handlePlayPause = () => {
    dispatch({
      ...state,
      type: actionTypes.TOGGLE_ISBUSY_INDICATOR,
      busyIndicator: !state.busyIndicator,
    });
  };

  const handleCount = () => {
    dispatch({
      ...state,
      type: actionTypes.START_TIMER,
      timerValue: timerValue - 1,
    });
    if (timerValue === 0) audioSoundRef.current.play();
    if (timerValue < 0) {
      if (timerLabel === "Session") {
        dispatch({
          ...state,
          type: actionTypes.TOGGLE_TIMER_LABEL,
          timerLabel: "Break",
        });
        dispatch({
          ...state,
          type: actionTypes.START_TIMER,
          timerValue: breakValue * 60 - 1,
        });
      } else {
        dispatch({
          ...state,
          type: actionTypes.TOGGLE_TIMER_LABEL,
          timerLabel: "Session",
        });
        dispatch({
          ...state,
          type: actionTypes.START_TIMER,
          timerValue: sessionValue * 60 - 1,
        });
      }
    }
  };

  useEffect(() => {
    if (busyIndicator) {
      let timerInterval = setInterval(() => {
        handleCount();
        document.title = `[${timerLabel}] - ${clockValue}`;
      }, 1000);
      return () => clearInterval(timerInterval);
    } else document.title = projectName;
  });

  return (
    <div className="controls">
      <button type="button" id="start-stop" onClick={handlePlayPause}>
        {!busyIndicator ? <FaPlay /> : <FaPause />}
      </button>
      <button type="button" id="reset" onClick={handleReset}>
        <FaRedo />
      </button>
      <audio id="beep" src={beepSound} ref={audioSoundRef} preload="auto" />
    </div>
  );
};

export default Controls;
