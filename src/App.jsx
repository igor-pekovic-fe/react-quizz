import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import Difficulty from "./components/Difficulty";
import "./App.css";

function App() {
  // State for keeping track of score
  const [score, setScore] = useState(0);
  // State for storing questions and answers from api
  const [questions, setQuestions] = useState([]);
  // State for keeping track if the quiz is started
  const [startQuiz, setStartQuiz] = useState(false);
  // State for keeping track if all questions have
  // an answer chosen
  const [allComplete, setAllComplete] = useState(false);
  // State for checking if answers should be shown
  // (depends on allComplete state)
  const [showAnswers, setShowAnswers] = useState(false);
  // State for setting difficulty of quiz
  const [difficulty, setDifficulty] = useState("");

  // Array of objects containing HTML strings which is
  // used to set the difficulty of quiz in the API call
  const difficulties = [
    { value: 1, difficulty: "All", htmlstring: "" },
    { value: 2, difficulty: "Easy", htmlstring: "&difficulty=easy" },
    { value: 3, difficulty: "Medium", htmlstring: "&difficulty=medium" },
    { value: 4, difficulty: "Hard", htmlstring: "&difficulty=hard" },
  ];

  // Helper function to toggle startQuiz state
  function beginQuiz() {
    setStartQuiz(true);
  }

  function playAgain() {
    setStartQuiz((prevState) => !prevState);
    setShowAnswers(false);
    setAllComplete(false);
    setScore(0);
  }
  function goBack() {
    setQuestions([]);
    playAgain();
  }

  function checkAnswers() {
    setShowAnswers(true);
  }

  function selectAnswer(event, question_id, answer_id) {
    setQuestions(() => {
      return questions.map((question, questionid) => {
        return question_id === questionid
          ? { ...question, selected_answer: answer_id }
          : question;
      });
    });
  }

  useEffect(() => {
    let count = 0;
    for (const question of questions) {
      if (question.selected_answer !== "") {
        if (
          question.options[question.selected_answer] === question.correct_answer
        )
          count++;
      }
    }
    setScore(count);
  }, [showAnswers]);

  useEffect(() => {
    setAllComplete(
      questions.every((question) => question.selected_answer !== "")
    );
  }, [questions]);

  useEffect(() => {
    if (startQuiz === true || questions.length > 0) {
      async function getQuestions() {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=5${difficulty}&type=multiple`
        );
        const data = await res.json();

        setQuestions(
          data.results.map(function (question) {
            return {
              question: question.question,
              options: [...question.incorrect_answers, question.correct_answer]
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value),
              selected_answer: "",
              correct_answer: question.correct_answer,
            };
          })
        );
      }
      getQuestions();
    }
  }, [startQuiz]);

  const questionElements = questions.map((question, index) => {
    return (
      <Questions
        key={index}
        id={index}
        question={question}
        showAnswers={showAnswers}
        selectAnswer={selectAnswer}
      />
    );
  });

  return (
    <main className="quiz--container">
      {questions.length == 0 ? (
        <div>
          <StartScreen startQuiz={beginQuiz} />
          <Difficulty
            setDifficulty={setDifficulty}
            difficulties={difficulties}
          />
        </div>
      ) : (
        <div>
          <button className="button" onClick={goBack}>
            Go back
          </button>
          {questionElements}
          {showAnswers ? (
            <div className="quiz--score-wrapper">
              <p className="quiz--score">{`You scored ${score}/5 correct answers`}</p>
              <button className="button" onClick={playAgain}>
                Play Again
              </button>
            </div>
          ) : (
            <div className="check-answers-btn">
              <button
                className="button"
                disabled={!allComplete}
                onClick={checkAnswers}
                data-type={allComplete || "inverted"}
              >
                Check Answers
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
