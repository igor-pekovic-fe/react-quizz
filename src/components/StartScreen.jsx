import "./StartScreen.css";

function Start({ startQuiz }) {
  return (
    <div className="startscreen--container">
      <h1 className="startscreen--title">QuizWizz</h1>
      <p className="startscreen--subtitle">Test your trivia skills!</p>
      <button className="startscreen--button button" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default Start;
