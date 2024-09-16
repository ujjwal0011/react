
import { useState, useEffect } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results.map((question) => question.question));
        setOptions(
          data.results.map((question) =>
            [question.correct_answer, ...question.incorrect_answers]
          )
        );
        setCorrectAnswers(
          data.results.map((question) => question.correct_answer)
        );
      });
  }, []);

  const handleChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedAnswer === correctAnswers[currentQuestionIndex]) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer("");
  };

  const currentOptions = options[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">
          Quiz App
        </h1>
        <p className="text-xl mb-4 text-center">
          Score: <span className="font-semibold">{score}</span>
        </p>
        {questions.length > 0 && currentQuestionIndex < questions.length ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              {questions[currentQuestionIndex]}
            </h2>
            {currentOptions.map((option, index) => (
              <div key={index} className="mb-3 flex items-center">
                <input
                  type="radio"
                  id={`option${index}`}
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={handleChange}
                  className="mr-2 w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor={`option${index}`} className="text-lg">
                  {option}
                </label>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="w-full py-2 mt-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        ) : (
          <p className="text-xl text-center mt-4">No more questions</p>
        )}
      </div>
    </div>
  );
}

export default App;
