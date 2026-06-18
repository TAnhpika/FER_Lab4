import { useQuizContext } from "./QuizContext";

function Question({ onSubmit }) {
    const { selectedAnswer, setSelectedAnswer, currentQuestion, feedback } = useQuizContext();

    if (!currentQuestion) return null;

    const { question, answers } = currentQuestion;

    return (
        <div>
            <h2 className="question-text">{question}</h2>
            <ul className="options-list">
                {answers.map((answer, index) => (
                    <li key={index}>
                        <button className={`option-btn ${selectedAnswer === answer ? "selected" : ""}`} onClick={() => setSelectedAnswer(answer)}>
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>

            {feedback && (
                <p className={`result-text ${feedback.isCorrect ? "feedback-correct" : "feedback-incorrect"}`}>
                    {feedback.message}
                </p>
            )}

            <button className="submit-btn" onClick={onSubmit} disabled={!selectedAnswer || feedback}>
                Kiểm tra đáp án
            </button>
        </div>
    );
}

export default Question;
