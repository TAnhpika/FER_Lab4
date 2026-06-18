function Question({ question, options, selectedAnswer, onSelectAnswer, onSubmit }) {
    return (
        <div>
            <h2 className="question-text">{question}</h2>
            <ul className="options-list">
                {options.map((option, index) => (
                    <li key={index}>
                        <button
                            className={`option-btn ${selectedAnswer === index ? "selected" : ""}`}
                            onClick={() => onSelectAnswer(index)} 
                        >
                            {option}
                        </button>
                    </li>
                ))}
            </ul>
            <button
                className="submit-btn"
                onClick={onSubmit}
                disabled={selectedAnswer === null}
            >
                Kiểm tra đáp án
            </button>
        </div>
    );
}

export default Question;
