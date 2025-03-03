import React, { useState, useEffect } from 'react';

const MagicSquare = () => {
  const [grid, setGrid] = useState(Array(3).fill().map(() => Array(3).fill('')));
  const [message, setMessage] = useState('Arrange numbers 1 to 9 so each row, column, and diagonal sums to 15.');

  const isMagicSquare = (grid) => {
    const sums = [];
    for (let i = 0; i < 3; i++) {
      sums.push(grid[i].reduce((a, b) => a + (parseInt(b) || 0), 0)); // Rows
      sums.push(grid.reduce((a, b) => a + (parseInt(b[i]) || 0), 0)); // Columns
    }
    sums.push(grid[0][0] + grid[1][1] + grid[2][2]); // Diagonal 1
    sums.push(grid[0][2] + grid[1][1] + grid[2][0]); // Diagonal 2
    return sums.every(sum => sum === 15);
  };

  const handleChange = (row, col, value) => {
    if (value < 1 || value > 9 || isNaN(value)) return;
    const newGrid = grid.map((r, i) => r.map((c, j) => (i === row && j === col ? value : c)));
    setGrid(newGrid);
  };

  const checkSolution = () => {
    const numbers = grid.flat().map(Number);
    if (new Set(numbers).size !== 9 || numbers.some(n => n < 1 || n > 9)) {
      setMessage('Use each number from 1 to 9 exactly once.');
      return;
    }
    setMessage(isMagicSquare(grid) ? 'Correct! You solved the Magic Square!' : 'Incorrect. Try again!');
  };

  const resetGrid = () => {
    setGrid(Array(3).fill().map(() => Array(3).fill('')));
    setMessage('Arrange numbers 1 to 9 so each row, column, and diagonal sums to 15.');
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-purple-400 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">3x3 Magic Square</h1>
      <p className="mb-6">{message}</p>
      <div className="grid grid-cols-3 gap-2">
        {grid.map((row, i) => row.map((cell, j) => (
          <input
            key={`${i}-${j}`}
            type="text"
            value={cell}
            onChange={(e) => handleChange(i, j, e.target.value)}
            className="w-16 h-16 text-2xl text-center rounded-lg shadow-md focus:outline-none"
          />
        )))}
      </div>
      <div className="mt-4 space-x-4">
        <button onClick={checkSolution} className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-xl shadow-md">Check Solution</button>
        <button onClick={resetGrid} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-xl shadow-md">Reset</button>
      </div>
    </div>
  );
};

export default MagicSquare;
