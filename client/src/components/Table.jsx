import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Pagination } from "antd";

const Table = (props) => {
  const datas = props.data.data;
  const handlePage = props.handlePage;
  const totalData = props.totalData;
  const options = props.options;
  const keyword = props.keyword;
  const setKeyword = props.setKeyword;

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
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <select
              name=""
              id=""
              className="bg-transparent mr-3 focus:outline-none font-light"
            >
              {options.map((option) => (
                <option>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="ml-6 font-normal">
            {`Sort by:     `}
            <select
              name=""
              id=""
              className="bg-transparent mr-3 focus:outline-none"
            >
              {options.map((option) => (
                <option>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="w-full">
        <table className="w-full text-center">
          <tr className="h-[52px] border-b-[1px] border-slate-400 border-solid">
            {options
              .filter((ele) => ele.label !== "---")
              .map((option) => (
                <td>{option.label}</td>
              ))}
          </tr>
          {datas.map((data) => (
            <tr className="font-normal h-[52px] border-b-[1px] border-slate-400 border-solid">
              <td>{data.id}</td>
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
          <Pagination
            total={totalData}
            showQuickJumper
            showSizeChanger={false}
            onChange={handlePage}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
