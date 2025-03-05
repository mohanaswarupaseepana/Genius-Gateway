import { useState } from "react";

const BridgeTorchPuzzle = () => {
  const people = [
    { name: "A", time: 1 },
    { name: "B", time: 2 },
    { name: "C", time: 5 },
    { name: "D", time: 10 },
  ];

  const [leftSide, setLeftSide] = useState([...people]);
  const [rightSide, setRightSide] = useState([]);
  const [torch, setTorch] = useState("left");
  const [totalTime, setTotalTime] = useState(0);
  const [selected, setSelected] = useState([]);
  const [logs, setLogs] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const handleSelect = (person) => {
    if (selected.includes(person)) {
      setSelected(selected.filter((p) => p !== person));
    } else if (selected.length < 2 && torch === "left" && leftSide.includes(person)) {
      setSelected([...selected, person]);
    } else if (selected.length < 1 && torch === "right" && rightSide.includes(person)) {
      setSelected([...selected, person]);
    }
  };

  const handleMove = () => {
    if (selected.length === 0 || gameOver) return;
    const moveTime = Math.max(...selected.map((p) => p.time));
    setTotalTime(totalTime + moveTime);

    if (torch === "left" && selected.length === 2) {
      setLeftSide(leftSide.filter((p) => !selected.includes(p)));
      setRightSide([...rightSide, ...selected]);
      setTorch("right");
      setLogs([...logs, `Moved ${selected.map(p => p.name).join(" & ")} → Right (Time: ${moveTime})`]);
    } else if (torch === "right" && selected.length === 1) {
      setRightSide(rightSide.filter((p) => !selected.includes(p)));
      setLeftSide([...leftSide, ...selected]);
      setTorch("left");
      setLogs([...logs, `Moved ${selected[0].name} → Left (Time: ${moveTime})`]);
    }
    setSelected([]);

    if (rightSide.length === 4) {
      setGameOver(true);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">🔥 Bridge and Torch Puzzle</h1>
      {gameOver ? (
        <div className="text-green-600 text-lg font-bold">🎉 Success! Everyone crossed in {totalTime} minutes! 🎉</div>
      ) : (
        <>
          <p className="mb-4 text-lg">Total Time: {totalTime} minutes</p>
          <div className="relative w-full max-w-2xl h-32 flex items-center justify-center border-b-4 border-gray-700 mb-4">
            <div className="absolute left-0 flex space-x-4 text-5xl">
              {leftSide.map((p) => (
                <span key={p.name} onClick={() => handleSelect(p)} className={`cursor-pointer ${selected.includes(p) ? "text-blue-500" : "text-black"}`}>
                  🧍
                </span>
              ))}
            </div>

            <img
              src="./flame_torch.jpg"
              alt="Torch"
              className={`absolute h-14 w-14 transition-transform duration-500 ${torch === 'left' ? 'left-16' : 'right-16'}`}
            />

            <div className="absolute right-0 flex space-x-4 text-5xl">
              {rightSide.map((p) => (
                <span key={p.name} onClick={() => handleSelect(p)} className={`cursor-pointer ${selected.includes(p) ? "text-blue-500" : "text-black"}`}>
                  🧍
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleMove}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-700"
          >
            Move Selected
          </button>

          <div className="mt-4 w-full max-w-md p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold mb-2">Move Log:</h2>
            <ul className="list-disc list-inside">
              {logs.length > 0 ? (
                logs.map((log, index) => <li key={index} className="p-1">{log}</li>)
              ) : (
                <p className="text-gray-600">Select people and move them across.</p>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default BridgeTorchPuzzle;
