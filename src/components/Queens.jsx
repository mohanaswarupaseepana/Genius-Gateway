import { useState } from 'react';

const Queens = () => {
    const [queens, setQueens] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  
    // Check if a queen at (row, col) conflicts with others
    const hasConflict = (row, col) => {
      for (let r = 0; r < queens.length; r++) {
        if (r === row) continue;
        const c = queens[r];
        if (c === col || Math.abs(r - row) === Math.abs(c - col)) {
          return true;
        }
      }
      return false;
    };

  const handleReset = () => {
    setQueens([0, 1, 2, 3, 4, 5, 6, 7]);
  };

  const isValidSolution = () => {
    return queens.every((col, row) => !hasConflict(row, col));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="mb-4 flex gap-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Reset Board
        </button>
        {isValidSolution() && (
          <div className="px-4 py-2 bg-green-500 text-white rounded">
            Valid Solution!
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="grid grid-cols-8 gap-0 border-2 border-gray-800">
          {Array.from({ length: 64 }).map((_, index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;
            const hasQueen = queens[row] === col;
            const isConflict = hasQueen && hasConflict(row, col);
            const isDark = (row + col) % 2 === 0;

            return (
              <div
                key={index}
                className={`
                  w-12 h-12 flex items-center justify-center
                  ${isDark ? 'bg-amber-800' : 'bg-amber-100'}
                  ${hasQueen ? 'bg-opacity-100' : 'bg-opacity-80'}
                  ${isConflict ? '!bg-red-500' : ''}
                  ${hasQueen ? 'cursor-move' : 'cursor-pointer'}
                  relative
                  transition-colors duration-200
                  hover:opacity-90
                `}
                onClick={() => {
                  const newQueens = [...queens];
                  newQueens[row] = col;
                  setQueens(newQueens);
                }}
              >
                {hasQueen && (
                  <span className="text-3xl text-white transition-transform duration-200">
                    ♛
                  </span>
                )}
                {isConflict && (
                  <div className="absolute inset-0 border-4 border-red-700 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Queens;