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
    <div className="h-screen bg-blue-200 flex justify-center items-center bg-[url('/bg_image.jpg')] bg-cover bg-center">
      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6 }}
        className="absolute text-center w-full px-6"
      >
        <h1 className="text-5xl font-bold text-white mb-4">{sections[step].title}</h1>
        <p className="text-lg text-white mb-6 whitespace-pre-line">
          {sections[step].description}
        </p>

        <div className="flex justify-center gap-4">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {step < 2 ? "Next" : "Start the Event 🚀"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;
