import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Pagination } from "antd";

const Table = () => {
  const datas = [
    {
      _id: 1,
      temperature: 29.8,
      humidity: 76,
      light: 300,
      dust: 761,
      time: "01/10/2024 22:36:52",
    },
    {
      _id: 2,
      temperature: 29.8,
      humidity: 76,
      light: 300,
      dust: 761,
      time: "01/10/2024 22:36:52",
    },
    {
      _id: 3,
      temperature: 29.8,
      humidity: 76,
      light: 300,
      dust: 761,
      time: "01/10/2024 22:36:52",
    },
    {
      _id: 4,
      temperature: 29.8,
      humidity: 76,
      light: 300,
      dust: 761,
      time: "01/10/2024 22:36:52",
    },
    {
      _id: 5,
      temperature: 29.8,
      humidity: 76,
      light: 300,
      dust: 761,
      time: "01/10/2024 22:36:52",
    },
    {
      _id: 6,
      temperature: 29.8,
      humidity: 76,
      light: 300,
      dust: 761,
      time: "01/10/2024 22:36:52",
    },
    {
      _id: 7,
      temperature: 29.8,
      humidity: 76,
      light: 300,
      dust: 761,
      time: "01/10/2024 22:36:52",
    },
    {
      _id: 8,
      temperature: 29.8,
      humidity: 76,
      light: 300,
      dust: 761,
      time: "01/10/2024 22:36:52",
    },
    {
      _id: 9,
      temperature: 29.8,
      humidity: 76,
      light: 300,
      dust: 761,
      time: "01/10/2024 22:36:52",
    },
    {
      _id: 10,
      temperature: 29.8,
      humidity: 76,
      light: 300,
      dust: 761,
      time: "01/10/2024 22:36:52",
    },
  ];

  const options = [
    {
      label: "---",
      value: "",
    },
    {
      label: "ID",
      value: "_id",
    },
    {
      label: "Temperature",
      value: "temperature",
    },
    {
      label: "Humidity",
      value: "humidity",
    },
    {
      label: "Light",
      value: "light",
    },
    {
      label: "Dust",
      value: "dust",
    },
    {
      label: "Time",
      value: "time",
    },
  ];
  return (
    <div className="w-[95%] h-[90%] rounded-md border-2 border-slate-200">
      <div className="w-full h-16 flex items-center">
        <div className="flex items-center">
          <div className="border-[1px] rounded-2xl ml-[20px] border-black flex">
            <button className="mx-[8px]" type="submit">
              <SearchIcon />
            </button>
            <div className="w-[1px] h-full bg-black"></div>
            <input
              placeholder="Search..."
              spellCheck="false"
              className="bg-transparent px-4 py-1 focus:outline-none font-light"
            />
            <select
              name=""
              id=""
              className="bg-transparent mr-3 focus:outline-none font-light"
            >
              <option value="">---</option>
              <option value="">ID</option>
              <option value="">Temperature</option>
              <option value="">Humidity</option>
              <option value="">Light</option>
              <option value="">Dust</option>
              <option value="">Time</option>
            </select>
          </div>
          <div className="ml-6 font-normal">
            {`Sort by:     `}
            <select
              name=""
              id=""
              className="bg-transparent mr-3 focus:outline-none"
            >
              <option value="">---</option>
              <option value="">ID</option>
              <option value="">Temperature</option>
              <option value="">Humidity</option>
              <option value="">Light</option>
              <option value="">Dust</option>
              <option value="">Time</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-full">
        <table className="w-full text-center">
          <tr className="h-[52px] border-b-[1px] border-slate-400 border-solid">
            <td>ID</td>
            <td>Temperature</td>
            <td>Humidity</td>
            <td>Light</td>
            <td>Dust</td>
            <td>Time</td>
          </tr>
          {datas.map((data) => (
            <tr className="font-normal h-[52px] border-b-[1px] border-slate-400 border-solid">
              <td>{data._id}</td>
              <td>{data.temperature}</td>
              <td>{data.humidity}</td>
              <td>{data.light}</td>
              <td>{data.dust}</td>
              <td>{data.time}</td>
            </tr>
          ))}
        </table>
      </div>
      <div className="h-[64px] flex items-center justify-end font-normal">
        <div className="mr-6">
          <Pagination total={100} showQuickJumper showSizeChanger={false} />
        </div>
      </div>
    </div>
  );
};

export default Table;
