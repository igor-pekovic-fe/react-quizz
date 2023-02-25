import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import "./App.css";

function App() {
  // State for storing questions and answers from api
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [allComplete, setAllComplete] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  function startQuiz() {
    setIsQuizStarted(true);
  }

  function playAgain() {
    setIsQuizStarted((prevState) => !prevState);
    setShowAnswers(false);
    setAllComplete(false);
    setScore(0);
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

  function goBack() {
    setQuestions([]);
    playAgain();
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
    if (isQuizStarted === true || questions.length > 0) {
      async function getQuestions() {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=5&type=multiple`
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
  }, [isQuizStarted]);

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
        <StartScreen startQuiz={startQuiz} />
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
            <button
              className="button"
              disabled={!allComplete}
              onClick={checkAnswers}
              data-type={allComplete || "inverted"}
            >
              Check Answers
            </button>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
