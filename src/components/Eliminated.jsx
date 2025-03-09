import React from 'react';

const Eliminated = ({ teamName, score, eliminatedAt, message, onReturn }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-red-600 mb-4 text-center">
          You Have Been Eliminated
        </h1>
        <p className="text-lg text-gray-700 mb-2 text-center">
          Unfortunately, your team <span className="font-semibold">{teamName}</span> has been eliminated from the event.
        </p>
        {/* <div className="flex flex-col gap-3 my-6">
          <div className="flex justify-between">
            <span className="font-semibold">Final Score:</span>
            <span>{score}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Eliminated At:</span>
            <span>{eliminatedAt}</span>
          </div>
        </div> */}
        {message && (
          <p className="text-sm text-gray-500 mb-4 text-center">
            {message}
          </p>
        )}
         
      </div>
      <footer className="mt-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} Genius Gateway. All rights reserved.
      </footer>
    </div>
  );
};

export default Eliminated;
