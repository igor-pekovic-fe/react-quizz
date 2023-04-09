import "./Difficulty.css";

function Difficulty(props) {
  const diffBtns = props.difficulties.map((difficulty) => {
    return (
      <button
        onClick={() => props.setDifficulty(difficulty.htmlstring)}
        className="button button-diff"
        key={difficulty.value}
      >
        {difficulty.difficulty}
      </button>
    );
  });

  return (
    <div className="difficulty--wrapper">
      {/* Sort by difficulty, each difficulty 
        has a value from 1 to 4*/}
      {diffBtns.sort((a, b) => a.value - b.value)}
    </div>
  );
}

export default Difficulty;
