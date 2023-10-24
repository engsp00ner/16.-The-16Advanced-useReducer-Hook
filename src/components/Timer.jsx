import { useEffect } from "react";

function Timer({ dispatch, SecondsRemaning }) {
  const Mins = Math.floor(SecondsRemaning / 60);
  const Seconds = SecondsRemaning % 60;
  useEffect(
    function () {
      //set interval repeats certain function
      //every period of time in mille seconds 1 second = 1000 mille seconds
      //the function setInterval returns an id so in order to create clean up function we
      //will need to use this id
      const id = setInterval(function () {
        dispatch({ type: "Tick" });
      }, 1000);
      //this is the clean up function "clearInterval"
      //in order to clear the SetInterval Function  after certain action
      //will run while re render
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {Mins < 10 && "0"}
      {Mins}:
      {Seconds < 10 && "0"}
      {Seconds}
    </div>
  );
}

export default Timer;
