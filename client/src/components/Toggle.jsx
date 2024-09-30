import React, { useState } from "react";

const Toggle = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [bg, setBg] = useState("bg-slate-400");

  const handleClick = () => {
    setIsToggled(!isToggled);
    bg === "bg-slate-400" ? setBg("bg-blue-500") : setBg("bg-slate-400");
  };

  return (
    <div
      className={`w-[128px] h-[48px] ${bg} rounded-3xl flex items-center relative drop-shadow-lg shadow-inner`}
    >
      <div
        className={`w-[42px] h-[42px] bg-white rounded-full mx-1 drop-shadow-lg absolute transition-all duration-200`}
        style={{
          transform: isToggled ? "translateX(80px)" : "translateX(0px)",
        }}
        onClick={handleClick}
      ></div>
    </div>
  );
};

export default Toggle;
