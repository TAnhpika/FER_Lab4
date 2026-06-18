import { useState, useEffect } from "react";
import { quizData as initialQuizData } from "./quizData.js";
import { QuizContext } from "./QuizContext.jsx";
import QuestionInput from "./QuestionInput.jsx";
import Question from "./Question.jsx";
import Result from "./Result.jsx";
import "./Quiz.css";

function Quiz() {
    // useState — quản lý toàn bộ state
    const [questions, setQuestions] = useState(initialQuizData);
    const [mode, setMode] = useState("setup"); // "setup" | "play" | "result"
    const [displayQuestions, setDisplayQuestions] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);

    // useEffect — đồng bộ câu hỏi hiển thị từ state khi đang chơi
    useEffect(() => {
        if (mode === "play") {
            setDisplayQuestions(questions);
        }
    }, [mode, questions]);

    const currentQuestion = displayQuestions[currentIndex];

    const handleAddQuestion = (newQuestion) => {
        setQuestions((prev) => [...prev, newQuestion]);
    };

    const handleStartQuiz = () => {
        setDisplayQuestions(questions);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setFeedback(null);
        setScore(0);
        setMode("play");
    };

    const handleSubmit = () => {
        if (!currentQuestion || selectedAnswer === null) return;

        const { correctAnswer } = currentQuestion;
        const isCorrect = selectedAnswer === correctAnswer;
        setFeedback({
            isCorrect,
            message: isCorrect ? "Chính xác!" : "Sai rồi!",
        });

        if (isCorrect) {
            setScore((prev) => prev + 1);
        }

        setTimeout(() => {
            setFeedback(null);
            setSelectedAnswer(null);
            if (currentIndex < displayQuestions.length - 1) {
                setCurrentIndex((prev) => prev + 1);
            } else {
                setMode("result");
            }
        }, 1000);
    };

    const handleReplay = () => {
        setScore(0);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setFeedback(null);
        setMode("setup");
    };

    // useContext — cung cấp state cho Question
    const contextValue = {
        selectedAnswer,
        setSelectedAnswer,
        currentQuestion,
        score,
        feedback,
    };

    if (mode === "result") {
        return (
            <div className="quiz-container">
                <Result score={score} total={displayQuestions.length} onReplay={handleReplay} />
            </div>
        );
    }

    // Màn hình chơi quiz
    if (mode === "play" && currentQuestion) {
        return (
            <div className="quiz-container">
                <h1 className="quiz-title">Quiz App</h1>
                <p className="quiz-info">
                    Câu {currentIndex + 1} / {displayQuestions.length} — Điểm: {score}
                </p>
                <QuizContext.Provider value={contextValue}>
                    <Question onSubmit={handleSubmit} />
                </QuizContext.Provider>
            </div>
        );
    }

    // Màn hình setup — nhập câu hỏi
    return (
        <div className="quiz-container">
            <h1 className="quiz-title">Quiz App</h1>
            <p className="quiz-info">Nhập câu hỏi và đáp án cho quiz của bạn</p>
            <QuestionInput onAddQuestion={handleAddQuestion} />

            {questions.length > 0 && (
                <div style={{ marginTop: 24 }}>
                    <p className="input-label">Danh sách câu hỏi ({questions.length})</p>
                    {questions.map((q, index) => (
                        <div key={index} className="question-preview">
                            {index + 1}. {q.question}
                        </div>
                    ))}
                </div>
            )}
            <button
                className="submit-btn"
                style={{ marginTop: 16 }}
                onClick={handleStartQuiz}
                disabled={questions.length === 0}
            >
                Bắt đầu Quiz
            </button>
        </div>
    );
}

export default Quiz;
