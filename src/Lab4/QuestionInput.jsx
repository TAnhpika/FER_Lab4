import { useState } from "react";

function QuestionInput({ onAddQuestion }) {
    const [question, setQuestion] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");

    const handleAdd = () => {
        if (!question || !answer1 || !answer2 || !answer3 || !correctAnswer) return;

        onAddQuestion({
            question,
            answers: [answer1, answer2, answer3],
            correctAnswer,
        });

        setQuestion("");
        setAnswer1("");
        setAnswer2("");
        setAnswer3("");
        setCorrectAnswer("");
    };

    return (
        <div>
            <label className="input-label">Câu hỏi</label>
            <input className="input-field" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Nhập câu hỏi..." />

            <label className="input-label">Đáp án 1</label>
            <input className="input-field" value={answer1} onChange={(e) => setAnswer1(e.target.value)} placeholder="Nhập đáp án 1..."/>
            <label className="input-label">Đáp án 2</label>
            <input className="input-field" value={answer2} onChange={(e) => setAnswer2(e.target.value)} placeholder="Nhập đáp án 2..."/>
            <label className="input-label">Đáp án 3</label>
            <input className="input-field" value={answer3} onChange={(e) => setAnswer3(e.target.value)} placeholder="Nhập đáp án 3..."/>

            <label className="input-label">Đáp án đúng</label>
            <select className="input-field" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
                <option value="">Chọn đáp án đúng</option>
                {answer1 && <option value={answer1}>{answer1}</option>}
                {answer2 && <option value={answer2}>{answer2}</option>}
                {answer3 && <option value={answer3}>{answer3}</option>}
            </select>

            <button className="submit-btn" onClick={handleAdd}>
                Thêm câu hỏi
            </button>
        </div>
    );
}

export default QuestionInput;