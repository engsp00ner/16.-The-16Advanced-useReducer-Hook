import { useEffect } from "react";

function Timer({ dispatch, SecondsRemaning }) {
  useEffect(
    function () {
      //set interval repeats certain function
      //every period of time in mille seconds 1 second = 1000 mille seconds
      setInterval(function () {
        dispatch({ type: "Tick" });
      }, 1000);
    },
    [dispatch]
  );
  return <div className="timer">{SecondsRemaning}</div>;
}

export default Timer;
