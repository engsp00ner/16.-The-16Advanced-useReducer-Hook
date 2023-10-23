import React from "react";
import Options from "./options";
export default function Question({ question, dispatch, Answer }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} Answer={Answer} />
    </div>
  );
}
