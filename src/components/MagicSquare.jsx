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
          <p className="text-gray-600"> The 8 Queens puzzle is a famous combinatorial problem in chess. It challenges players to position 8 queens so that none of them share the same row, column, or diagonal. Place all 8 queens so that no two attack each other.</p>
        </div>
        <div className="">
          <h2 className="text-xl font-semibold text-gray-700">Rules</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Each row must contain exactly one queen.</li>
            <li>Queens cannot be in the same column.</li>
            <li>Queens cannot share diagonals.</li>
          </ul>
        </div>
        <div className="">
          <h2 className="text-xl font-semibold text-gray-700">How to Play</h2>
          <p className="text-gray-600">1️⃣ Click on any square in a row to place a queen.<br />
            2️⃣ If a queen is already in that row, she will move to the selected column.<br />
            3️⃣ If a queen is in a conflicting position, the square will be highlighted in red.<br />
            4️⃣ Keep adjusting until all conflicts are resolved.<br />
            5️⃣ Once a valid solution is found, you win! 🎉<br />

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
