import React from 'react';

function Cell({ cell, onClick }) {
  return (
    <div className={`cell ${cell.revealed ? (cell.mine ? 'mine' : 'safe') : ''}`} onClick={onClick}>
      {cell.revealed ? (cell.mine ? 'X' : cell.adjacentMines > 0 ? cell.adjacentMines : '') : ''}
    </div>
  );
}

export default Cell;