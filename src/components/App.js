import { useEffect, useReducer } from "react";
import "../App.css";
import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
const InitialState = {
  Questions: [],

  //initially will be in loading
  //state other than  that It will be in the following states
  //1-'loading' while the data is being fetched
  //2-'error' if something went wrong while loading the data
  //3-'ready' data is being fetched and ready for implementing
  //4-'active' data is displayed for the user
  //5-'finished' the questions are answered
  //6-'reset' in order to re-start the quiz
  Status: "Loading",

  //in order to be able to track the current question
  //we need to keep track of the index
  Index: 0,

  //this will be the correct answer to the question
  Answer: null,

  //this will define the user score,
  //will be updated with each correct answer
  Points: 0,
  HighScore: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "DataReceived":
      return {
        ...state,
        Questions: action.payload,
        Status: "ready",
      };
    case "DataFailed":
      return {
        ...state,
        Status: "error",
      };
    case "start":
      return {
        ...state,
        Status: "active",
      };
    case "NewAnswer":
      //we will grap the current question
      const question = state.Questions.at(state.Index);
      return {
        ...state,
        Answer: action.payload,

        Points:
          action.payload === question.correctOption
            ? state.Points + question.points
            : state.Points,
      };
    case "NextQuestion":
      return {
        ...state,
        Index: state.Index + 1,
        Answer: null,
      };
    case "Finished":
      return {
        ...state,
        Status: "Finished",
        HighScore:
          state.Points > state.HighScore ? state.points : state.HighScore,
      };
    case "Reset":
      return {
        ...InitialState,
        Status: "ready",
        Questions: state.Questions,
      };
    default:
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const { Questions, Status, Index, Answer, Points, HighScore } = state;
  const NumQuestions = Questions.length;
  const MaxPossiblePoints = Questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(function () {
    async function GetQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) {
          dispatch({ type: "DataFailed" });
          throw new Error("Something went wrong can`t load data ");
        }
        const data = await res.json();
        //1-DataReceived
        dispatch({ type: "DataReceived", payload: data });
      } catch (err) {
        //2-DataFailed
        dispatch({ type: "DataFailed" });
        console.log(err);
      } finally {
      }
    }
    GetQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {Status === "Loading" && <Loader />}
        {Status === "error" && <Error />}
        {Status === "ready" && (
          <StartScreen NumQuestions={NumQuestions} dispatch={dispatch} />
        )}
        {Status === "active" && (
          <>
            <Progress
              Index={Index}
              NumQuestions={NumQuestions}
              Points={Points}
              MaxPossiblePoints={MaxPossiblePoints}
              Answer={Answer}
            />
            <Question
              question={Questions[Index]}
              dispatch={dispatch}
              Answer={Answer}
            />
            <NextButton
              dispatch={dispatch}
              Answer={Answer}
              Index={Index}
              NumQuestions={NumQuestions}
            />
          </>
        )}
        {Status === "Finished" && (
          <FinishedScreen
            Points={Points}
            MaxPossiblePoints={MaxPossiblePoints}
            HighScore={HighScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
