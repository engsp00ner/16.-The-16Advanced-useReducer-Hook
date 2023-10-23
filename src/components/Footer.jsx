import NextButton from "./NextButton";
import Timer from "./Timer";
function Footer({ dispatch, Answer, Index, NumQuestions, SecondsRemaning }) {
  return (
    <footer>
      <Timer dispatch={dispatch} SecondsRemaning={SecondsRemaning} />
      <NextButton
        dispatch={dispatch}
        Answer={Answer}
        Index={Index}
        NumQuestions={NumQuestions}
      />
    </footer>
  );
}

export default Footer;
