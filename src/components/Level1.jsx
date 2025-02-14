import React, { useState } from "react";

const Level1 = () => {
  // Questions Array
  const questions = [
    "What is the full form of CPU?",
    "Which language is used for web development?",
    "What does RAM stand for?",
    "Which data structure follows FIFO principle?",
    "What is the main function of an operating system?",
    "Which protocol is used for web communication?",
    "What is the primary key in databases?",
    "What is the binary representation of 5?",
    "Which programming language is mainly used for AI?",
  ];

  // State to track the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  return (
    <div className="bg-black h-screen ">
      {/* Title */}
      <p className="text-white text-4xl border p-3 m-0.5 flex justify-center">Enigma Of Minds</p>

      {/* Flex container for grid and questions */}
      <div className=" space-x-10 mt-10 flex justify-evenly border">
        {/* Crossword Grid */}
        <div className="grid grid-cols-5 p-4 w-[320px]  h-[320px] border">
          {Array.from({ length: 25 }, (_, index) => (
            <button
              key={index}
              className="w-16 h-16 bg-gray-300 border-2 border-black"
            ></button>
          ))}
        </div>

        {/* Questions Section */}
        <div className="text-white w-[250px] flex flex-col gap-6 items-center border">
          <h2 className="text-xl font-bold mb-4">Question {currentQuestionIndex + 1}</h2>
          <p className="text-lg mb-6 text-center">{questions[currentQuestionIndex]}</p>

          {/* Navigation Buttons */}
          <div className="grid-cols-9">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`w-10 h-10 border rounded-md ${
                  currentQuestionIndex === index ? "bg-blue-500" : "bg-gray-500"
                } text-white`}
                onClick={() => setCurrentQuestionIndex(index)}
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



