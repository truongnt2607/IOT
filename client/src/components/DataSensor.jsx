import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";

const options = {
  print: false,
  download: false,
  rowsPerPageOptions: [9],
  rowsPerPage: 9,
  selectableRowsHeader: false,
  selectableRows: "none",
  tableBodyHeight: "550px",
  jumpToPage: true,
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
    name: "temperature",
    label: "Temperature",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "humidity",
    label: "Humidity",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "light",
    label: "Light",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "dust",
    label: "Dust",
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

const DataSensor = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/data-sensor/all")
      .then((res) => res.json())
      .then((resData) => setData(resData));
  }, []);
  const dustThresholdCount = data.filter((item) => item.dust > 800).length;
  return (
    <div className="col-span-6 row-span-7">
      <div className="w-full h-full flex flex-col items-center">
        <div className="p-2 my-3 bg-red-400 rounded-md text-center">{`Số lần độ bụi vượt ngưỡng 800: ${dustThresholdCount}`}</div>
        {data && data.length > 0 ? (
          <MUIDataTable
            title={"Data Sensor"}
            data={data}
            columns={columns}
            options={options}
            className="w-[95%] shadow-full"
          />
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default DataSensor;
