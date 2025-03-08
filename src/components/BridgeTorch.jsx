import { useState } from "react";

const BridgeTorch = () => {
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
  
    if (torch === "left") {
      const newLeftSide = leftSide.filter((p) => !selected.includes(p));
      const newRightSide = [...rightSide, ...selected];
      setLeftSide(newLeftSide);
      setRightSide(newRightSide);
      setTorch("right");
      setLogs([...logs, `Moved ${selected.map(p => p.name).join(" & ")} → Right (Time: ${moveTime})`]);
  
      if (newRightSide.length === 4) {
        setGameOver(true);
      }
    } else if (torch === "right") {
      const newRightSide = rightSide.filter((p) => !selected.includes(p));
      const newLeftSide = [...leftSide, ...selected];
      setRightSide(newRightSide);
      setLeftSide(newLeftSide);
      setTorch("left");
      setLogs([...logs, `Moved ${selected[0].name} → Left (Time: ${moveTime})`]);
    }
  
    setSelected([]);
  };

  const handleReset = () => {
    setLeftSide([...people]);
    setRightSide([]);
    setTorch("left");
    setTotalTime(0);
    setSelected([]);
    setLogs([]);
    setGameOver(false);
  };

  return (
    <div className="p-6 bg-gray-100 h-full flex">
      <div className="w-1/3 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Bridge and Torch Puzzle</h2>
        <p className="mb-2">Rules:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Only two people can cross at a time.</li>
          <li>They must use the torch to cross.</li>
          <li>People walk at different speeds.</li>
          <li>The crossing time is the slower person's time.</li>
        </ul>
        <p className="mb-2 font-bold">People and their crossing times:</p>
        <ul className="list-disc list-inside mb-4">
          <li>A - 1 minute</li>
          <li>B - 2 minutes</li>
          <li>C - 5 minutes</li>
          <li>D - 10 minutes</li>
        </ul>
        <p className="font-bold">Total Time: {totalTime} minutes</p>
        <button onClick={handleReset} className="mt-4 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700">
          Reset
        </button>
      </div>

      <div className="w-2/3 p-4 flex flex-col items-center overflow-x-scroll">
        {/* Left and Right Side Human Containers */}
        <div className="flex justify-between w-full max-w-xl mb-6">
          <div className="flex space-x-4 items-center">
            {leftSide.map((p) => (
              <span key={p.name} onClick={() => handleSelect(p)}
                className={`cursor-pointer flex flex-col items-center ${selected.includes(p) ? "text-blue-500" : "text-black"}`}>
                🧍<span className="text-sm font-bold">{p.name}</span>
              </span>
            ))}
          </div>

          {/* Bridge Area */}
          <div className="relative flex items-center justify-center w-1/2 h-25 border">
            {/* Bridge Line */}
            <div className="absolute w-full h-2 bg-gray-700 rounded-lg top-1/2 transform -translate-y-1/2" />
            <span className="absolute text-white text-sm font-bold">🌉 Bridge</span>
          </div>

          <div className="flex space-x-4 items-center">
            {rightSide.map((p) => (
              <span key={p.name} onClick={() => handleSelect(p)}
                className={`cursor-pointer flex flex-col items-center ${selected.includes(p) ? "text-blue-500" : "text-black"}`}>
                🧍<span className="text-sm font-bold">{p.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Torch Movement (only in Right Side) */}
        <div className="absolute flex items-center justify-center w-10 h-10 transition-all duration-500"
          style={{ left: torch === "right" ? "80%" : "50%", top: "5%" }}>
          <img
            src="./flame_torch.png"
            alt="Torch"
            className="h-14 w-7"
          />
        </div>

        {/* Move Button */}
        {!gameOver && (
          <button
            onClick={handleMove}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-700"
          >
            Move Selected
          </button>
        )}

        {/* Log Section */}
        <div className="mt-4 w-full max-w-md p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Move Log:</h2>
          <ul className="list-disc list-inside">
            {logs.length > 0 ? (
              logs.map((log, index) => <li key={index} className="p-1">{log}</li>)
            ) : (
              <p className="text-gray-600">Select people and move them across.</p>
            )}
          </ul>
          {gameOver && (
            <p className="text-green-600 font-bold text-lg mt-4 text-center">
              🎉 Success! Everyone crossed in {totalTime} minutes! 🎉
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BridgeTorch;
