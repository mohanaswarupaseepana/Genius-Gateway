import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Level1Waiting = ({EVENT_START_TIME,LEVEL_TIME_LIMITS}) => {
//   const [timeLeft, setTimeLeft] = useState(3600); // Example: 1 hour countdown

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };
const location = useLocation();
const navigate = useNavigate();
const { email } = location.state || {};
// const email="prem@gmail.com";

const getAllocatedTime = (userStartTime) => {
    // Time passed from the event start to user's start (in ms)
    const delay = userStartTime.getTime() - EVENT_START_TIME.getTime();
    const allocated = LEVEL_TIME_LIMITS[0] - delay;
    // console.log(allocated,delay);
    return Math.max(allocated, 0);
  };
const userStartTime = new Date();
const [remainingTime, setRemainingTime] = useState(getAllocatedTime(userStartTime));
useEffect(() => {
    if (remainingTime <= 0) {
      // When time runs out, automatically navigate to the next level.
      // You might also call onComplete(false) if you want to mark it as incomplete.
      navigate("/level2",{ state: { email:email} });

    }

    const interval = setInterval(() => {
      setRemainingTime(prev => {
        const updated = prev - 1000;
        if(updated>=0){
            return updated;
        }else{
            return 0;
        }
        
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-center p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">🎉 Congratulations!</h1>
        <p className="text-lg mb-6">You have qualified for the first level.</p>
        <div className="bg-gray-700 p-4 rounded-xl text-xl font-semibold">
          Next level opens in:
          <div className="text-4xl font-bold mt-2 text-green-400">
          {Math.floor(remainingTime / 60000)}:{((remainingTime % 60000) / 1000).toFixed(0).padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level1Waiting;
