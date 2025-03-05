
const Level3=()=>{
    return(
        <div className=" flex flex-col items-center">
              <div className=" fixed w-screen h-screen top-0 bg-[url('/bglevel1.jpg')] bg-cover bg-center bg-no-repeat  ">
              </div>
              {/* Title */}
              <div className=" min-h-dvh min-w-dvw  flex flex-col items-center backdrop-blur-sm">
        
                <div className="flex justify-between w-full px-7 items-center">
                  <div className=" flex flex-col gap-4 w-1/4">
                    <p className="text-lg h-[30px] font-bold text-purple-400">Team Name: {user.teamName || ""}</p>
                    <p className=" text-lg h-[30px] font-bold text-purple-400">Points: {user.Points}</p>
                  </div>
        
                  <p className=" h-28 backdrop-blur-sm text-transparent bg-clip-text items-center text-5xl font-bold p-3 bg-gradient-to-br from-blue-400 via-green-300 to-purple-600 flex justify-center"> Round-1 : Enigma Of Minds</p>
                  <p className="text-4xl font-bold text-green-400 w-1/4 flex justify-end">{formatTime(timeLeft)}</p>
                </div>
                {/* Flex container for grid and questions */}
                <div className=" space-x-10 backdrop-blur-sm flex w-full h-[600px] justify-evenly ">
                  {/* Crossword Grid */}
        
                  <div className=" w-1/2 flex flex-col justify-center items-center">
                    {/* <p className="text-white">Team Name: </p> */}
                    <div className="h-16">
                    {correct && <div className=" mb-5 opacity-0 translate-y-5  bg-green-400 text-white "
                      style={{
                        animation: "fadeInUp 2s ease-out, fadeOut 3s ease-out",
                      }}
                    >
                      <p className="flex justify-center items-center p-2 gap-3 text-lg"><FaHandsClapping />Wow....! That was correct</p>
                      {/* <div className="w-full bg-white h-1 mt-1 relative overflow-hidden">
                        <div
                          className="h-full bg-green-300"
                          style={{
                            width: "100%",
                            animation:
                              "progress-bar 3s linear forwards",
                          }}
                        ></div>
                      </div> */}
                      <style>{`
                @keyframes progress-bar {
                  from { width: 0%; }
                  to { width: 100%; }
                }
              `}</style>
                    </div>}
                    </div>
        
        
                    <div className=" grid grid-cols-5 p-4 w-[420px] h-[420px] ">
        
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
                  <div className=" text-white px-7  pt-8 w-2/3 backdrop-blur-sm flex flex-col gap-10 items-center mr-3">
                    {/* <h2 className="text-3xl text-green-400 font-bold mb-4">Questions</h2> */}
                    <div className=" text-2xl text-center">
                      {questions[currentIndex + 1] && ( // Check if question exists
                        <div key={`question-${currentIndex + 1}`}>
                          <p className="font-bold text-emerald-400">Question {currentIndex + 1}</p>
                          <div className="flex justify-center my-3 ">
                            {questions[currentIndex + 1].down && questions[currentIndex + 1].right && (
                              <div className="flex gap-3 justify-around w-2/3  rounded-xl ">
                                <button 
                                className={` cursor-pointer border-gray-300 border-2 w-1/2 py-3  rounded-xl ${direction === 0 ? "bg-blue-700 " : ""}`} 
                                onClick={() => setDirection(0)}>Direction 1</button>
                                <button 
                                className={`cursor-pointer border-gray-300 border-2 w-1/2 py-3  rounded-xl ${direction === 1 ? "bg-blue-700 " : ""}`} 
                                onClick={() => setDirection(1)}>Direction 2</button>
        
                              </div>
                            )}
                          </div>
                          <div>
                            {questions[currentIndex + 1].down && (
                              <div className={` mb-4 ${direction === 0 ? "block" : "hidden"}`}>
                                <p
                                  key={`${currentIndex + 1}-down`} // Unique key for down
                                >
                                  {questions[currentIndex + 1].down.text}
                                </p>
                                <div className=" flex flex-col justify-center items-center mt-4">
                                  <div className="flex gap-3 justify-center items-center">
                                    <button 
                                    className={`p-2  rounded-xl flex  items-center ${questions[currentIndex + 1].down.hintNum == 0 ? "bg-yellow-500 cursor-pointer" : "bg-gray-600"}`} 
                                    disabled={questions[currentIndex+1].down.hintNum!==0}
                                    onClick={()=>handledownHint(0)}><IoBulbOutline /> Hint 1</button>
                                    <button 
                                    className={`p-2  rounded-xl flex  items-center ${questions[currentIndex + 1].down.hintNum == 1 ? "bg-yellow-500 cursor-pointer" : "bg-gray-600"}`} 
                                    disabled={questions[currentIndex+1].down.hintNum!==1}
                                    onClick={()=>handledownHint(1)}><IoBulbOutline /> Hint 2</button>
                                    <button 
                                    className={`p-2  rounded-xl flex  items-center ${questions[currentIndex + 1].down.hintNum == 2 ? "bg-yellow-500 cursor-pointer" : "bg-gray-600"}`} 
                                    disabled={questions[currentIndex+1].down.hintNum!==2}
                                    onClick={()=>handledownHint(2)}><IoBulbOutline /> Hint 3</button>
                                  </div>
                                  <div className="flex flex-col gap-3 w-full pt-3">
                                    {questions[currentIndex + 1].down.hints.map((hint, index) =>
                                      hint.used ? <p key={index} className="bg-transparent backdrop-blur-md border border-gray-600 rounded-lg py-2">Hint-{index + 1}: {hint.text}</p> : null
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                            {questions[currentIndex + 1].right && (
                              <div className={` mb-4 ${direction === 1 ? "block" : "hidden"}`}>
                                <p
                                  key={`${currentIndex + 1}-right`} // Unique key for right
                                >
                                  {questions[currentIndex + 1].right.text}
                                </p>
                                <div className="flex flex-col justify-center mt-4">
                                  <div className="flex gap-3 justify-center">
                                    <button 
                                    className={`p-2 rounded-xl flex  items-center ${questions[currentIndex + 1].right.hintNum == 0 ? "bg-yellow-500 cursor-pointer" : "bg-gray-600"}`} 
                                    disabled={questions[currentIndex+1].right.hintNum!==0}
                                    onClick={()=>handlerightHint(0)}><IoBulbOutline /> Hint 1</button>
                                    <button 
                                    className={`p-2 rounded-xl flex  items-center ${questions[currentIndex + 1].right.hintNum == 1 ? "bg-yellow-500 cursor-pointer" : "bg-gray-600"}`} 
                                    disabled={questions[currentIndex+1].right.hintNum!==1}
                                    onClick={()=>handlerightHint(1)}><IoBulbOutline /> Hint 2</button>
                                    <button 
                                    className={`p-2 rounded-xl flex  items-center ${questions[currentIndex + 1].right.hintNum == 2 ? "bg-yellow-500 cursor-pointer" : "bg-gray-600"}`} 
                                    disabled={questions[currentIndex+1].right.hintNum!==2}
                                    onClick={()=>handlerightHint(2)}><IoBulbOutline /> Hint 3</button>
                                  </div>
                                  <div className="flex flex-col gap-3 w-full pt-3">
                                    {questions[currentIndex + 1].right.hints.map((hint, index) =>
                                      hint.used ? <p key={index} className="bg-transparent backdrop-blur-md border border-gray-600 rounded-lg  py-2">Hint-{index + 1}: {hint.text}</p> : null
                                    )}
                                  </div>
                                </div>
                              </div>
        
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className=" grid grid-cols-6 gap-2">
                      {Array.from({ length: Object.keys(questions).length }).map((_, index) => (
                        <button
                          key={index + 1}
                          className={`w-10 h-10 border rounded-md  ${currentIndex === index ? "bg-blue-500" : "bg-gray-500"
                            } text-white`}
                          onClick={() => handleButtonClick(index)}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                  {completion &&<div className= "fixed flex justify-center items-center ">
                    <div className="h-[500px] w-[550px] rounded-2xl bg-white 00 p-10 flex flex-col justify-evenly items-center shadow-lg">
                      <img src="level1message.png" alt="congratulations" className=""/>
                       <p className="text-3xl text-green-600 font-bold mb-4 text-center ">You have completed the first level in Genius Gateway</p>
                       <p className="text-2xl text-blue-600 font-bold ">Your Current Points: {user.Points}</p>
                   </div>
                  </div>
        }
        
        
                  {/* Navigation Buttons */}
        
                </div>
              </div>
            </div>
    )
}

export default Level3;