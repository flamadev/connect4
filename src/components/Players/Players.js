function Players({ handleModeChange, mode }) {
  return (
    <div className="player-container">
      <label>
        <input
          type="radio"
          name="mode"
          value="pvp"
          checked={mode === 'pvp'}
          onChange={handleModeChange}
        />
        Player vs. Player
      </label>
      <label>
        <input
          type="radio"
          name="mode"
          value="pc"
          checked={mode === 'pc'}
          onChange={handleModeChange}
        />
        Player vs. PC
      </label>
    </div>
  );
}

export default Players;
