import React, { useState } from 'react';

const MissingGrid = ({ handleSubmit, qNum }) => {
  // The complete 3×3 puzzle stored as a single state array.
  // The last row has two missing values for user input.
  const initialGrid = [
    [44, 25, 36],
    [64, 49, 81],
    [100, '', '']
  ];

  const [grid, setGrid] = useState(initialGrid);
  const [solved, setSolved] = useState(false);

  // Update a specific cell's value in the grid state.
  const handleInputChange = (row, col, value) => {
    const updatedGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? value : cell
      )
    );
    setGrid(updatedGrid);
  };

  // Check if the missing cells have the correct answers: 169 and 81.
  const handleAnswer = () => {
    if (
      parseInt(grid[2][1], 10) === 169 &&
      parseInt(grid[2][2], 10) === 81
    ) {
      handleSubmit(qNum);
      setSolved(true);
    }
  };

  // Determine if a cell is editable based on its position.
  const isEditable = (row, col) => {
    // For this grid, only row 2, col 1 and col 2 are editable.
    return row === 2 && (col === 1 || col === 2);
  };

  // When solved, display a full-screen overlay.
  if (solved) {
    return (
      <div className="flex items-center justify-center bg-green-600 text-white text-3xl">
        You Solved It!
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Left Side: Description and Rules */}
      <div className="w-1/2 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Puzzle Description</h1>
        <p className="mb-4">
          In this 3×3 grid puzzle, you are presented with a set of numbers where two cells are empty. Your challenge is to analyze the relationships between the numbers and determine the missing values. Notice that several cells contain perfect squares—for example, 25 (5²), 36 (6²), 49 (7²), 64 (8²), 81 (9²), and 100 (10²). Although one cell (44) does not immediately appear as a perfect square, the overall grid hints at a pattern based on square numbers and their relationships.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Rules</h2>
        <p>
          1️⃣Study all rows and columns. Many numbers are perfect squares. Look for patterns or relationships (such as differences, sums, or sequences) that might help explain how the numbers relate to each other.<br />
          2️⃣Enter your answers in the two empty cells.<br />
          3️⃣Once you have filled in the missing values, click the Submit button.<br />
        </p>
      </div>

      {/* Right Side: 3×3 Puzzle Grid rendered as a table */}
      <div className="w-1/2 p-6 flex flex-col items-center bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Puzzle Grid</h2>
        <table className="border-collapse border border-gray-400">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-400 w-20 h-20 text-center p-0"
                  >
                    {isEditable(rowIndex, colIndex) ? (
                      <input
                        type="text"
                        placeholder="??"
                        value={cell}
                        onChange={(e) =>
                          handleInputChange(rowIndex, colIndex, e.target.value)
                        }
                        className="w-full h-full text-center px-1 outline-none"
                        style={{ fontSize: '1rem' }}
                      />
                    ) : (
                      <span className="flex items-center justify-center w-full h-full">
                        {cell}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleAnswer}
          className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MissingGrid;
