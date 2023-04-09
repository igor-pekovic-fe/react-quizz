import "./StartScreen.css";

function Start({ startQuiz }) {
  return (
    <div className="startscreen--container">
      <h1 className="startscreen--title">Quizzical</h1>
      <p className="startscreen--subtitle">Test your trivia skills!</p>
      <button className="startscreen--button button" onClick={startQuiz}>
        Start Quiz
      </button>
      <form id="test-form">
        <input
          type="text"
          id="test"
          placeholder="Default is 5"
          name="numberOfQuestions"
          onChange={props.setNrQuestions}
        />
      </form>
    </div>
  );
}

export default Start;
