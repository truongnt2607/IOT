import React from "react";
import { memo } from "react";

const IndexDisplay = (props) => {
  return (
    <div className="col-span-4 row-span-2 bg-white bg-opacity-50 rounded-lg shadow-full">
      <div className="flex justify-between m-4">
        <props.icon
          sx={{
            fontSize: 48,
            opacity: props.index / 100,
            color: props.color,
          }}
        />
        <div className="w-16 h-16">
          {props.circle ? (
            <props.circle
              percent={props.index}
              strokeWidth={10}
              strokeColor="#2b5ce3"
              trailWidth={10}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="ml-5 text-2xl font-semibold">
        {props.title} : {props.index} {props.unit}
      </div>
    </div>
  );
};

export default memo(IndexDisplay);
