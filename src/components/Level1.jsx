import React from "react";

const Level1 = () => {
  return (
    <div className="bg-black h-screen">
        <div>
            <p className="text-white flex justify-center text-4xl border p-3 m-0.5 ">Enigma Of Minds</p>
        </div>

    <div>
    <div className="grid grid-cols-5 p-4  w-[320px] h-[320px] border m-[10%]">
      {Array.from({ length: 25 }, (_, index) => (
        <button
          key={index}
          className="w-16 h-16 bg-gray-300 border-2 border-black "
        ></button>
      ))}
    </div>
    <div>
        {/* questions */}
    </div>
    </div>
    </div>
  );
};

export default Level1;


