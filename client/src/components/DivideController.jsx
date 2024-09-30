import React from "react";
import Switch from "@mui/material/Switch";
import { memo } from "react";

const DivideController = (props) => {
  return (
    <div className="row-span-1 bg-white bg-opacity-50 rounded-lg shadow-full">
      <div className="h-full flex justify-between items-center">
        <div className="h-full flex justify-around flex-col ml-[40px]">
          {props.off ? (
            props.index ? (
              <img src={props.on} alt="" className="w-16" />
            ) : (
              <img src={props.off} alt="" className="w-16" />
            )
          ) : props.index ? (
            <img src={props.on} alt="" className="w-16 animate-spin -ml-1" />
          ) : (
            <img src={props.on} alt="" className="w-16 -ml-1" />
          )}
          <div>{props.title}</div>
        </div>
        <Switch
          className="scale-150 mr-[40px]"
          onClick={() => {
            fetch("http://localhost:8080/api/control", {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                device: props.title,
                action: props.index ? "OFF" : "ON",
              }),
            }).then(props.set((prev) => !prev));
          }}
          defaultValue={props.index}
        />
      </div>
    </div>
  );
};

export default memo(DivideController);
