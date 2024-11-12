import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import Cell from './Cell';

function Grid() {
  const { grid, revealCell } = useContext(GameContext);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} cell={cell} onClick={() => revealCell(rowIndex, cellIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;