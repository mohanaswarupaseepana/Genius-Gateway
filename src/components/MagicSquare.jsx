import React, { useState, useEffect } from 'react';

const MagicSquare = ({ handleSubmit, qNum }) => {
  const [grid, setGrid] = useState(Array(3).fill().map(() => Array(3).fill('')));
  const [message, setMessage] = useState('Arrange numbers 1 to 9 so each row, column, and diagonal sums to 15.');

  const isMagicSquare = (grid) => {
    const sums = [];
    for (let i = 0; i < 3; i++) {
      sums.push(grid[i].reduce((a, b) => a + (parseInt(b) || 0), 0)); // Row sum
      sums.push(grid.reduce((a, row) => a + (parseInt(row[i]) || 0), 0)); // Column sum
    }
    sums.push(parseInt(grid[0][0]) + parseInt(grid[1][1]) + parseInt(grid[2][2])); // Diagonal 1
    sums.push(parseInt(grid[0][2]) + parseInt(grid[1][1]) + parseInt(grid[2][0])); // Diagonal 2
    return sums.every(sum => sum === 15);
  };
useEffect(() => {
  let flag=checkSolution();
  if(flag){
    handleSubmit(qNum);
  }
}, [grid]);
  const checkSolution = () => {
    console.log("Im in checksolution");
    const numbers = grid.flat().map(Number);
    console.log(numbers);
    // Check that all numbers 1-9 are used exactly once
    if (new Set(numbers).size !== 9 || numbers.some(n => n < 1 || n > 9)) {
      console.log("hello")
      setMessage('Use each number from 1 to 9 exactly once.');
      return false;
    }
    if (isMagicSquare(grid)) {
      setMessage('Correct! You solved the Magic Square!');
      return true;
    } else {
      setMessage('Incorrect. Try again!');
      return false;
    };
  };

  const handleChange = (row, col, value) => {
    // Allow clearing the cell by entering an empty string
    if (value === '') {
      const newGrid = grid.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? '' : c))
      );
      // console.log("IN empty string");
      setGrid(newGrid);
      return;
    }
    
    // console.log("Hello handle change");
    // Convert input to number and validate it is between 1 and 9
    const num = parseInt(value);
    if (isNaN(num) || num < 1 || num > 9) return;
    const newGrid = grid.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? num.toString() : c))
    );
    setGrid(newGrid);
    // console.log(newGrid);
    // checkSolution
  };

  

  const resetGrid = () => {
    setGrid(Array(3).fill().map(() => Array(3).fill('')));
    setMessage('Arrange numbers 1 to 9 so each row, column, and diagonal sums to 15.');
  };
  return (
    <div className="h-full flex  items-center justify-center bg-white">
      <div className='w-1/2 h-full flex flex-col px-6 gap-4 overflow-y-scroll py-5'>
        <div className=" ">
          <h2 className="text-xl font-semibold text-gray-700">Objective</h2>
          <p className="text-gray-600"> A magic square is a grid where the numbers are arranged so that every row, every column, and both main diagonals add up to the same number, known as the magic constant. In a standard 3×3 magic square, you use the numbers 1 through 9 without repeating any, and the magic constant is 15 (since the total sum of numbers 1–9 is 45, and 45 divided by 3 equals 15). This puzzle isn’t just a fun challenge—it also has a rich history in mathematics and various cultures.</p>
        </div>
        <div className="">
          <h2 className="text-xl font-semibold text-gray-700">Rules</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Use each number from 1 to 9 exactly once.</li>
            <li>No number should be repeated.</li>
            <li>The sum of the numbers in each row ,each column and both main diagonals must equal 15</li>
          </ul>
        </div>
        <div className="">
          <h2 className="text-xl font-semibold text-gray-700">How to Play</h2>
          <p className="text-gray-600">1️⃣ Begin filling in the  cells with logical reasoning. As you place each number, consider how it affects the sum of its row, column, and diagonal.<br />
            2️⃣ After placing a few numbers, start calculating the sums of the partially completed rows, columns, and diagonals.<br />
            3️⃣ If you notice a row, column, or diagonal cannot possibly add up to 15 given the remaining numbers, adjust your placements.
            <br />
            4️⃣ Continue filling in the grid until all cells are occupied.<br />
            5️⃣ Once completed, verify that each row, each column, and both diagonals sum to 15.
            If all conditions are met, congratulations—you’ve successfully created a magic square 🎉<br />

            🔄 Reset Button: If stuck, click the reset button to restart.</p>
        </div>


      </div>
      <div className='w-1/2 h-full flex flex-col justify-center items-center'>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">3x3 Magic Square</h1>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="grid grid-cols-3 gap-2">
          {grid.map((row, i) => row.map((cell, j) => (
            <input
              key={`${i}-${j}`}
              type="text"
              value={cell}
              onChange={(e) => {handleChange(i, j, e.target.value)}}
              className="w-16 h-16 text-2xl text-center text-black bg-gray-300 rounded-lg shadow-md focus:outline-none"
            />
          )))}
        </div>
        <div className="mt-4 space-x-4">
          <button onClick={checkSolution} className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-xl shadow-md">Check Solution</button>
          <button onClick={resetGrid} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-xl shadow-md">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default MagicSquare;
