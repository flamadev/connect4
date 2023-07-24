function Board({ board, handleClickColumn, getSquareClass }) {
  return (
    <div className="board">
      {board.map((column, index) => {
        return (
          <div
            className="column"
            key={index}
            data-col-id={index}
            onClick={handleClickColumn}
          >
            {column.map((square, index) => {
              return <div className={getSquareClass(square)} key={index}></div>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
