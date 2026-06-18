function Result({ score, total, onReplay }) {
    return (
        <div className="result-box">
            <h2 className="quiz-title">Kết quả</h2>
            <p className="result-score">
                {score}/{total}
            </p>
            <p className="result-text">
                Bạn đúng {score} trên {total} câu!
            </p>
            <button className="replay-btn" onClick={onReplay}>
                Chơi lại
            </button>
        </div>
    );
}

export default Result;
