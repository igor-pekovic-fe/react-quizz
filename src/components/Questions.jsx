import "./Questions.css";

function Questions(props) {
  function styler(option, index) {
    if (props.showAnswers) {
      if (props.question.correct_answer === option) {
        return {
          backgroundColor: "var(--answer-correct-color)",
          color: "var(--secondary-accent-color)",
          outline: "none",
        };
      } else if (props.question.selected_answer === index) {
        return {
          backgroundColor: "var(--answer-incorrect-color)",
          outline: "none",
        };
      } else {
        return {
          backgroundColor: "var(--main-neutral-color)",
          outline: "1px solid #70768f",
        };
      }
    } else {
      return props.question.selected_answer === index
        ? { backgroundColor: "#D6DBF5", outline: "none" }
        : { backgroundColor: "var(--main-neutral-color)" };
    }
  }

  const answers = props.question.options.map((option, index) => (
    <button
      key={index}
      dangerouslySetInnerHTML={{ __html: option }}
      onClick={(event) => props.selectAnswer(event, props.id, index)}
      style={styler(option, index)}
      disabled={props.showAnswers}
      className="quizcard--answer"
    />
  ));

  return (
    <div className="quizcard--container">
      <p
        className="quizcard--question"
        dangerouslySetInnerHTML={{ __html: props.question.question }}
      />
      <div>{answers}</div>
      <hr className="quizcard--divider" />
    </div>
  );
}

export default Questions;
