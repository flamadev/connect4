import './game.css';
import { React, useState } from 'react';
import Score from '../Score/Score';
import Board from '../Board/Board';
import confetti from 'canvas-confetti';
import Players from '../Players/Players';
import Modal from '../Modal/Modal';

function Game() {
  //constantes necesarias para visualizar el board
  const colsNumber = 6;
  const squaresNumber = 7;
  const squaresByColumn = Array(squaresNumber).fill(null);
  const initialColIndex = Array.from({ length: colsNumber }, (_, i) => i);
  const initialBoard = Array(colsNumber)
    .fill(null)
    .map(() => [...squaresByColumn]);
  const player1 = 'player1';
  const player2 = 'player2';
  let isBoardFull;
  //states
  const [board, setBoard] = useState(initialBoard);
  const [availableCols, setAvailableCols] = useState(initialColIndex);
  const [turn, setTurn] = useState(player1);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [showRules, setShowRules] = useState(true);
  const [mode, setMode] = useState('pvp');

  //logic game
  const getSquareClass = (square) => {
    if (square === null) return 'square';
    return square === player1 ? 'square player1' : 'square player2';
  };
  const checkFourConsecutive = (arr) => {
    let count = 0;
    const isFourConsecutive = arr.some((el, i) => {
      if (el !== null && el === arr[i - 1]) count += 1;
      else count = 1;
      return count >= 4;
    });
    return isFourConsecutive;
  };
  const checkWinner = (board, columnId, squareId) => {
    const row = [
      board[0][squareId],
      board[1][squareId],
      board[2][squareId],
      board[3][squareId],
      board[4][squareId],
      board[5][squareId],
    ];
    if (checkFourConsecutive(board[columnId]) || checkFourConsecutive(row)) {
      const newScore = { ...score };
      turn === player1 ? newScore.player1++ : newScore.player2++;
      setScore(newScore);
      setWinner(turn);
      confetti();
    }
  };
  const checkFullColumn = (column) => column.every((square) => square !== null);
  const checkTie = () => {
    isBoardFull = board.every((column) =>
      column.every((square) => square !== null)
    );

    if (isBoardFull && !winner) {
      console.log('Empate');
    }
  };

  //moves
  const nextMove = (columnId) => {
    let squareId = board[columnId].lastIndexOf(null);
    if (squareId !== -1 && winner !== null) {
      const newColumn = [...board[columnId]];
      newColumn[squareId] = turn;
      const newBoard = [...board];
      newBoard[columnId] = newColumn;
      setBoard(newBoard);
      if (checkFullColumn(newColumn)) {
        setAvailableCols(availableCols.filter((i) => i !== columnId));
      }
      checkWinner(newBoard, columnId, squareId);
      const newTurn = turn === player1 ? player2 : player1;
      setTurn(newTurn);
      checkTie();
    }
  };
  const getRandomMove = () => {
    const randomIndex = Math.floor(Math.random() * availableCols.length);
    const colId = availableCols[randomIndex];
    nextMove(colId);
  };
  if (mode === 'pc' && turn === player2) getRandomMove();

  //handlers
  const handleClickColumn = (e) => {
    const columnId = e.currentTarget.dataset.colId;
    nextMove(Number(columnId));
  };
  const handleResetGame = () => {
    setBoard(initialBoard);
    setTurn(player1);
    setWinner();
    setScore({ player1: 0, player2: 0 });
  };
  const handleStartGame = () => {
    setShowRules(false);
    const newScore = { ...score };
    setBoard(initialBoard);
    setTurn(player1);
    setWinner();
    setScore(newScore);
    setAvailableCols(initialColIndex);
  };
  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    setMode(selectedMode);
  };

  return (
    <>
      <div className="main-container">
        <div className="container-game">
          <header>
            <h1>Connect 4</h1>
          </header>
          <Players mode={mode} handleModeChange={handleModeChange} />
          <Board
            handleClickColumn={handleClickColumn}
            board={board}
            getSquareClass={getSquareClass}
          />
          <div className="container-buttons">
            <button type="button" id="start-button" onClick={handleStartGame}>
              Start
            </button>
            <button type="button" id="reset-button" onClick={handleResetGame}>
              Reset
            </button>
          </div>
          <Score score={score} player1={player1} player2={player2} />
          {isBoardFull ? (
            <Modal>
              <div className="win">
                <p>TIE!</p>
              </div>
            </Modal>
          ) : null}
        </div>
        {winner ? (
          <Modal handleClick={() => setWinner(null)}>
            <div className="win">
              <p>Win {winner}</p>
            </div>
          </Modal>
        ) : null}
        {showRules ? (
          <Modal handleClick={handleStartGame}>
            <h1>Rules</h1>
            <p>
              Connect 4 o Cuatro en línea es un juego para dos personas,cada
              jugador posee 21 fichas identicas de un color diferente. En el
              original, se utilizan los colores amarillo y rojo. Se juega en un
              tablero vertical que consiste de 7 columnas y 6 cuadrados en cada
              una (6x7) Una jugada se puede definir como situar una ficha dentro
              de un cuadrado del tablero, dentro de turnos. Cada jugador debe
              conectar 4 fichas de diferentes formas, ya sea horizontal,
              vertical o diagonal. El primero que logre este resultado gana la
              partida, si las 42 fichas han sido utilizadas y ningun jugador ha
              logrado su meta, se considera un empate.
            </p>
          </Modal>
        ) : null}
      </div>
    </>
  );
}

export default Game;
