import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Welcome = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();// Track the current step (Welcome -> About -> Rules)

  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1); // Move to the next step (Welcome -> About -> Rules)
    }
    else {
      navigate("/level1"); // Redirect to Level 1 on final step
    }
  };

  const sections = [
    {
      title: "Welcome to Genius Gateway!",
      description:
        "Embark on a journey of mind-bending challenges, where your problem-solving skills and creativity will be put to the test. 🚀",
    },
    {
      title: "About the Event",
      description:
        "Genius Gateway is an immersive event designed to push the boundaries of your coding and logic skills. Collaborate, innovate, and rise to the challenge!",
    },
    {
      title: "Rules & Guidelines",
      description:
        "1️⃣ No external help.\n2️⃣ Complete challenges within the allocated time.\n3️⃣ Use your creativity, teamwork, and logic to solve problems.",
    },
  ];

  return (
    <div className="h-screen bg-blue-200 flex justify-center items-end pb-16 bg-[url('/GATEWAY.png')]  bg-cover bg-center">
      <div>
        <button className="px-8 py-3 text-3xl text-white font-thin  bg-blue-600  rounded-xl cursor-pointer "
         onClick={()=>navigate("/instructions")}
        >Let's Go</button>
      </div>
    </div>
  );
};

export default Welcome;
