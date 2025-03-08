import React, { useState } from 'react';

const MissingGrid = () => {
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
  const handleSubmit = () => {
    if (
      parseInt(grid[2][1], 10) === 169 &&
      parseInt(grid[2][2], 10) === 81
    ) {
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
      <div className="fixed inset-0 flex items-center justify-center bg-green-600 text-white text-3xl">
        You Solved It!
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Description and Rules */}
      <div className="w-1/2 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Puzzle Description</h1>
        <p className="mb-4">
          Solve the puzzle by filling in the missing numbers in the grid.
          Observe the pattern carefully and enter the correct values in the missing cells.
          Click <strong>Submit</strong> when you are done.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Rules</h2>
        <ul className="list-disc list-inside">
          <li>Observe the pattern in the grid.</li>
          <li>Fill in the missing values correctly.</li>
          <li>The puzzle grid is on the right side.</li>
        </ul>
      </div>

      {/* Right Side: 3×3 Puzzle Grid rendered as a table */}
      <div className="w-1/2 p-6 flex flex-col items-center">
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
                        className="w-full h-full px-1 outline-none"
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
          onClick={handleSubmit}
          className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MissingGrid;
