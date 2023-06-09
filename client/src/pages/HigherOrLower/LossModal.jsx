import "./lossModal.css";

const LossModal = ({ setGameState, lastScore }) => {
  const playAgain = () => {
    setGameState(true);
  };
  return (
    <div className="loss-modal">
      <h1>You Lost!</h1>
      <div className="score-box">
        <p>Your score was</p>
        <h1 className="last-score">{lastScore.current}</h1>
      </div>
      <button onClick={playAgain}>Play Again</button>
    </div>
  );
};

export default LossModal;
