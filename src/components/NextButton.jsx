function NextButton({ dispatch, Answer }) {
  if (Answer === null) return;
  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "NextQuestion" })}
      >
        Next
      </button>
    </div>
  );
}

export default NextButton;
