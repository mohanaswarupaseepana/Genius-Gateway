import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const AchieverComponent = ({
  participantName = "John Doe",
  photoUrl = "https://via.placeholder.com/150",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <img
            src={photoUrl}
            alt="Participant"
            className="w-32 h-32 rounded-full object-cover border-4 border-teal-500"
          />
          <FaCheckCircle className="text-green-400 text-6xl mt-4" />
          <h1 className="text-2xl font-bold mt-4">Great Job, {participantName}!</h1>
          <p className="text-gray-700 mt-2 text-center">
            You have successfully passed all the levels of the <span className="font-semibold">Genius Gateway Event</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchieverComponent;
