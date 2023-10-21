import { useReducer } from "react";


//this is the initial state as an obj of {Count , Step}
const InitialState = { count: 0, step: 1 };
function reducer(state, action) {
  console.log(state, action);

  //if we only do one action
  //  return state + action;

  // return { count: 0, state: 1 };
  //in case of multible actions
  switch (action.type) {
    case "dec":
      //as the state her is an obj not only single value so we used the following formate
      //to increment we get the obj of the variable state ...state=>{ count, step }
      //  then we modify the required value
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "SetCount":
      return { ...state, count: action.payload };
    case "SetStep":
      return { ...state, step: action.payload };
      case "Reset":
        return InitialState;
    default:
      throw new Error("UnKnowen Action !");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  //this is reducer hook which uses a(fun , initial state )
  // const [step, setStep] = useState(1);

  
  //we add state using the initial state and the dispatcher using reducer t
  const [state, dispatch] = useReducer(reducer, InitialState);
  //we set the state to the basic values of it {Count , Step }=state
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    //  setCount((count) => count - step);

    //we directely sent the value of the action to the reducer
    // dispatch(-1);

    //so we need to send action and the value
    dispatch({ type: "dec" });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    //setCount((count) => count + step);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    //setCount(Number(e.target.value));
    dispatch({ type: "SetCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "SetStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({type:"Reset"});
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
