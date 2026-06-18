import { useState } from "react";
import { questions } from "./questions";
import Result from "./Result";
import Question from "./Question.jsx";
import "./Quiz.css";

function QuizApp() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const currentQuestion = questions[currentIndex];

    const handleSelectAnswer = (index) => {
        setSelectedAnswer(index);
    };

    // Chuyển câu tiếp theo
    const handleSubmit = () => {
        // Kiểm tra đáp án
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore((prev) => prev + 1);
        }

        // Kiểm tra nếu chưa phải câu cuối thì chuyển sang câu tiếp theo
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedAnswer(null); // reset chọn đáp án
        } else {
            setIsFinished(true);
        }
    };

    const handleReplay = () => {
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setIsFinished(false);
    };

    if (isFinished) {
        return (
            <div className="quiz-container">
                <Result score={score} total={questions.length} onReplay={handleReplay} />
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <h1 className="quiz-title">Quiz App</h1>
            <p className="quiz-info">
                Câu {currentIndex + 1} / {questions.length} — Điểm: {score}
            </p>
            <Question
                question={currentQuestion.question}
                options={currentQuestion.options}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={handleSelectAnswer}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default QuizApp;
