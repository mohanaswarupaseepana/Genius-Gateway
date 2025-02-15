import React, { useState } from "react";

const Level1 = () => {
  // Questions Array
  const questions = [
    "I am the process that reveals hidden mistakes in logic, syntax, or execution, often requiring patience and problem-solving skills. Without me, software might remain broken. What am I?",
    "In computer science and mathematics, which term is used to represent the difference or change in a variable, often appearing in equations or algorithms to calculate differences between values?",
    "In programming, I can be called with a status code to terminate execution, and in some cases, I clean up resources before doing so. In shell scripts, I signify the end of a process. What am I?",
    "Which communication system, once widely used for sending written messages over long distances, relied on teleprinters and was commonly used by businesses before the advent of fax and email?",
    "In operating systems, I can be set to send a signal after a specified time interval, often used to interrupt sleeping processes or enforce timeouts. What am I?",
    "What word describes the action of forcefully removing an unauthorized user from a system or network?",
    "What word means to express something verbally, and can also relate to speech synthesis in AI and voice assistants?"
  ];

  // State to track the current question indices
  const [currentQuestionIndices, setCurrentQuestionIndices] = useState([0]);

  // State to track the answers entered by the user
  const [answers, setAnswers] = useState(Array(7).fill("")); // 7 questions, 7 answers

  const handleButtonClick = (index) => {
    if (index === 0) {
      setCurrentQuestionIndices([0, 1]); // Show both question 1 and question 2 for button 1
    } else {
      setCurrentQuestionIndices([index + 1]); // Adjust index for other buttons
    }
  };

  // Function to handle input change (answer input)
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value; // Update the answer at the specified index
    setAnswers(newAnswers);
  };

  // Coordinates for solid cells with unique block numbers
  const solidCells = [9, 12, 14]; // Indices for solid grid cells (1,4), (2,2), (2,4)

  // Block Numbers for grid
  const blockNumbers = {
    "0:0": 1,
    "0:1": 5,
    "0:3": 6,
    "1:0": 2,
    "3:0": 3,
    "4:0": 4
  };

  return (
    <div className="bg-black h-screen">
      {/* Title */}
      <p className="text-white text-4xl border p-3 m-0.5 flex justify-center">Enigma Of Minds</p>

      {/* Flex container for grid and questions */}
      <div className="space-x-10 mt-10 flex justify-evenly border">
        {/* Crossword Grid */}
        <div className="grid grid-cols-5 p-4 w-[320px] h-[320px] border">
          {Array.from({ length: 25 }, (_, index) => {
            const row = Math.floor(index / 5); // Row calculation
            const col = index % 5; // Column calculation
            const cellKey = `${row}:${col}`;
            const blockNumber = blockNumbers[cellKey]; // Get block number from map

            return (
              <div
                key={index}
                className={`w-16 h-16 border-2 border-black flex items-center justify-center ${
                  solidCells.includes(index)
                    ? "bg-gray-500 text-white" // Solid cells
                    : "bg-gray-300"
                }`}
              >
                {/* Block Number Display */}
                {blockNumber && (
                  <span className="text-xs text-black">{blockNumber}</span>
                )}

                {/* Only interactive cells for user input */}
                {!solidCells.includes(index) && (
                  <input
                    type="text"
                    value={answers[index - 3]} // Adjust answer for dynamic index
                    onChange={(e) => handleAnswerChange(index - 3, e.target.value)}
                    className="w-full h-full bg-transparent text-center border-none"
                    placeholder=""
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Questions Section */}
        <div className="text-white w-[250px] flex flex-col gap-6 items-center border">
          <h2 className="text-xl font-bold mb-4">Questions</h2>
          <div className="text-lg mb-6 text-center">
            {/* Display multiple questions if multiple indices are present */}
            {currentQuestionIndices.map((index) => (
              <p key={index} className="mb-4">{questions[index]}</p>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <button
                key={index}
                className={`w-10 h-10 border rounded-md ${
                  currentQuestionIndices.includes(index) ? "bg-blue-500" : "bg-gray-500"
                } text-white`}
                onClick={() => handleButtonClick(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level1;
