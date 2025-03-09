import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Instructions = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();// Track the current step (Instructions -> About -> Rules)
  return (
    <div className=" bg-gradient-to-tl  from-blue-200 to-gray-200 flex flex-col items-center pt-10 bg-center">
      <div className=" w-[98%]  bg-white px-5 rounded-lg shadow-lg flex gap-7 flex-col mb-5">
        <p className="text-6xl text-red-400 font-bold flex justify-center pt-10">Rules and Instructions</p>
        <div>
          <p className="text-xl font-thin text-red-600">Please read all the instructions carefully as you will lose access to these instructions after the event starts.</p>

          <p className="text-xl font-thin">1. No external help (internet searches, consulting peers, or using unauthorized resources) is allowed during challenge rounds.</p>
          <p className="text-xl font-thin">2. Maintain academic integrity. Any form of cheating, plagiarism, or misconduct will lead to immediate disqualification.</p>
          <p className="text-xl font-thin">3. Be sure to reach our volunteers as fast as possible if you have any issue regarding the computer provided or network issues</p>
          <p className="text-xl font-thin">4. If you are using your personal laptop for the event you are responsible for any technical or network issues</p>
          <p className="text-xl font-thin">5. Extra time will not be provided at any cost for any individual for their delayed participation</p>
        </div>
        <div className="flex justify-evenly ">

          <div className="rounded-xl shadow-md border border-gray-200 bg-gray-100 p-5 flex flex-col w-[32%] pr-10 ">
            <p className="font-bold text-3xl text-pink-400 mb-3">Level 1: Enigma of Minds</p>
            <p className="text-xl font-thin">1. This level lasts for about 15 minutes</p>
            <p className="text-xl font-thin">2. You will be given a crossword grid marking the questions for the respective cells in the grid</p>
            <p className="text-xl font-thin">3. Three hints will be provided for every question in the crossword grid.</p>
            <p className="text-xl font-thin">4. For first hint: 5 marks will be deducted</p>
            <p className="text-xl font-thin">5. For second hint: 10 marks will be deducted</p>
            <p className="text-xl font-thin">6. For third hint: 15 marks will be deducted</p>
            <p className="text-xl font-thin">7. For every correctly answered questions 50 marks will be credited.</p>
            <p></p>




          </div>
          <div className="rounded-xl shadow-md border border-gray-200 bg-gray-100 p-5 flex flex-col w-[32%] pr-10 ">
            <p className="font-bold text-3xl text-blue-400 mb-3">Level 2: Vault of Minds</p>
            <p className="text-xl font-thin">1. This level lasts for about 30 minutes</p>
            <p className="text-xl font-thin">2. There will be three checkpoints where each checkpoint consists of three doors where only one door will lead you to the next checkpoint.</p>
            <p className="text-xl font-thin">3. For every puzzle answered inside a door you will be credited with 50 points.</p>
            <p className="text-xl font-thin">4. The one who will pass through all the checkpoints in the given time will be qualified for the next level. </p>
          </div>
          <div className="rounded-xl shadow-md border border-gray-200 bg-gray-100 p-5 flex flex-col w-[32%] pr-10 ">
            <p className="font-bold text-3xl text-yellow-400 mb-3">Level 3: Queen of Minds</p>
            <p className="text-xl font-thin">1. You will be given a single puzzle in this round</p>
            <p className="text-xl font-thin">2. This level lasts for about 15 minutes</p>
            <p className="text-xl font-thin">3. No marking scheme for this final round</p>
            <p className="text-xl font-thin">4. The first one to complete and solve this final level will be considered as the winner of the Genius Gateway</p>

          </div>
        </div>
        <div className="mb-3 p-10 mx-4 shadow-md  bg-gray-100  rounded-xl">
          <p className="text-6xl text-purple-400 font-bold flex justify-center mb-5">Event Coordinators</p>
          <div className=" h-[500px] flex justify-around ">
            <div className="relative flex justify-center ">
              <img className="object-cover rounded-xl w-[320px]" src="asha.jpg"></img>
              <div className="flex items-center justify-center bottom-0 absolute h-28 bg-gradient-to-t rounded-b-xl from-gray-900 w-full"><p className="text-3xl font-bold text-white">M. Asha Deepthi</p></div>
            </div>
            <div className="relative flex justify-center ">
              <img className="object-cover rounded-xl w-[320px]" src="prem.jpg"></img>
              <div className="flex items-center justify-center bottom-0 absolute h-28 bg-gradient-to-t rounded-b-xl from-gray-900 w-full"><p className="text-3xl font-bold text-white">J. Prem Sagar</p></div>
            </div>
            <div className="relative flex justify-center ">
              <img className="object-cover rounded-xl w-[320px]" src="Swarupa2.jpg"></img>
              <div className="flex items-center justify-center bottom-0 absolute h-28 bg-gradient-to-t rounded-b-xl from-gray-900 w-full"><p className="text-3xl font-bold text-white">S. Mohana Swarupa</p></div>
            </div>
          </div>

        </div>
        <p className="text-center text-2xl text-purple-500">We wish you All the best....!</p>
        <div className="flex justify-center mb-10">
          <button className="cursor-pointer p-5 border w-fit flex justify-center bg-blue-500 text-white  rounded-2xl"
            onClick={()=>navigate("/login")}
          >Start the event</button>
        </div>
      </div>


    </div>
  );
};

export default Instructions;
