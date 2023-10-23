function Progress({ Index, NumQuestions, Points, MaxPossiblePoints, Answer }) {
  console.log(`points are ${Points}`);
  return (
    <header className="progress">
      <progress
        max={NumQuestions}
        value={Index + Number(Answer !== null)}
      ></progress>

      <p>
        Question
        <strong>
          :{Index + 1}/{NumQuestions}
        </strong>{" "}
      </p>
      <p>
        <strong>
          {Points}/{MaxPossiblePoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
