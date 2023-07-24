function Score({ score, player1, player2 }) {
  return (
    <div className="counter-container">
      <p className="player-score">
        {player1}: {score.player1}
      </p>
      <p className="player-score">
        {player2}: {score.player2}
      </p>
    </div>
  );
}

export default Score;
