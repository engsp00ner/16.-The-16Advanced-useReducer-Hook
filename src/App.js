import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./Header";
import Main from "./main";

const InitialState = {
  Questions: [],

  //initially will be in loading
  //state other than  that It will be in the following states
  //1-'loading' while the data is being fetched
  //2-'error' if something went wrong while loading the data
  //3-'ready' data is being fetched and ready for implementing
  //4-'active' data is displayed for the user
  //5-'finished' the questions are answered
  Status: "Loading",
};
function reducer(state, action) {
  switch (action.type) {
    case "DataReceived":
      return {
        ...state,
        Questions: action.payload,
        status: "ready",
      };
    case "DataFailed":
      return{
        ...state , status:"error",
      };
    default:
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);
  useEffect(
    function () {
      async function GetQuestions() {
        try {
          const res = await fetch("http://localhost:8000/questions");
          console.log(res);
          if (!res.ok) throw new Error("Something went wrong can`t load data ");
          const data = await res.json();
          //1-DataReceived
          dispatch({ type: "DataReceived", payload: data });
          console.log(data);
        } catch (err) {
          //2-DataFailed
          dispatch({ type: "DataFailed " });
          console.log(err);
        } finally {
        }
      }
      GetQuestions();
    },
    [dispatch]
  );

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Questions?</p>
      </Main>
    </div>
  );
}
