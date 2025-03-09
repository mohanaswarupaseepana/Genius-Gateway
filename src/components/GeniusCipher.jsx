import React, { useState } from 'react';

const GeniusCipherGameUI = ({ handleSubmit, qNum }) => {
  const plaintext = "KUBIOY";
  const correctCipher = "GENWAY";
  const [inputs, setInputs] = useState(Array(6).fill(""));

  // Handle input change for each box (only one uppercase letter allowed)
  const handleChange = (index, value) => {
    const char = value.slice(-1).toUpperCase(); // Only the last character, uppercase
    const newInputs = [...inputs];
    newInputs[index] = char;
    setInputs(newInputs);
  };

  // Submit function to validate the answer
  const handleCipherSubmit = () => {
    const userAnswer = inputs.join("");
    if (userAnswer === correctCipher) {
      console.log("success")
        handleSubmit(qNum);
        
    // alert("Correct! You have encrypted the text correctly!");
    } else {
      alert("Incorrect. Please try again.");
    }
  };

  return (
    <div className="w-full h-full border flex">
      {/* Left Section - Game Description & Instructions */}
      {/* <div className="w-1/2 p-8 bg-gray-100 border-r border-gray-300">
        <h1 className="text-4xl font-bold mb-4">Genius Cipher Game</h1>
        <p className="mb-4 text-lg">
          Welcome to the Genius Cipher challenge! Your task is to encrypt the given plaintext using our custom cipher.
        </p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Plaintext:</h2>
          <p className="text-xl font-mono bg-gray-200 p-2 inline-block">{plaintext}</p>
        </div>
        <p className="mb-4 text-lg">
          Use the following affine cipher formula to encrypt the plaintext:
        </p>
        <div className="mb-4">
          <p className="font-mono bg-gray-200 p-2 inline-block">
            E(x) = (5×x + 8) mod 26
          </p>
        </div>
        <p className="mb-4 text-lg">
          Calculate the encrypted value and enter each letter in the 6 boxes provided on the right.
        </p>
        <p className="text-lg text-green-600">
          (Hint: The correct encrypted value is <span className="font-bold">{correctCipher}</span>)
        </p>
      </div>
 */}
  <div className="w-1/2 p-8 bg-gray-100 border-r border-gray-300 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-4">Genius Cipher Game</h1>
        <p className="mb-4 text-lg">
          Welcome to the <span className="font-bold">Genius Cipher Challenge</span>! Your mission is to encrypt the given plaintext using our custom affine cipher.
        </p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Plaintext:</h2>
          <p className="text-xl font-mono bg-gray-200 p-2 inline-block">{plaintext}</p>
        </div>
        <p className="mb-4 text-lg">
          Use the following affine cipher formula to encrypt the plaintext:
        </p>
        <div className="mb-4">
          <p className="font-mono bg-gray-200 p-2 inline-block">
            E(x) = (5 × x + 8) mod 26
          </p>
        </div>
        <p className="mb-4 text-lg">
          Your challenge is to calculate the encrypted value and enter each letter in the 6 boxes on the right.
        </p>
        <div className="mb-4 p-4 bg-white shadow rounded">
          <h2 className="text-2xl font-semibold mb-2">Example: How to Solve</h2>
          <ol className="list-decimal list-inside space-y-2 text-lg">
            <li>
              <span className="font-bold">Step 1:</span> Convert each letter of plaintext to its numeric value (A=0, B=1, …, Z=25):
            </li>
            <li>
              <span className="font-bold">Step 2:</span> Apply the cipher formula E(x) = (5×x + 8) mod 26 to each numeric value of the corresponding letter
              {/* <ul className="list-disc list-inside pl-4">
                <li>K: (5×10 + 8) = 58 mod 26 = 6 → G</li>
                <li>U: (5×20 + 8) = 108 mod 26 = 4 → E</li>
                <li>B: (5×1 + 8) = 13 mod 26 = 13 → N</li>
                <li>I: (5×8 + 8) = 48 mod 26 = 22 → W</li>
                <li>O: (5×14 + 8) = 78 mod 26 = 0 → A</li>
                <li>Y: (5×24 + 8) = 128 mod 26 = 24 → Y</li>
              </ul> */}
            </li>
            <li>
              <span className="font-bold">Step 3:</span> Combine the letters to form the encrypted text
            </li>
          </ol>
        </div>
      </div>    {/* Right Section - Input Interface */}
      <div className="w-1/2 p-8 gap-8 bg-white flex flex-col items-center justify-center">
      <p className='text-2xl'>Input your encrypted text here:</p>
        <div className="flex space-x-4 mb-8">
          {inputs.map((letter, index) => (
            <input
              key={index}
              type="text"
              value={letter}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength={1}
              className="w-16 h-16 border border-gray-400 text-center text-3xl font-bold rounded"
            />
          ))}
        </div>
        <button
          onClick={handleCipherSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GeniusCipherGameUI;
