import React, { useEffect, useState } from "react";
const crosswordGrid = [
  [{ num: 1, direction: [{ dir: "right", len: 5, answer: "DEBUG" }, { dir: "down", len: 5, answer: "DELTA" }], filled: false }, { num: 5, direction: [{ dir: "down", len: 5, answer: "EXPEL" }], filled: false }, { filled: false }, { num: 6, direction: [{ dir: "down", len: 5, answer: "UTTER" }], filled: false }, { filled: false }],
  [{ num: 2, direction: [{ dir: "right", len: 4, answer: "EXIT" }], filled: false }, { filled: false }, { filled: false }, { filled: false }, { filled: true }],
  [{ filled: false }, { filled: false }, { filled: true}, { filled: false }, { filled: true }],
  [{ num: 3, direction: [{ dir: "right", len: 5, answer: "TENES" }], filled: false }, { filled: false }, { filled: false }, { filled: false }, { filled: false }],
  [{ num: 4, direction: [{ dir: "right", len: 5, answer: "ALARM" }], filled: false }, { filled: false }, { filled: false }, { filled: false }, { filled: false }]
];
// const questions = {
//   "1R": "I am the process that reveals hidden mistakes in logic, syntax, or execution, often requiring patience and problem-solving skills. Without me, software might remain broken. What am I?",
//   "1B": "In computer science and mathematics, which term is used to represent the difference or change in a variable, often appearing in equations or algorithms to calculate differences between values?",
//   "2R": "In programming, I can be called with a status code to terminate execution, and in some cases, I clean up resources before doing so. In shell scripts, I signify the end of a process. What am I?",
//   "3R": "Which communication system, once widely used for sending written messages over long distances, relied on teleprinters and was commonly used by businesses before the advent of fax and email?",
//   "4R": "In operating systems, I can be set to send a signal after a specified time interval, often used to interrupt sleeping processes or enforce timeouts. What am I?",
//   "5B": "What word describes the action of forcefully removing an unauthorized user from a system or network?",
//   "6B": "What word means to express something verbally, and can also relate to speech synthesis in AI and voice assistants?"
// };
const questions = {
  1: {
    right: { text: "I am the process that reveals hidden mistakes in logic, syntax, or execution, often requiring patience and problem-solving skills. Without me, software might remain broken. What am I?", len: 5 },
    down: { text: "In computer science and mathematics, which term is used to represent the difference or change in a variable, often appearing in equations or algorithms to calculate differences between values?", answer: "DELTA", len: 5 }
  },
  2: {
    right: { text: "In programming, I can be called with a status code to terminate execution, and in some cases, I clean up resources before doing so. In shell scripts, I signify the end of a process. What am I?", answer: "EXIT", len: 4 }
  },
  3: {
    right: { text: "Which communication system, once widely used for sending written messages over long distances, relied on teleprinters and was commonly used by businesses before the advent of fax and email?", answer: "TENES", len: 5 }
  },
  4: {
    right: { text: "In operating systems, I can be set to send a signal after a specified time interval, often used to interrupt sleeping processes or enforce timeouts. What am I?", answer: "ALARM", len: 5 },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  5: {
    down: { text: "What word describes the action of forcefully removing an unauthorized user from a system or network?", answer: "EXPEL", len: 5 },
    // down: { text: "Sun rises in the?", answer: "EAST" }
  },
  6: {
    down: { text: "What word means to express something verbally, and can also relate to speech synthesis in AI and voice assistants?", answer: "UTTER", len: 5 }
  }
};

const Level1 = () => {
  // Questions Array

  // State to track the current question indices
  const [currentIndex, setcurrentIndex] = useState(0);
  const [forceRender, setForceRender] = useState(0);
  // State to track the answers entered by the user
  // const [answers, setAnswers] = useState(Array(7).fill("")); // 7 questions, 7 answers

  const handleButtonClick = (index) => {
    // if (index === 0) {
    //   setcurrentIndex([0, 1]); // Show both question 1 and question 2 for button 1
    // } else {
    console.log(index)
    setcurrentIndex(index); // Adjust index for other buttons
    // }
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
  const [userInput, setUserInput] = useState(
    Array(5).fill("").map(() => Array(5).fill(""))
  );
  const handleInputChange = (row, col, value) => {
    const newGrid = [...userInput];
    newGrid[row][col] = value.toUpperCase();
    setUserInput(newGrid);
  };
  
  let i = 0;
  let j = 0;
  let flag = false;
  useEffect(() => {
    // const newGrid = [...userInput];

    crosswordGrid.forEach((row, rowIndex) => {
      let i = rowIndex;

      row.forEach((cell, colIndex) => {
        let j = colIndex;

        if (cell.num) {
          // console.log(cell.num, cell.direction);
          let flag = false;

          cell.direction.forEach((dir) => {
            if (dir.dir === "right") {
              for (let k = 0; k < dir.len; k++) {
                if (userInput[i][j + k] == dir.answer[k]) {
                  flag = true;
                  // console.log(`flag true ${i} ${j + k}`);
                } else {
                  flag = false;
                  // console.log(`flag false ${i} ${j + k}`);
                  break;
                }
              }
              console.log(`flag ${i} ${j} ${flag}`);
              if (flag) {
                // console.log(`flag true ${i} ${j}`);
                for (let k = 0; k < dir.len; k++) {
                  // console.log(`flag green true ${i} ${j + k}`);
                  crosswordGrid[i][j + k].filled = true;
                  setForceRender((prev) => prev + 1);
                }
              }
            }

            if (dir.dir === "down") {
              for (let k = 0; k < dir.len; k++) {
                if (userInput[i + k][j] === dir.answer[k]) {
                  // console.log(`flag true ${i} ${j + k}`);
                  flag = true;
                } else {
                  flag = false;
                  // console.log(`flag false ${i} ${j + k}`);
                  break;
                }
              }
              // console.log(`flag ${i} ${j} ${flag}`);
              if (flag) {
                // console.log(`flag true ${i} ${j}`);
                for (let k = 0; k < dir.len; k++) {
                  // console.log(`flag green true ${i} ${j + k}`);
                  crosswordGrid[i + k][j].filled = true;
                  setForceRender((prev) => prev + 1);
                }
              }
            }
          });
        }
      });
    });

    // setUserInput(newGrid);
  }, [userInput]);


  return (
    <div className="bg-[url('/bglevel1.jpg')] bg-cover bg-center bg-no-repeat h-screen flex flex-col items-center">
      {/* Title */}
      <p className="h-28 w-full backdrop-blur-sm text-transparent bg-clip-text text-6xl font-bold p-3 bg-gradient-to-br from-blue-400 via-green-300 to-purple-600 flex justify-center"> Round-1 : Enigma Of Minds</p>

      {/* Flex container for grid and questions */}
      <div className="space-x-10 backdrop-blur-sm h-full flex w-full justify-evenly ">
        {/* Crossword Grid */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="grid grid-cols-5 p-4 w-[420px] h-[420px] ">
            {crosswordGrid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    backgroundImage: cell.filled ? "url('/logo for website.png')" : "none",
                    backgroundSize: "500% 500%",
                    backgroundPosition: `${(colIndex * 100) / 4}% ${(rowIndex * 100) / 4}%`,
                    transition: "background-image 0.5s ease-in-out, opacity 0.5s ease-in-out",
                  }}
                  className={`relative border-2 w-20 h-20 flex items-center justify-center transition-all duration-500 ease-in-out ${cell.filled
                    ? "bg-slate-800 border-green-500 opacity-100"
                    : "bg-black border-white "
                    }`}
                >
                  {/* Display Question Number */}
                  {cell.num && (
                    <span className=" absolute top-1 text-white left-1 text-xs font-bold">
                      {cell.num}
                    </span>
                  )}
                  {/* Input Field */}
                  <input
                    type="text"
                    maxLength="1"
                    className="w-16 h-16 text-center text-lg text-white font-bold uppercase  focus:outline-none"
                    value={userInput[rowIndex][colIndex]}
                    onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                    disabled={cell.filled}
                  />
                </div>
              ))
            )}

          </div>
        </div>

        {/* Questions Section */}
        <div className="text-white w-2/3 backdrop-blur-sm flex flex-col gap-6 items-center mr-3">
          <h2 className="text-3xl text-green-400 font-bold mb-4">Questions</h2>
          <div className="text-2xl mb-6 text-center">
            {questions[currentIndex + 1] && ( // Check if question exists
              <div key={`question-${currentIndex + 1}`}>
                <p className="text-yellow-400">Question {currentIndex + 1}</p>
                <div>
                  {questions[currentIndex + 1].down && (
                    <p
                      key={`${currentIndex + 1}-down`} // Unique key for down
                      className="mb-4"
                    >
                      {questions[currentIndex + 1].down.text}
                    </p>
                  )}
                  {questions[currentIndex + 1].right && (
                    <p
                      key={`${currentIndex + 1}-right`} // Unique key for right
                      className="mb-4"
                    >
                      {questions[currentIndex + 1].right.text}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <button
                key={index + 1}
                className={`w-10 h-10 border rounded-md ${currentIndex === index ? "bg-blue-500" : "bg-gray-500"
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
