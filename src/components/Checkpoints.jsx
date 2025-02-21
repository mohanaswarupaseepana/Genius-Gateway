import React, { useState, useEffect } from "react";
import doorClosed from "/mysterious_close_door1.jpg";
import doorOpen from "/mysterious_door_open.png";

const allQuestions = [
  { id: 1, question: "What is 2 + 2?", answer: "4" },
  { id: 2, question: "What is 5 + 3?", answer: "8" },
  { id: 3, question: "What is 10 - 7?", answer: "3" },
  { id: 4, question: "What is the capital of France?", answer: "Paris" },
  { id: 5, question: "What is 6 * 6?", answer: "36" },
  { id: 6, question: "What is 15 / 3?", answer: "5" },
  { id: 7, question: "What is the color of the sky?", answer: "Blue" },
  { id: 8, question: "What is 12 + 4?", answer: "16" },
  { id: 9, question: "What is 9 - 3?", answer: "6" },
];

export default function DoorGame() {
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  const [openedDoors, setOpenedDoors] = useState([]);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState("");
  const [isWinner, setIsWinner] = useState(false);
  const [checkpointMessage, setCheckpointMessage] = useState(null);
  const [checkpoints, setCheckpoints] = useState([]);
  const [correctDoors, setCorrectDoors] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const [showRandomNumber, setShowRandomNumber] = useState(false); // State to control random number visibility
  const [timer, setTimer] = useState(1800); // 30 minutes countdown (in seconds)

  useEffect(() => {
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
    const shuffledCheckpoints = [1, 2, 3].map((checkpointId, index) => {
      return {
        id: checkpointId,
        title: `Checkpoint ${checkpointId}`,
        doors: shuffledQuestions.slice(index * 3, index * 3 + 3).map((question, i) => ({
          id: checkpointId * 3 + i + 1,
          ...question,
        })),
      };
    });
    setCheckpoints(shuffledCheckpoints);

    const assignedCorrectDoors = {};
    shuffledCheckpoints.forEach((checkpoint) => {
      const randomDoor = checkpoint.doors[Math.floor(Math.random() * checkpoint.doors.length)];
      assignedCorrectDoors[checkpoint.id] = randomDoor.id;
    });
    setCorrectDoors(assignedCorrectDoors);

    // Start countdown timer
    const timerInterval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          return 0; // Stop the timer at 0
        }
        return prevTime - 1; // Decrement the timer every second
      });
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleDoorClick = (doorId) => {
    if (openedDoors.includes(doorId) || isWinner) return;
    setSelectedDoor(doorId);
    setUserAnswer("");
    setError("");
    setRandomNumber(null);
    setShowRandomNumber(false); // Reset random number visibility
    const door = checkpoints[currentCheckpoint]?.doors.find((d) => d.id === doorId);
    if (door) setSelectedQuestion(door.question);
  };

  const handleSubmit = () => {
    if (!selectedDoor || isWinner) return;
    const door = checkpoints[currentCheckpoint]?.doors.find((d) => d.id === selectedDoor);
    if (door && userAnswer.trim().toLowerCase() === door.answer.toLowerCase()) {
      setOpenedDoors([...openedDoors, selectedDoor]);
      setSelectedDoor(null);
      setSelectedQuestion(null);
      const number = Math.floor(Math.random() * 3) + 1;
      setRandomNumber(number);
      setShowRandomNumber(true); // Set random number visibility to true
      setUserAnswer("");

      setTimeout(() => {
        setShowRandomNumber(false); // Hide random number after some time
        if (selectedDoor === correctDoors[checkpoints[currentCheckpoint]?.id]) {
          if (currentCheckpoint === checkpoints.length - 1) {
            setIsWinner(true);
          } else {
            setCheckpointMessage(`You have reached ${checkpoints[currentCheckpoint + 1].title}!`);
            setTimeout(() => {
              setCheckpointMessage(null);
              setCurrentCheckpoint(currentCheckpoint + 1);
              setOpenedDoors([]);
              setRandomNumber(null);
            }, 2000);
          }
        } else {
          setError("This is not the correct door to the next checkpoint!");
        }
      }, 2000); // Adjust timeout to ensure the random number shows for a moment
    } else {
      setError("Incorrect answer! Try again.");
    }
  };

  return (
    <div className="bg-[url('/bg_image.jpg')] bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center">
      <header className="w-full  text-transparent bg-clip-text text-4xl font-bold p-3 bg-gradient-to-br from-white-400 via-green-400 to-blue-300 flex item-center justify-center ">
        {isWinner ? "🎉 Congratulations, you reached the destination! 🎉" : "Level 2"}
      </header>
      {checkpointMessage && <div className="text-2xl font-bold text-green-600 absolute inset-0 flex items-center justify-center ">{checkpointMessage}</div>}
      {!isWinner && !checkpointMessage && checkpoints.length > 0 && (
        <>
          <header className="w-full  text-transparent bg-clip-text text-3xl font-bold p-3 bg-gradient-to-br from-blue-300 via-green-400 to-purple-600 flex justify-center ">
            {checkpoints[currentCheckpoint].title}
          </header>
          <main className="flex-grow flex items-center justify-center p-4 w-[80%] ">
            <div className="grid grid-cols-3 gap-20 w-full max-w-6xl">
              {checkpoints[currentCheckpoint].doors.map((door) => (
                <div
                  key={door.id}
                  className="relative w-60 h-90 cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => handleDoorClick(door.id)}
                >
                  <img
                    src={openedDoors.includes(door.id) ? doorOpen : doorClosed}
                    alt={`Door ${door.id}`}
                    className="w-full h-full rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </main>
        </>
      )}
      {selectedDoor && selectedQuestion && !showRandomNumber && (
        <div className="fixed inset-0 flex items-center justify-center m-4 ">
          <div className="bg-transparent backdrop-blur-md bg-opacity-80 p-4 rounded-lg shadow-lg border border-gray-600 max-w-6xl w-full h-[70%] text-center flex flex-col items-center justify-center ">
            <p className="mb-4 font-semibold text-xl text-white">{selectedQuestion}</p>
            <input
              type="text"
              className="border p-2 rounded w-[20%] mb-2 text-white"
              placeholder="Enter your answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <div className="flex justify-center m-5">
              <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mr-2" onClick={handleSubmit}>Submit</button>
              <button
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
                onClick={() => setSelectedDoor(null)}
              >
                Close
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      )}
      {showRandomNumber && !selectedQuestion && (
        <div className="fixed inset-0 flex items-center justify-center m-4 ">
          <div className="bg-transparent backdrop-blur-md bg-opacity-80 p-4 rounded-lg shadow-lg border border-gray-600 max-w-6xl w-full h-[70%] text-center flex flex-col items-center justify-center ">
            <p className="mb-4 font-semibold text-xl text-white">Random Number: {randomNumber}</p>
          </div>
        </div>
      )}
      {/* Timer Display */}
      <div className="absolute top-4 right-4 text-2xl font-bold text-yellow-500">
        {formatTime(timer)}
      </div>
    </div>
  );
}
