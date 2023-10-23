function NextButton({ dispatch, Answer, Index, NumQuestions }) {
  if (Answer === null) return;
  const IsFinished = Index < NumQuestions - 1;
  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: IsFinished ? "NextQuestion" : "Finished",
          })
        }
      >
        {IsFinished ? "Next" : "Finish"}
      </button>
    </div>
  );
}

export default NextButton;
