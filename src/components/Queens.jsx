import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Queens = ({ EVENT_START_TIME, LEVEL_TIME_LIMITS }) => {
  const [queens, setQueens] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const location = useLocation();
  // const navigate = useNavigate();
  const { email } = location.state || {};
  // const email = "prem@gmail.com";

  // Check if a queen at (row, col) conflicts with others
  const hasConflict = (row, col) => {
    for (let r = 0; r < queens.length; r++) {
      if (r === row) continue;
      const c = queens[r];
      if (c === col || Math.abs(r - row) === Math.abs(c - col)) {
        return true;
      }
    }
    return false;
  };

  const handleReset = () => {
    setQueens([0, 1, 2, 3, 4, 5, 6, 7]);
  };

  const handleSuccess = async () => {
    try {
      const response = await fetch("http://localhost:5000/level3completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      const result = await response.json();
      console.log(result);
      if(result.winner===true){
        navigate("/winner", { state: { email: email } });
      }else if(result.winner===false){
        navigate("/completed",{state:{email:email}});
      }
      // if (result.success) {
      //   navigate("/completed", { state: { email: email } });
      // } else {
      //   navigate("/eliminated", { state: { email: email } });
      // }
    } catch (error) {
      console.error("Error:", error);
    }

  }
  const handleElimination = async () => {
    try {
        const response = await fetch("http://localhost:5000/eliminated", { // Ensure "http://" is included
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, // Convert state to JSON string
            body: JSON.stringify({ email: email })
        });
        const result = await response.json();
        console.log(result);
        navigate("/eliminated", { state: { email: email } });
    } catch (error) {
        console.log(error);
    }
}

  const isValidSolution = () => {
    if (queens.every((col, row) => !hasConflict(row, col))) {
      handleSuccess();
      return true;
    }
    return queens.every((col, row) => !hasConflict(row, col));
  };
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const getAllocatedTime = (userStartTime) => {
    // Time passed from the event start to user's start (in ms)
    const delay = userStartTime.getTime() - (EVENT_START_TIME.getTime() + 1800000);
    const allocated = LEVEL_TIME_LIMITS[1] - delay;
    // console.log(allocated,delay);
    return Math.max(allocated, 0);
  };
  const userStartTime = new Date();
  const [remainingTime, setRemainingTime] = useState(getAllocatedTime(userStartTime));
  useEffect(() => {
    if (remainingTime <= 0) {
      // When time runs out, automatically navigate to the next level.
      // You might also call onComplete(false) if you want to mark it as incomplete.
      // navigate("/level3",{ state: { email:email} });
      if (user && user.Level1 === true && user.Level2 === true &&user.Level3 === false) {
        handleElimination();
    } else if (user.Level3 === true) {
        navigate("/completed", { state: { email: email } });
    }

    }

    const interval = setInterval(() => {
      setRemainingTime(prev => {
        const updated = prev - 1000;
        if (updated >= 0) {
          return updated;
        } else {
          return 0;
        }

      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime,user]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/access", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        });

        const result = await response.json();
        console.log(result);
        setUser(result);
        if (result.eliminated === true) {
          navigate("/eliminated");
        }
        if (result.Level3 === true) {
          if (result.winner === true) {
            navigate("/winner", { state: { email: email } });
          } else {
            navigate("/completed", { state: { email: email } });
          }
        }
      } catch (error) {
        navigate("/login");
        console.error("Error fetching data:", error);
      }
    };

    fetchUserDetails();
  }, []);


  return (
    <div className="min-h-dvh w-full bg-gradient-to-tr from-blue-200 via-white to-red-100 items-center justify-evenly p-4">
      <div className="flex justify-between w-full px-7 items-center">
        <div className=" flex flex-col gap-4 w-1/4">
          <p className="text-lg h-[30px] font-bold text-purple-400">Team Name: {user.teamName}</p>
          <p className=" text-lg h-[30px] font-bold text-purple-400">Points: {user.Points}</p>
        </div>

        <p className=" h-28 backdrop-blur-sm text-transparent bg-clip-text items-center text-5xl font-bold p-3 bg-gradient-to-br from-yellow-400 via-red-300 to-purple-600 flex justify-center"> Round-3 : Queen Of Minds</p>
        <p className="text-4xl font-bold text-green-400 w-1/4 flex justify-end">{Math.floor(remainingTime / 60000)}:{((remainingTime % 60000) / 1000).toFixed(0).padStart(2, '0')}</p>
      </div>
      <div className='flex '>
        <div className='w-1/2 ml-5 h-full flex flex-col px-6 gap-4  py-5'>

          <div className=" ">
            <h2 className="text-xl font-semibold text-gray-700">Objective</h2>
            <p className="text-gray-600 pr-18"> The 8 Queens puzzle is a famous combinatorial problem in chess. It challenges players to position 8 queens so that none of them share the same row, column, or diagonal. Place all 8 queens so that no two attack each other.</p>
          </div>
          <div className="">
            <h2 className="text-xl font-semibold text-gray-700">Rules</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Each row must contain exactly one queen.</li>
              <li>Queens cannot be in the same column.</li>
              <li>Queens cannot share diagonals.</li>
            </ul>
          </div>
          <div className="">
            <h2 className="text-xl font-semibold text-gray-700">How to Play</h2>
            <p className="text-gray-600">1️⃣ Click on any square in a row to place a queen.<br />
              2️⃣ If a queen is already in that row, she will move to the selected column.<br />
              3️⃣ If a queen is in a conflicting position, the square will be highlighted in red.<br />
              4️⃣ Keep adjusting until all conflicts are resolved.<br />
              5️⃣ Once a valid solution is found, you win! 🎉<br />
              🔄 Reset Button: If stuck, click the reset button to restart.</p>
          </div>


        </div>
        <div className='w-1/2 h-full flex flex-col justify-center items-center'>
          <div className="mb-4 flex gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Reset Board
            </button>
            {isValidSolution() && (
              <div className="px-4 py-2 bg-green-500 text-white rounded">
                Valid Solution!
              </div>
            )}
          </div>

          <div className="w-fit flex justify-center items-center rounded-lg">
            <div className=" grid grid-cols-9 gap-0 ">
              {/* Top row for column labels */}
              <div className="w-12 h-12"></div> {/* Empty top-left cell */}
              {Array.from({ length: 8 }).map((_, col) => (
                <div
                  key={`col-label-${col}`}
                  className="w-12 h-12 flex items-end pb-2 justify-center font-bold text-gray-600"
                >
                  {col + 1}
                </div>
              ))}

              {/* Render each row with a left-side row label */}
              {Array.from({ length: 8 }).map((_, row) => (
                <React.Fragment key={`row-${row}`}>
                  {/* Row label */}
                  <div
                    className="w-12 h-12 flex items-center pl-2 justify-center font-bold text-gray-600"
                  >
                    {row + 1}
                  </div>
                  {/* Board cells for the row */}
                  {Array.from({ length: 8 }).map((_, col) => {
                    const hasQueen = queens[row] === col;
                    const conflict = hasQueen && hasConflict(row, col);
                    const isDark = (row + col) % 2 === 0;
                    return (
                      <div
                        key={`cell-${row}-${col}`}
                        className={`
                w-12 h-12 flex items-center justify-center
                ${isDark ? 'bg-amber-800' : 'bg-amber-100'}
                ${hasQueen ? 'bg-opacity-100' : 'bg-opacity-80'}
                ${conflict ? '!bg-red-500' : ''}
                ${hasQueen ? 'cursor-move' : 'cursor-pointer'}
                relative transition-colors duration-200 hover:opacity-90
              `}
                        onClick={() => {
                          const newQueens = [...queens];
                          newQueens[row] = col;
                          setQueens(newQueens);
                        }}
                      >
                        {hasQueen && (
                          <span className="text-3xl text-green-400 transition-transform duration-200">
                            ♛
                          </span>
                        )}
                        {conflict && (
                          <div className="absolute inset-0 border-4 border-red-700 animate-pulse" />
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Queens;