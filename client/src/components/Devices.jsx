import React, { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Pagination } from "antd";
import CircularProgress from "@mui/material/CircularProgress";

import useDebouce from "../hooks/useDebounce";

const options = [
  { label: "---", value: "" },
  { label: "ID", value: "_id" },
  { label: "Device", value: "device" },
  { label: "Action", value: "action" },
  { label: "Time", value: "time" },
];

const Devices = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});
  const [keyword, setKeyword] = useState("");
  const [field, setField] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const debouce = useDebouce(keyword, 500);

  const fetchData = useCallback(
    (page) => {
      let URL = `http://localhost:8080/api/control/?page=${page}`;
      if (keyword) URL += `&keyword=${debouce}`;
      if (field !== "") URL += `&field=${field}`;
      if (sortField) URL += `&sortField=${sortField}&sortOrder=${sortOrder}`;

      fetch(URL)
        .then((res) => res.json())
        .then((resData) => {
          setData(resData);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [field, debouce, sortField, sortOrder]
  );

  const handleSearch = () => {
    fetchData(page);
  };

  useEffect(() => {
    fetchData(page);
  }, [page, sortField, sortOrder, fetchData]);

  return (
    <div className="col-span-6 row-span-7">
      <div className="w-full h-full flex justify-center items-center">
        {data.data ? (
          <div className="w-[95%] h-[90%] rounded-md border-2 border-slate-200 mt-[40px]">
            <div className="w-full h-16 flex items-center">
              <div className="flex items-center">
                <div className="border-[1px] rounded-2xl ml-[20px] border-black flex">
                  <button
                    className="mx-[8px]"
                    type="submit"
                    onClick={handleSearch}
                  >
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
                    onChange={(e) => {
                      console.log(e.target.value);
                      setField(e.target.value);
                    }}
                    className="bg-transparent mr-3 focus:outline-none font-light"
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ml-6 font-normal">
                  {`Sort by:     `}
                  <select
                    onChange={(e) => setSortField(e.target.value)}
                    className="bg-transparent mr-3 focus:outline-none"
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-transparent focus:outline-none"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="w-full h-[572px]">
              <table className="w-full  text-center">
                <thead>
                  <tr className="h-[52px] border-b-[1px] border-slate-400 border-solid">
                    {options
                      .filter((ele) => ele.label !== "---")
                      .map((option) => (
                        <th key={option.value}>{option.label}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((item) => (
                    <tr
                      key={item._id}
                      className="font-normal h-[52px] border-b-[1px] border-slate-400 border-solid"
                    >
                      <td>{item._id}</td>
                      <td>{item.device}</td>
                      <td>{item.action}</td>
                      <td>{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="h-[64px] flex items-center justify-end font-normal">
              <div className="mr-6">
                <Pagination
                  total={data.totalData || 0}
                  showQuickJumper
                  showSizeChanger={false}
                  onChange={setPage}
                  current={page}
                />
              </div>
            </div>
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default Devices;
