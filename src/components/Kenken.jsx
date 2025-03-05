import React, { useState, useEffect } from "react";

const size = 3;
const cages = [
  { cells: [[0, 0], [0, 1]], result: 4, operation: "+", color: "border-red-500" },
  { cells: [[0, 2], [1, 2]], result: 3, operation: "-", color: "border-blue-600" },
  { cells: [[1, 0], [2, 0]], result: 5, operation: "+", color: "border-green-500" },
  { cells: [[1, 1], [2, 1]], result: 2, operation: "-", color: "border-yellow-500" },
  { cells: [[2, 2]], result: 1, operation: "", color: "border-purple-500" }
];

const getCageBorders = (row, col) => {
  let borders = { top: false, right: false, bottom: false, left: false };
  let cageColor = "border-black";
  cages.forEach(({ cells, color }) => {
    if (cells.some(([r, c]) => r === row && c === col)) {
      cageColor = color;
      if (!cells.some(([r, c]) => r === row - 1 && c === col)) borders.top = true;
      if (!cells.some(([r, c]) => r === row + 1 && c === col)) borders.bottom = true;
      if (!cells.some(([r, c]) => r === row && c === col - 1)) borders.left = true;
      if (!cells.some(([r, c]) => r === row && c === col + 1)) borders.right = true;
    }
  });
  return `
    ${borders.top ? `border-t-4 ${cageColor}` : "border-t"}
    ${borders.right ? `border-r-8 ${cageColor}` : "border-r"}
    ${borders.bottom ? `border-b-4 ${cageColor}` : "border-b"}
    ${borders.left ? `border-l-4 ${cageColor}` : "border-l"}
  `;
};

const validateSolution = (grid) => {
  for (const { cells, result, operation } of cages) {
    const values = cells.map(([r, c]) => parseInt(grid[r][c]) || 0);
    let computedResult = operation === "+" ? values.reduce((a, b) => a + b, 0) : values.reduce((a, b) => a - b);
    if (computedResult !== result) return false;
  }
  return true;
};

const KenKen = ({ handleSubmit, qNum }) => {
  const [grid, setGrid] = useState(Array(size).fill().map(() => Array(size).fill("")));
  const [message, setMessage] = useState("Fill the grid with numbers 1-3, ensuring each row and column contains each number exactly once and follows cage rules.");

  useEffect(() => {
    if (grid.flat().every(cell => cell !== "")) {
      if (validateSolution(grid)) {
        setMessage("🎉 Correct Solution!");
        handleSubmit(qNum);
      } else {
        setMessage("❌ Incorrect Solution! Try again.");
      }
    }
  }, [grid]);

  const handleChange = (row, col, value) => {
    if (value >= 1 && value <= size) {
      const newGrid = [...grid];
      newGrid[row][col] = value;
      setGrid(newGrid);
    }
  };

  const resetGrid = () => {
    setGrid(Array(size).fill().map(() => Array(size).fill("")));
    setMessage("Fill the grid with numbers 1-3, ensuring each row and column contains each number exactly once and follows cage rules.");
  };

  return (
    <div className="h-full flex items-center justify-center bg-white">
      <div className='w-1/2 h-full flex flex-col px-6 gap-4 overflow-y-scroll py-5'>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Objective</h2>
          <p className="text-gray-600">Fill the 3x3 grid so each row and column contains numbers 1-3 exactly once, while satisfying the cage conditions.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Rules</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Each row and column must contain numbers 1-3 exactly once.</li>
            <li>Follow the given arithmetic cage constraints.</li>
          </ul>
        </div>
      </div>
      <div className='w-1/2 h-full flex flex-col justify-center items-center'>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">3x3 KenKen</h1>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="grid grid-cols-3">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className={`relative ${getCageBorders(rowIndex, colIndex)} border-gray-600`}> 
                <input
                  type="number"
                  min="1"
                  max={size}
                  value={cell}
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  className="w-16 h-16 text-2xl text-center text-black bg-gray-300 shadow-md focus:outline-none"
                />
                {cages.some(({ cells }) => cells[0][0] === rowIndex && cells[0][1] === colIndex) && (
                  <span className="absolute top-0 left-0 text-xs p-1 font-bold">{
                    cages.find(({ cells }) => cells[0][0] === rowIndex && cells[0][1] === colIndex)?.result
                  }{cages.find(({ cells }) => cells[0][0] === rowIndex && cells[0][1] === colIndex)?.operation}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
        <div className="mt-4 space-x-4">
          <button onClick={() => validateSolution(grid)} className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-xl shadow-md">Check Solution</button>
          <button onClick={resetGrid} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-xl shadow-md">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default KenKen;
