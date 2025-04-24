import React from "react";

function InfoBox({ icon:Icon, title, content }) {
  return (
    <div className="w-full sm:w-1/4 flex flex-col items-center p-4 border rounded-lg shadow-sm bg-white max-w-sm">
      <div className=" text-orange-500 md:mr-4">
        
      {Icon && <Icon className="w-8 h-8" />}
      </div>
      <div className="flex flex-col gap-2 text-center">
        
        <h3 className="text-orange-600 font-semibold md:h-[5vh] sm:h-[8vh] h-[2vh]">{title}</h3>
        <p className="text-gray-600 md:h-[5vh] sm:h-[8vh] h-[2vh]">{content}</p>
      </div>
    </div>
  );
}

export default InfoBox;
