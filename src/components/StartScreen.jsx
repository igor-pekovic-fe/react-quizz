import "./StartScreen.css";

function Start(props) {
  return (
    <div className="startscreen--container">
      <h1 className="startscreen--title">Quizzical</h1>
      <p className="startscreen--subtitle">Test your trivia skills!</p>
      <button className="startscreen--button button" onClick={props.startQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default Start;
