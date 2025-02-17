import React, { useState } from "react";
import doorClosed from "/door_close.jpg";
import doorOpen from "/door_open.jpg";

const checkpoints = [
  {
    id: 1,
    title: "Checkpoint 1",
    doors: [
      { id: 1, question: "What is 2 + 2?", answer: "4", isCorrect: true },
      { id: 2, question: "What is 5 + 3?", answer: "8", isCorrect: false },
      { id: 3, question: "What is 10 - 7?", answer: "3", isCorrect: false },
    ],
  },
  {
    id: 2,
    title: "Checkpoint 2",
    doors: [
      { id: 4, question: "What is the capital of France?", answer: "Paris", isCorrect: false },
      { id: 5, question: "What is 6 * 6?", answer: "36", isCorrect: false },
      { id: 6, question: "What is 15 / 3?", answer: "5", isCorrect: true },
    ],
  },
  {
    id: 3,
    title: "Checkpoint 3",
    doors: [
      { id: 7, question: "What is the color of the sky?", answer: "Blue", isCorrect: false },
      { id: 8, question: "What is 12 + 4?", answer: "16", isCorrect: true },
      { id: 9, question: "What is 9 - 3?", answer: "6", isCorrect: false },
    ],
  },
];

export default function DoorGame() {
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  const [openedDoors, setOpenedDoors] = useState([]);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState("");
  const [isWinner, setIsWinner] = useState(false);
  const [checkpointMessage, setCheckpointMessage] = useState(null);

  const handleDoorClick = (doorId) => {
    if (openedDoors.includes(doorId) || isWinner) return;
    setSelectedDoor(doorId);
    setUserAnswer("");
    setError("");
  };

  const handleSubmit = () => {
    if (!selectedDoor || isWinner) return;
    const door = checkpoints[currentCheckpoint].doors.find((d) => d.id === selectedDoor);
    if (userAnswer.trim().toLowerCase() === door.answer.toLowerCase()) {
      setOpenedDoors([...openedDoors, selectedDoor]);
      if (door.isCorrect) {
        if (currentCheckpoint === checkpoints.length - 1) {
          setIsWinner(true);
        } else {
          setTimeout(() => {
            setCheckpointMessage(`You have reached ${checkpoints[currentCheckpoint + 1].title}!`);
            setTimeout(() => {
              setCheckpointMessage(null);
              setCurrentCheckpoint(currentCheckpoint + 1);
              setOpenedDoors([]);
              setSelectedDoor(null);
            }, 2000);
          }, 1000);
        }
      } else {
        setError("This is not the correct door to the next checkpoint!");
      }
    } else {
      setError("Incorrect answer! Try again.");
    }
  };

  return (
    <div className="bg-[url('/bglevel2.jpg')] bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center">
      <header className="w-full backdrop-blur-sm text-transparent bg-clip-text text-4xl font-bold p-3 bg-gradient-to-br from-blue-400 via-green-300 to-purple-600 flex justify-center">
        {isWinner ? "🎉 You are the Winner! 🎉" : "Level 2"}
      </header>
      {checkpointMessage && (
        <div className="text-2xl font-bold text-green-600 mt-4">{checkpointMessage}</div>
      )}
      {!isWinner && !checkpointMessage && (
        <>
          <header className="w-full backdrop-blur-sm text-transparent bg-clip-text text-2xl font-bold p-3 bg-gradient-to-br from-blue-400 via-green-300 to-purple-600 flex justify-center">
            {checkpoints[currentCheckpoint].title}
          </header>

          <main className="flex-grow flex items-center justify-center p-4 w-[70%]">
            <div className="grid grid-cols-3 gap-20 w-full max-w-6xl">
              {checkpoints[currentCheckpoint].doors.map((door) => (
                <div
                  key={door.id}
                  className="relative w-40 h-60 cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => handleDoorClick(door.id)}
                >
                  <img
                    src={openedDoors.includes(door.id) ? doorOpen : doorClosed}
                    alt={`Door ${door.id}`}
                    className="w-full h-full rounded-lg shadow-md"
                  />
                  {!openedDoors.includes(door.id) && selectedDoor === door.id && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <p className="text-white text-4xl">?</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </>
      )}

      {selectedDoor && !isWinner && !checkpointMessage && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white p-4 shadow-md rounded m-2">
          <p className="mb-4 font-semibold text-center">
            {checkpoints[currentCheckpoint].doors.find((d) => d.id === selectedDoor)?.question}
          </p>
          <input
            type="text"
            className="border p-2 rounded w-full mb-2"
            placeholder="Enter your answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mr-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
              onClick={() => setSelectedDoor(null)}
            >
              Close
            </button>
          </div>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>
      )}
    </div>
  );
}
