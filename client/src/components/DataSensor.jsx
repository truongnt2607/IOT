import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";

const options = {
  print: false,
  download: false,
  rowsPerPageOptions: [10],
  selectableRowsHeader: false,
  selectableRows: "none",
  tableBodyHeight: "600px",
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
    fetch("http://localhost:8080/api/data-sensor")
      .then((res) => res.json())
      .then((resData) => setData(resData));
  }, []);
  return (
    <div className="col-span-6 row-span-7">
      <div className="w-full h-full flex justify-center items-center">
        {data ? (
          <MUIDataTable
            title={"Data Sensor"}
            data={data}
            columns={columns}
            options={options}
            className="w-[95%] shadow-full"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DataSensor;
