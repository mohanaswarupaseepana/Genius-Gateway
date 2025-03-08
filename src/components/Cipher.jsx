import React, { useState } from "react";

function Cipher() {
  // Initialize an array with 6 empty strings
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);

  // Handle changes in each input box
  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    // Only take the first character for each box
    newInputs[index] = event.target.value.slice(0, 1);
    setInputs(newInputs);

    // Combine all letters to form a word
    const combinedInput = newInputs.join("").toUpperCase();
    if (combinedInput === "GENIUS") {
      alert("Genius Found!");
    }
  };

  return (
    <div> 
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Side: Description */}
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#f0f0f0" }}>
        <h1>Description</h1>
        <p>
        Decrypt the given encrypted word "kubioy" by reversing the encryption process. The text has been encoded using the equation 5x + 8 along with an alphabetical mapping where A = 0, B = 1, …, Z = 25. Your task is to work out the inverse process (using modular arithmetic as needed) to reveal the original plaintext word.
        </p>
      </div>
      <div className="">
          <h2 className="text-xl font-semibold text-gray-700">Rules</h2>
          <p className="text-gray-600">1️⃣ Use the standard mapping of letters to numbers: A = 0, B = 1, …, Z = 25.<br />
            2️⃣ After placing a few numbers, start calculating the sums of the partially completed rows, columns, and diagonals.<br />
            3️⃣ If you notice a row, column, or diagonal cannot possibly add up to 15 given the remaining numbers, adjust your placements.
            <br />
            4️⃣ Continue filling in the grid until all cells are occupied.<br />
            5️⃣ Once completed, verify that each row, each column, and both diagonals sum to 15.
            If all conditions are met, congratulations—you’ve successfully created a magic square 🎉<br />

            🔄 Reset Button: If stuck, click the reset button to restart.</p>
        </div>
        </div>

      {/* Right Side: Six Input Boxes */}
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#fff" }}>
        <h1>Input Boxes</h1>
        {inputs.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            onChange={(event) => handleInputChange(index, event)}
            placeholder="?"
            maxLength={1}  // Limit each input to one character
            style={{
              width: "40px",
              marginRight: "5px",
              fontSize: "24px",
              textAlign: "center",
              padding: "5px",
              marginBottom: "10px"
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Cipher;
