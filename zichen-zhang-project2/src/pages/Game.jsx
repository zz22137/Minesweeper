import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import Grid from '../components/Grid';

function Game() {
  const { difficulty } = useParams();
  const { initializeGrid, gameOver, win, resetGame } = useContext(GameContext);

  useEffect(() => {
    let rows, columns, mines;
    if (difficulty === 'easy') {
      rows = 8; columns = 8; mines = 10;
    } else if (difficulty === 'medium') {
      rows = 16; columns = 16; mines = 40;
    } else if (difficulty === 'hard') {
      rows = 16; columns = 30; mines = 99;
    }
    initializeGrid(rows, columns, mines);
  }, [difficulty, initializeGrid]);

  return (
    <div>
      <button onClick={resetGame}>Reset Game</button>
      {gameOver ? <h2>Game over! You lost!</h2> : win ? <h2>Game over! You won!</h2> : <Grid />}
    </div>
    
      
    
  );
}

export default Game;