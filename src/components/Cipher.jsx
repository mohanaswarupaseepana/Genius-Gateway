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
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Side: Description */}
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#f0f0f0" }}>
        <h1>Description</h1>
        <p>
          Enter the letters in the boxes on the right to form a word.
        </p>
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
