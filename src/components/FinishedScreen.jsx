function FinishedScreen({ Points, MaxPossiblePoints, HighScore }) {
  const Percentage = (Points / MaxPossiblePoints) * 100;
  let emoji;
  if (Percentage === 100) emoji = "🎖️";
  if (Percentage >= 80 && Percentage < 100) emoji = "🥳";
  if (Percentage >= 50 && Percentage < 80) emoji = "💃";
  if (Percentage >= 0 && Percentage < 50) emoji = "😒";
  if (Percentage === 0) emoji = "🥲";

  return (
    <div>
      <p className="result">
        {emoji}
        You Scored <strong>{Points}</strong> out of {MaxPossiblePoints}(
        {Math.ceil(Percentage)}%)
      </p>
      <p className="hifhscore">(HighScore : {HighScore} Points)</p>
      <button className="btn btn-ui">Restart quiz</button>
    </div>
  );
}

export default FinishedScreen;
