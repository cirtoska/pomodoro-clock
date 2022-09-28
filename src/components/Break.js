import React from "react";
import { useStateValue } from "../contexts/stateProvider";
import { actionTypes } from "../reducer";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const Break = () => {
  const [{ breakValue, busyIndicator }] = useStateValue();
  const [state, dispatch] = useStateValue();

  const handleDecrement = () => {
    dispatch({
      ...state,
      type: actionTypes.DECREASE_BREAK_VALUE,
      breakValue: breakValue - 1,
    });
  };
  const handleIncrement = () => {
    dispatch({
      ...state,
      type: actionTypes.INCREASE_BREAK_VALUE,
      breakValue: breakValue + 1,
    });
  };

  return (
    <div className="break">
      <span id="break-label">Break Length</span>
      <div className="session-controls">
        <button
          type="button"
          id="break-decrement"
          className="btn"
          onClick={handleDecrement}
          disabled={busyIndicator || breakValue <= 1}
        >
          <FaMinusCircle />
        </button>
        <p id="break-length">{breakValue}</p>
        <button
          type="button"
          id="break-increment"
          className="btn"
          onClick={handleIncrement}
          disabled={busyIndicator || breakValue > 59}
        >
          <FaPlusCircle />
        </button>
      </div>
    </div>
  );
};

export default Break;
