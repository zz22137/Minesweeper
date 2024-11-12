import React, { createContext, useState, useCallback } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [mines, setMines] = useState(0);

  const initializeGrid = useCallback((rows, columns, mines) => {
    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => ({ revealed: false, mine: false, adjacentMines: 0 }))
    );

    setGrid(newGrid);
    setGameOver(false);
    setWin(false);
    setFirstClick(true);
    setRows(rows);
    setColumns(columns);
    setMines(mines);
  }, []);

  const placeMines = (grid, mines, initialRow, initialCol) => {
    let minesPlaced = 0;
    const rows = grid.length;
    const columns = grid[0].length;
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * columns);
      
      if (!grid[row][col].mine && (row !== initialRow || col !== initialCol)) {
        grid[row][col].mine = true;
        minesPlaced++;
      }
    }
    calculateAdjacentMines(grid);
  };

  const calculateAdjacentMines = (grid) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],         [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col].mine) continue;
        let adjacentMines = 0;
        directions.forEach(([dx, dy]) => {
          const newRow = row + dx;
          const newCol = col + dy;
          if (
            newRow >= 0 && newRow < grid.length &&
            newCol >= 0 && newCol < grid[0].length &&
            grid[newRow][newCol].mine
          ) {
            adjacentMines++;
          }
        });
        grid[row][col].adjacentMines = adjacentMines;
      }
    }
  };

  const revealCell = (row, col) => {
    if (gameOver || grid[row][col].revealed) return;

    let newGrid = [...grid];
    if (firstClick) {
      placeMines(newGrid, mines, row, col); 
      setFirstClick(false);
    }

    newGrid = newGrid.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? { ...cell, revealed: true } : cell
      )
    );

    if (newGrid[row][col].mine) {
      setGameOver(true);
    } else {
      if (newGrid[row][col].adjacentMines === 0) {
        revealAdjacentCells(newGrid, row, col);
      }
      checkWin(newGrid);
    }
    setGrid(newGrid);
  };

  const revealAdjacentCells = (newGrid, row, col) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],         [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (
        newRow >= 0 && newRow < newGrid.length &&
        newCol >= 0 && newCol < newGrid[0].length &&
        !newGrid[newRow][newCol].revealed
      ) {
        newGrid[newRow][newCol].revealed = true;
        if (newGrid[newRow][newCol].adjacentMines === 0) {
          revealAdjacentCells(newGrid, newRow, newCol);
        }
      }
    });
  };

  const checkWin = (newGrid) => {
    const allCellsRevealed = newGrid.every((row) =>
      row.every((cell) => cell.revealed || cell.mine)
    );
    if (allCellsRevealed) setWin(true);
  };

  const resetGame = () => {
    initializeGrid(rows, columns, mines);
  };

  return (
    <GameContext.Provider value={{ grid, initializeGrid, revealCell, gameOver, win, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};