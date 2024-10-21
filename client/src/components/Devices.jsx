import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";

// const data = [
//   [1, "Light", "On", "30/08/2024 21:44"],
//   [2, "Fan", "Off", "30/08/2024 21:44"],
//   [3, "Air Conditioner", "On", "30/08/2024 21:44"],
//   [4, "Heater", "Off", "30/08/2024 21:44"],
//   [5, "Light", "Off", "30/08/2024 21:45"],
//   [6, "Fan", "On", "30/08/2024 21:45"],
//   [7, "Air Conditioner", "Off", "30/08/2024 21:45"],
//   [8, "Heater", "On", "30/08/2024 21:45"],
//   [9, "Light", "On", "30/08/2024 21:46"],
//   [10, "Fan", "Off", "30/08/2024 21:46"],
//   [11, "Air Conditioner", "On", "30/08/2024 21:46"],
//   [12, "Heater", "Off", "30/08/2024 21:46"],
//   [13, "Light", "Off", "30/08/2024 21:47"],
//   [14, "Fan", "On", "30/08/2024 21:47"],
//   [15, "Air Conditioner", "Off", "30/08/2024 21:47"],
//   [16, "Heater", "On", "30/08/2024 21:47"],
//   [17, "Light", "On", "30/08/2024 21:48"],
//   [18, "Fan", "Off", "30/08/2024 21:48"],
//   [19, "Air Conditioner", "On", "30/08/2024 21:48"],
//   [20, "Heater", "Off", "30/08/2024 21:48"],
//   [21, "Light", "Off", "30/08/2024 21:49"],
//   [22, "Fan", "On", "30/08/2024 21:49"],
//   [23, "Air Conditioner", "Off", "30/08/2024 21:49"],
//   [24, "Heater", "On", "30/08/2024 21:49"],
//   [25, "Light", "On", "30/08/2024 21:50"],
// ];

const options = {
  print: false,
  download: false,
  rowsPerPage: 10,
  selectableRowsHeader: false,
  selectableRows: "none",
  tableBodyHeight: "600px",
  jumpToPage: true,
  responsive: "vertical",
  filter: true,
  filterType: "textField",
};

const columns = [
  {
    name: "_id",
    label: "ID",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "device",
    label: "Devices",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "action",
    label: "Action",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "time",
    label: "Time",
    options: {
      filter: true,
      sort: true,
    },
  },
];

const Devices = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/control")
      .then((res) => res.json())
      .then((resData) => setData(resData));
  }, []);
  return (
    <div className="col-span-6 row-span-7">
      <div className="w-full h-full flex justify-center items-center">
        {data && data.length > 0 ? (
          <MUIDataTable
            title={"Devices"}
            data={data}
            columns={columns}
            options={options}
            className="w-[95%]"
          />
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default Devices;
