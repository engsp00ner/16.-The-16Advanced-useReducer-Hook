import { useEffect, useReducer } from "react";
import "../App.css";
import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
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

  //in order to be able to track the current question
  //we need to keep track of the index
  Index: 0,

  //this will be the correct answer to the question 
  Answer :null,
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
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
      case "NewAnswer":
        return{
          ...state ,
          Answer:action.payload,
        };
    default:
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const { Questions, status, Index ,Answer} = state;
  const NumQuestions = Questions.length;
  useEffect(function () {
    async function GetQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) {
          dispatch({ type: "DataFailed" });
          throw new Error("Something went wrong can`t load data ");
        }
        console.log(res);
        console.log(`First status After Fetch is :${status}`);
        const data = await res.json();
        //1-DataReceived
        dispatch({ type: "DataReceived", payload: data });
        console.log(data);
      } catch (err) {
        //2-DataFailed
        dispatch({ type: "DataFailed" });
        console.log(err);
        console.log(`Current status is ${status}`);
      } finally {
        console.log(`Final state Is ${status}`);
      }
    }
    GetQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen NumQuestions={NumQuestions} dispatch={dispatch} />
        )}
        {status === "active" && <Question question={Questions[Index]} dispatch={dispatch} Answer={Answer} />}
      </Main>
    </div>
  );
}
