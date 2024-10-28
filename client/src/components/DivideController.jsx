import React, { useEffect, useRef } from "react";
import Switch from "@mui/material/Switch";
import { memo } from "react";
import { io } from "socket.io-client";

const DivideController = (props) => {
  const socketRef = useRef(null);
  useEffect(() => {
    socketRef.current = io("http://localhost:8081");

    socketRef.current.on("control_update", (data) => {
      console.log("Received control_update:", data);
      if (data.device === props.title) {
        props.set((prev) => !prev);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    fetch("http://localhost:8080/api/control", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        device: props.title,
        action: props.index ? "Off" : "On",
      }),
    });
  };
  return (
    <div className="row-span-1 bg-white bg-opacity-50 rounded-lg shadow-full">
      <div className="h-full flex justify-between items-center">
        <div className="h-full flex justify-around flex-col ml-[20px]">
          {!props.flashing ? (
            props.off ? (
              props.index ? (
                <img src={props.on} alt="" className="w-12" />
              ) : (
                <img src={props.off} alt="" className="w-12" />
              )
            ) : props.index ? (
              <img src={props.on} alt="" className="w-12 animate-spin -ml-1" />
            ) : (
              <img src={props.on} alt="" className="w-12 -ml-1" />
            )
          ) : (
            <img src={props.on} alt="" className="w-12 animate-pulse-custom" />
          )}
          <div>{props.title}</div>
        </div>
        <Switch
          className="scale-125 mr-[10px]"
          onClick={handleClick}
          checked={props.index}
        />
      </div>
    </div>
  );
};

export default memo(DivideController);
