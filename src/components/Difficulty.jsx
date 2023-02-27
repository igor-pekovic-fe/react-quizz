import "./Difficulty.css";

function Difficulty(props) {
  const diffBtns = props.difficulties.map((difficulty) => {
    return (
      <button
        onClick={() => props.setDifficulty(difficulty.htmlstring)}
        className="button button-diff"
      >
        {difficulty.difficulty}
      </button>
    );
  });

  console.log(diffBtns);

  return <div className="difficulty--wrapper">{diffBtns}</div>;
}

export default Difficulty;
