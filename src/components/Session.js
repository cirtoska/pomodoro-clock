import React from "react";
import { useStateValue } from "../contexts/stateProvider";
import { actionTypes } from "../reducer";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const Session = () => {
  const [{ sessionValue, busyIndicator }] = useStateValue();
  const [state, dispatch] = useStateValue();

  const handleDecrement = () => {
    dispatch({
      ...state,
      type: actionTypes.DECREASE_SESSION_VALUE,
      sessionValue: sessionValue - 1,
      timerValue: (sessionValue - 1) * 60,
    });
  };
  const handleIncrement = () => {
    dispatch({
      ...state,
      type: actionTypes.INCREASE_SESSION_VALUE,
      sessionValue: sessionValue + 1,
      timerValue: (sessionValue + 1) * 60,
    });
  };

  return (
    <div className="session">
      <span id="session-label">Session Length</span>
      <div className="session-controls">
        <button
          type="button"
          id="session-decrement"
          className="btn"
          onClick={handleDecrement}
          disabled={busyIndicator || sessionValue <= 1}
        >
          <FaMinusCircle />
        </button>
        <p id="session-length">{sessionValue}</p>
        <button
          type="button"
          id="session-increment"
          className="btn"
          onClick={handleIncrement}
          disabled={busyIndicator || sessionValue > 59}
        >
          <FaPlusCircle />
        </button>
      </div>
    </div>
  );
};

export default Session;
