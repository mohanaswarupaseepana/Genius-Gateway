import React, { useState } from 'react';

function App() {
  const [jugs, setJugs] = useState({ jug1: 0, jug2: 0, jug3: 0 });
  const capacities = { jug1: 8, jug2: 5, jug3: 3 };

  // Handle filling a jug to its full capacity
  const fillJug = (jug) => {
    setJugs((prevState) => ({ ...prevState, [jug]: capacities[jug] }));
  };

  // Handle emptying a jug
  const emptyJug = (jug) => {
    setJugs((prevState) => ({ ...prevState, [jug]: 0 }));
  };

  // Handle transferring water between two jugs
  const transferWater = (fromJug, toJug) => {
    const transferAmount = Math.min(jugs[fromJug], capacities[toJug] - jugs[toJug]);
    if (transferAmount > 0) {
      setJugs((prevState) => ({
        ...prevState,
        [fromJug]: prevState[fromJug] - transferAmount,
        [toJug]: prevState[toJug] + transferAmount,
      }));
    }
  };

  // Reset the puzzle to its initial state
  const resetPuzzle = () => {
    setJugs({ jug1: 0, jug2: 0, jug3: 0 });
  };

  return (
    <div className="App min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto">
        {/* Left Section: Description & Rules */}
        <div className="text-white flex flex-col items-start space-y-6">
          <h1 className="text-3xl font-extrabold">Three Water Jugs Puzzle</h1>
          <p className="text-lg leading-relaxed">
            The objective of this puzzle is to measure a specific amount of water using three jugs of different capacities. You are provided with:
            <ul className="list-disc pl-6 mt-4">
              <li>Jug 1: 8 liters</li>
              <li>Jug 2: 5 liters</li>
              <li>Jug 3: 3 liters</li>
            </ul>
            You can perform the following actions:
            <ul className="list-disc pl-6 mt-4">
              <li>Fill a jug to its full capacity.</li>
              <li>Empty a jug completely.</li>
              <li>Transfer water between two jugs until one is full or the other is empty.</li>
            </ul>
            Try to figure out how to achieve the target amount of water in one of the jugs.
          </p>
          <div className="bg-white p-4 rounded-lg shadow-md text-gray-800 w-full">
            <h2 className="font-semibold text-xl mb-2">Goal</h2>
            <p>Try to find the correct sequence of actions to measure the required amount of water.</p>
          </div>
        </div>

        {/* Right Section: Interactive Puzzle Interface */}
        <div className="flex flex-col items-center space-y-8 bg-white p-8 rounded-xl shadow-xl">
          <div className="text-center text-2xl font-semibold text-gray-800 mb-4">Interactive Puzzle</div>

          {/* Jugs Section */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {Object.keys(jugs).map((jug) => (
              <div key={jug} className="flex flex-col items-center space-y-4">
                <div className="text-xl font-semibold text-gray-700">{jug.replace('jug', 'Jug ')}</div>
                <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center text-2xl font-bold text-blue-700">
                  {jugs[jug]}L
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-200"
                    onClick={() => fillJug(jug)}
                  >
                    Fill
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-200"
                    onClick={() => emptyJug(jug)}
                  >
                    Empty
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Transfer Water Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">Transfer Water Between Jugs</h2>
            <div className="flex justify-between max-w-xs mx-auto">
              {['jug1', 'jug2', 'jug3'].map((fromJug) =>
                ['jug1', 'jug2', 'jug3'].map(
                  (toJug) =>
                    fromJug !== toJug && (
                      <button
                        key={`${fromJug}-${toJug}`}
                        className="bg-purple-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-purple-600 transition duration-200"
                        onClick={() => transferWater(fromJug, toJug)}
                      >
                        {fromJug.replace('jug', 'Jug ')} → {toJug.replace('jug', 'Jug ')}
                      </button>
                    )
                )
              )}
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-center">
            <button
              className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition duration-200"
              onClick={resetPuzzle}
            >
              Reset Puzzle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
