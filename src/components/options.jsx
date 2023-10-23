import React from "react";

export default function options({ question, dispatch, Answer }) {
  const HasAnswered = Answer !== null;
  return (
    <div className="options">
      {/* as in the mapping function for an array 
      (the first element is the array , the second one is the index of that element  ) */}
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option 
          ${index === Answer ? "answer" : ""} 
          ${
            HasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          } `}
          key={option}
          disabled={HasAnswered}
          onClick={() => dispatch({ type: "NewAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
